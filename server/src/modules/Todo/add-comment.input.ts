import { InputType, Field } from "type-graphql";
import { MinLength } from "class-validator";

@InputType()
export class AddCommentInput {
  @Field()
  @MinLength(3)
  body: string;

  @Field()
  todoId: string;
}
