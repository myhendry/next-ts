import { PasswordInput } from "./../shared/PasswordInput";
import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "Email already in use" })
  email: string;
}
