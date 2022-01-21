import { Cards_category } from "../entities/cards/Cards_category";
import { Field, ObjectType, InputType } from "type-graphql";
import { Cards_image } from "../entities/cards/Cards_image";
import { Cards_tags } from "../entities/cards/Cards_tags";
import { Cards_family } from "../entities/cards/Cards_family";
import { Cards_game } from "../entities/cards/Cards_game";

@InputType()
export class categoryFields {
  @Field()
  cd_name: string;
  @Field()
  cd_link: string;
  @Field()
  cd_resume: string;
}

@InputType()
export class categoryGameFields {
  @Field()
  cg_category: number;
  @Field()
  cg_family: number;
  @Field()
  cg_number: number;
  @Field()
  cg_question: string;
  @Field()
  cg_reponse: string;
}

@ObjectType()
export class allPack {
  @Field(() => [Cards_category])
  pack: Cards_category[];
}

@ObjectType()
export class allImages {
  @Field(() => [Cards_image])
  images: Cards_image[];
}

@InputType()
export class allFamily {
  @Field(() => [Cards_family])
  family: Cards_family[];
}

@ObjectType()
export class currentGame {
  @Field(() => [Cards_category])
  category: Cards_category[];
  @Field(() => [Cards_family])
  family: Cards_family[];
  @Field(() => [Cards_game])
  game: Cards_family[];
}

@ObjectType()
export class allTags {
  @Field(() => [Cards_tags])
  tags: Cards_tags[];
}

@ObjectType()
export class FieldName {
  @Field()
  message: string;
}

@InputType()
export class familyFields {
  @Field()
  cf_category: number;
  @Field()
  cf_number: number;
  @Field()
  cf_name: string;
  @Field()
  cf_color: string;
}