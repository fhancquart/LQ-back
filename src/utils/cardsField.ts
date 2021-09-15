import { Cards_category } from "../entities/cards/Cards_category";
import { Cards_game } from "../entities/cards/Cards_game";
import { Field, ObjectType, InputType } from "type-graphql";

@InputType()
export class categoryFields {
  @Field()
  cd_name: string;
  @Field()
  cd_link: string;
  @Field()
  cd_resume: string;
}

@ObjectType()
export class allPack {
  @Field(() => [Cards_category])
  pack: Cards_category[];
}

@ObjectType()
export class game {
  @Field(() => [Cards_game])
  game: Cards_game[];
}

@ObjectType()
export class FieldName {
  @Field()
  message: string;
}