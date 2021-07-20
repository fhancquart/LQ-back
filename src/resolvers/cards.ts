import {
  Resolver,
  Arg,
  Mutation,
  InputType,
  Field,
  Ctx,
  UseMiddleware,
  Query,
  ObjectType,
} from "type-graphql";
/*Entities*/
import { Cards_category } from "../entities/cards/Cards_category";
/*Context*/
import { MyContext } from "../types";
/*Middleware*/
import { isAuth } from "../middleware/isAuth";
import { getConnection } from "typeorm";

@InputType()
class categoryFields {
  @Field()
  cd_name: string;
  @Field()
  cd_link: string;
  @Field()
  cd_resume: string;
}



@ObjectType()
class allPack {
  @Field(() => [Cards_category])
  pack: Cards_category[];
}

@ObjectType()
export class FieldName {
  @Field()
  message: string;
}

@Resolver(Cards_category)
export class Cards_categoryResolver {
  @Mutation(() => Cards_category)
  @UseMiddleware(isAuth)
  async category(
    @Arg("options") options: categoryFields,
    @Ctx() { req }: MyContext
  ): Promise<Cards_category> {
    return Cards_category.create({
      ...options,
      cd_userid: req.session.userId,
    }).save();
  }

  @Mutation(() => Cards_category, { nullable: true })
  @UseMiddleware(isAuth)
  async updateCategory(
    @Arg("cd_name") cd_name: string,
    @Arg("cd_link") cd_link: string,
    @Arg("cd_resume") cd_resume: string,
    @Arg("cd_id") cd_id: number,
    @Ctx() { req }: MyContext
  ): Promise<Cards_category | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Cards_category)
      .set({ cd_name, cd_link, cd_resume })
      .where("cd_id = :cd_id and cd_userid = :cd_userid", {
        cd_id,
        cd_userid: req.session.userId,
      })
      .execute();
    //console.log(result.raw[0])
    return result.raw[0];
  }

  @Query(() => Cards_category, { nullable: true })
  @UseMiddleware(isAuth)
  async getInfoPack(
    @Arg("cd_id") cd_id: number
  ): Promise<Cards_category | undefined> {
    return Cards_category.findOne({ where: { cd_id } });
  }

  @Mutation(() => FieldName, { nullable: true })
  @UseMiddleware(isAuth)
  async isPackNameExisting(
    @Ctx() { req }: MyContext,
    @Arg("cd_name") cd_name: string
  ): Promise<FieldName> {
    const response = await Cards_category.findOne({
      where: { cd_userid: req.session.userId, cd_name },
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

  @Query(() => allPack)
  @UseMiddleware(isAuth)
  async getAllPack(@Ctx() { req }: MyContext): Promise<allPack> {
    const allPack = await getConnection().query(`
            select *
            from cards_category
            where cd_userid = ${req.session.userId}
        `);
    return { pack: allPack };
  }
}

