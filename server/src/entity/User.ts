import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";
import { Todo } from "./Todo";
import { Profile } from "./Profile";
import { Comment } from "./Comment";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  facebookId?: string;

  @Field()
  @Column({
    unique: true,
  })
  email: string;

  @Field()
  nickname(@Root() parent: User): string {
    return `${parent.id} ${parent.email}`;
  }

  @Column()
  password: string;

  @Column({ type: "bool", default: false })
  confirmed: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  created: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated: Date;

  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, (profile) => profile.user, { nullable: true })
  profile: Profile;

  @Field(() => [Todo])
  @OneToMany(() => Todo, (todo) => todo.user, {
    onDelete: "CASCADE",
  })
  todos: Todo[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user, {
    onDelete: "CASCADE",
  })
  comments: Comment[];
}
