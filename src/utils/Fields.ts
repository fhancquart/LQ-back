import { Field, ObjectType, InputType } from "type-graphql";
import { User } from "../entities/User";

@ObjectType()
export class FieldError{
    @Field()
    field: string;
    @Field()
    message: string;
}

@InputType() 
export class UsernamePasswordinput {
    @Field()
    email: string;
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
export class UserResponse{
    @Field(() => [FieldError], {nullable: true}) //erreur ou null
    errors?: FieldError[];
    @Field(() => User, {nullable: true})
    user?: User;
}