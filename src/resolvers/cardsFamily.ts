import { Resolver } from "type-graphql";
import { Cards_family } from "../entities/cards/Cards_family";
import { isAuth } from "../middleware/isAuth";
import { Mutation, UseMiddleware, Arg, Field, InputType } from "type-graphql";
import { getConnection } from "typeorm";
import { FieldName } from "./cards";

@InputType()
class familyFields {
  @Field()
  cf_category: number;
  @Field()
  cf_number: number;
  @Field()
  cf_name: string;
  @Field()
  cf_color: string;
}

@Resolver(Cards_family)
export class Cards_familyResolver {
    @Mutation(() => Cards_family)
    @UseMiddleware(isAuth)
    async family(
      // @Root() categoryId: Cards_category,
      @Arg("options") options: familyFields
    ): Promise<Cards_family> {
      return Cards_family.create({
        ...options
      }).save();
    }
  
    @Mutation(() => FieldName, { nullable: true })
    @UseMiddleware(isAuth)
    async isFamilyNameExist(
      @Arg("cf_category") cf_category: number,
      @Arg("cf_number") cf_number: number
    ): Promise<FieldName> {
      const response = await Cards_family.findOne({
        where: { cf_number, cf_category },
      });
  
      if (response) {
        return {
          message: "existe",
        };
      } else {
        return {
          message: "inexistant",
        };
      }
    }
  
    @Mutation(() => Cards_family, { nullable: true })
    @UseMiddleware(isAuth)
    async updateFamily(
      @Arg("cf_category") cf_category: number,
      @Arg("cf_name") cf_name: string,
      @Arg("cf_color") cf_color: string,
      @Arg("cf_number") cf_number: number
    ): Promise<Cards_family | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Cards_family)
        .set({ cf_name, cf_color })
        .where("cf_category = :cf_category and cf_number = :cf_number", {
          cf_category,
          cf_number,
        })
        .execute();
      return result.raw[0];
    }
}