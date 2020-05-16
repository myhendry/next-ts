import { AddCommentInput } from "./add-comment.input";
import { getRepository } from "typeorm";
import {
  Query,
  Resolver,
  Mutation,
  UseMiddleware,
  Ctx,
  Arg,
  Subscription,
  Root,
  PubSub,
  PubSubEngine,
  ID,
} from "type-graphql";

import { ContextType } from "./../../types/ContextType";
import { isAuth } from "./../middlewares/isAuth";
import { Todo } from "../../entity/Todo";
import { User } from "../../entity/User";
import { Profile } from "../../entity/Profile";
import { Comment } from "../../entity/Comment";

const ADDED_TODO = "added_todo";

@Resolver(() => Todo)
export class TodoResolver {
  @Subscription({
    topics: ADDED_TODO,
  })
  addedTodo(@Root() todoPayload: Todo): Todo {
    return todoPayload;
  }

  @Query(() => Profile, { nullable: true })
  @UseMiddleware(isAuth)
  async profile(@Ctx() { payload }: ContextType): Promise<Profile | undefined> {
    const profile = Profile.findOne({ where: { userId: payload?.userId } });
    return profile;
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async testQueryBuilder(): // @Ctx() { payload }: ContextType
  Promise<boolean | null> {
    const list = await getRepository(Todo)
      .createQueryBuilder("todos")
      .where(":id = ANY(todos.comments)", {
        id: "af7c4571-1759-44eb-9b02-8fda0d95c483",
      })
      .getMany();
    console.log("list", list);
    return true;

    /*
    const list = await getRepository(Comment)
      .createQueryBuilder("comments")
      .where("comments.body ILIKE :search", { search: `%eat%`` })
      .getMany();
    console.log("list", list);
    return true;

    const list = await getRepository(User)
      .createQueryBuilder("users")
      .leftJoinAndSelect("users.todos", "todo")
      .where("users.id = :userId", { userId: payload?.userId })
      .getOne();
    console.log("list", list);

    const todos = await getRepository(Todo)
      .createQueryBuilder("todo")
      .orderBy("todo.name", "DESC")
      .where("todo.userId = :userId", { userId: payload?.userId })
      .getMany();
    console.log(todos);

    const sql = await getRepository(Todo)
      .createQueryBuilder("todo")
      .orderBy("todo.name", "DESC")
      .where("todo.userId = :userId", { userId: payload?.userId })
      .getSql();
    console.log("sql", sql);
    return true;
    */
  }

  @Query(() => [Todo])
  async testTodos(): Promise<Todo[]> {
    const todos = await Todo.find({});
    return todos;
  }

  @Query(() => [Todo])
  @UseMiddleware(isAuth)
  async todos() {
    const todos = await getRepository(Todo)
      .createQueryBuilder("todos")
      .leftJoinAndSelect("todos.user", "user")
      .leftJoinAndSelect("todos.comments", "comments")
      .getMany();
    return todos;
  }

  @Mutation(() => Todo, { nullable: true })
  @UseMiddleware(isAuth)
  async addTodo(
    @Arg("name") name: string,
    @PubSub() pubSub: PubSubEngine,
    @Ctx() { payload }: ContextType
  ): Promise<Todo | null> {
    try {
      const user = await User.findOne({ where: { id: payload?.userId } });
      const todo = await Todo.create({
        name,
        user,
      }).save();
      await pubSub.publish(ADDED_TODO, todo);
      return todo;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addComment(
    @Arg("addCommentInput") { body, todoId }: AddCommentInput,
    @Ctx() { payload }: ContextType
  ): Promise<boolean> {
    const todo = await Todo.findOne({ where: { id: todoId } });
    const user = await User.findOne({ where: { id: payload?.userId } });
    if (!todo || !user) {
      return false;
    }
    try {
      await Comment.create({
        body,
        todo,
        user,
      }).save();
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTodo(@Arg("todoId", () => ID) todoId: string): Promise<boolean> {
    const todo = await Todo.findOne({ where: { id: todoId } });
    if (!todo) {
      return false;
    }
    try {
      await Todo.delete(todoId);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteComment(
    @Arg("commentId", () => ID) commentId: string
  ): Promise<boolean> {
    const comment = await Comment.findOne({ where: { id: commentId } });
    if (!comment) {
      return false;
    }
    try {
      await Comment.delete(commentId);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  //! Using Field Resolvers
  //* For Typeorm Postgres, use QueryBuilder for joining
  // @FieldResolver()
  // async user(@Root() todo: Todo) {
  //   const user = await User.findOne({ where: { id: todo.userId } });
  //   return user;
  // }
}
