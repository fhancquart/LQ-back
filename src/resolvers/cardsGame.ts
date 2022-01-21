import {
    Resolver,
    Arg,
    Mutation,
    UseMiddleware,
    Ctx,
  } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { categoryGameFields, currentGame, FieldName } from "../utils/cardsField";
import { getConnection } from "typeorm";
import { Cards_game } from "../entities/cards/Cards_game";
import { MyContext } from "../types";


@Resolver(Cards_game)
export class Cards_gameResolver {

    @Mutation(() => FieldName)
    @UseMiddleware(isAuth)
    async game(
      @Arg("options") options: categoryGameFields
    ): Promise<FieldName> {
  
      const result = await getConnection()
              .createQueryBuilder()
              .insert()
              .into(Cards_game)
              .values([
                { ...options }
              ])
              .execute();
      
      if (result) {
        return {
          message: "Inséré",
        };
      } else {
        return {
          message: "Erreur",
        };
      }
    }

    @Mutation(() => FieldName, { nullable: true })
    @UseMiddleware(isAuth)
    async isGameExist(
      @Arg("cg_category") cg_category: number
    ): Promise<FieldName> {
      const response = await Cards_game.findOne({
        where: { cg_category },
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

    @Mutation(() => Cards_game, { nullable: true })
    @UseMiddleware(isAuth)
    async updateGame(
      @Arg("cg_category") cg_category: number,
      @Arg("cg_family") cg_family: number,
      @Arg("cg_number") cg_number: number,
      @Arg("cg_question") cg_question: string,
      @Arg("cg_reponse") cg_reponse: string
    ): Promise<Cards_game | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Cards_game)
        .set({ cg_question, cg_reponse })
        .where("cg_category = :cg_category and cg_family = :cg_family and cg_number = :cg_number", {
          cg_category,
          cg_family,
          cg_number
        })
        .execute();
      return result.raw[0];
    }

    // @Query(() => currentGame)
    // @UseMiddleware(isAuth)
    // async getCurrentGame(
    //   @Arg("cd_id") cd_id: number
    // ): Promise<currentGame | null>  {      

    //   const query = await getConnection().createQueryBuilder(Cards_category, 'c')
    //   .addSelect('f.cf_color', 'f')
    //   .innerJoin(Cards_family, 'f', 'c.cd_id = f.cf_category')
    //   .where(`c.cd_id = ${cd_id}`)
    //   .getRawMany()

    //   console.log(query)

    //   return {category: query}
    // }

    @Mutation(() => currentGame, { nullable: true })
    @UseMiddleware(isAuth)
    async getCurrentGame(
      @Arg("cd_id") cd_id: number,
      @Ctx() { req }: MyContext
    ): Promise<currentGame | null> {      

      let Cards_category = await getConnection().query(`
          select *
          from cards_category
          where cd_id = ${cd_id} and cd_userid = ${req.session.userId}
      `); 

      let Cards_family = await getConnection().query(`
          select *
          from cards_family
          where cf_category = ${cd_id}
      `); 
      let Cards_game = await getConnection().query(`
          select *
          from cards_game
          where cg_category = ${cd_id}
      `);
      return { category: Cards_category, family: Cards_family, game: Cards_game,} ;
    }
    
}