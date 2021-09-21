import {
    Resolver,
    Arg,
    Mutation,
    UseMiddleware,
  } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { categoryGameFields, FieldName } from "../utils/cardsField";
import { getConnection } from "typeorm";
import { Cards_game } from "../entities/cards/Cards_game";

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
    
}