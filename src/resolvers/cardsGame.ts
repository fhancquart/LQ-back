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
    
}