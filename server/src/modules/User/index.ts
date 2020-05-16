import { v4 } from "uuid";
import { AuthenticationError } from "apollo-server-express";
import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";

import { ChangePasswordInput } from "./changePassword.input";
import {
  confirmUserPrefix,
  forgotPasswordPrefix,
} from "./../../utils/constants/redisPrefixes";
import { redis } from "./../../utils/redis/index";
import {
  sendEmail,
  createConfirmationUrl,
} from "./../../utils/nodemailer/index";
import { logger } from "./../middlewares/logger";
import { RegisterInput } from "./register.input";
import { User } from "../../entity/User";
import { Profile } from "../../entity/Profile";
import { ContextType } from "./../../types/ContextType";
import { isAuth } from "./../Middlewares/isAuth";
import { Gender } from "./gender-type";

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { req }: ContextType): Promise<User | null> {
    const userId = req.session!.uid;
    const user = await User.findOne(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  @Query(() => [User])
  async users() {
    const users = await User.find({
      //! Using Relations //
      relations: ["profile", "todos", "comments"],
    });
    return users;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async getUser(@Ctx() { req }: ContextType) {
    const userId = req.session!.uid;
    //! Using Relations //
    // const user = await User.findOne({
    //   where: { id: userId },
    //   relations: ["profile", "todos"],
    // });
    // return user;

    //! Using Field Resolvers
    //* For Typeorm Postgres, use QueryBuilder for joining

    //! Using Query Builder
    const user = await getRepository(User)
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.profile", "profile")
      .leftJoinAndSelect("users.todos", "todos")
      .leftJoinAndSelect("users.comments", "comments")
      .where("users.id = :id", { id: userId })
      .getOne();
    return user;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth, logger)
  async getUserProfile(@Ctx() { req }: ContextType): Promise<User | undefined> {
    const userId = req.session!.uid;
    const userProfile = await getRepository(User)
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.profile", "profile")
      .where("users.id = :userId", { userId })
      .getOne();
    return userProfile;
  }

  @Mutation(() => Profile, { nullable: true })
  @UseMiddleware(isAuth)
  async createProfile(
    @Arg("gender", () => Gender) gender: Gender,
    @Arg("photo") photo: string,
    @Ctx() { req }: ContextType
  ): Promise<Profile | null> {
    const userId = req.session!.uid;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return null;
    }

    const profile = new Profile();
    profile.gender = gender;
    profile.photo = photo;
    profile.user = user;
    await profile.save();

    user.profile = profile;
    await user.save();
    return profile;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(@Ctx() { req }: ContextType): Promise<boolean> {
    try {
      const userId = req.session!.uid;
      await User.delete(userId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean | null> {
    const userId = await redis.get(confirmUserPrefix + token);
    if (!userId) {
      return false;
    }

    await User.update({ id: userId }, { confirmed: true });

    await redis.del(token);

    return true;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(forgotPasswordPrefix + token, user.id, "ex", 60 * 60 * 24); // expires 1 day

    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    );

    return true;
  }

  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("changePasswordInput") changePasswordInput: ChangePasswordInput,
    @Ctx() ctx: ContextType
  ): Promise<User | null> {
    const { token, password } = changePasswordInput;
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
      return null;
    }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);
    const newUser = await user.save();

    ctx.req.session!.uid = user.id;
    return newUser;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ContextType): Promise<boolean> {
    return new Promise((res: any, rej: any) => {
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return rej(false);
        }

        ctx.res.clearCookie("qid");
        return res(true);
      });
    });
  }

  @Mutation(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: ContextType
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AuthenticationError("Invalid Login");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new AuthenticationError("Invalid Login");
    }

    //* Uncomment if need user to confirm email
    // if (!user.confirmed) {
    //   throw new AuthenticationError("User email not confirmed");
    // }

    ctx.req.session!.uid = user.id;

    return true;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("registerInput") { email, password }: RegisterInput
  ): Promise<boolean> {
    const emailExist = await User.findOne({ where: { email } });

    if (emailExist) {
      throw new AuthenticationError("Email Already in Use");
    }

    const hashedPassword = await hash(password, 12);

    try {
      const user = await User.create({
        email,
        password: hashedPassword,
      }).save();

      await sendEmail(email, await createConfirmationUrl(user.id));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
