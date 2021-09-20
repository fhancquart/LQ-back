import { Cards_category } from "../entities/cards/Cards_category";
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