import { isAuth } from "../middleware/isAuth";
import {
    Arg,
    Mutation,
    Query,
    Resolver,
    UseMiddleware
  } from "type-graphql";
import { getConnection } from "typeorm";
import { Cards_image } from "../entities/cards/Cards_image";
import { allImages, allTags } from "../utils/cardsField";
import { Cards_game } from "../entities/cards/Cards_game";

@Resolver(Cards_image)
export class Cards_imageResolver {

    @Query(() => allImages)
    @UseMiddleware(isAuth)
    async getImages(): Promise<allImages> {

        const allImages = await getConnection().query(`
            select * from cards_image
        `);

        return {images: allImages} ;
    }

    @Query(() => allTags)
    @UseMiddleware(isAuth)
    async getTags(): Promise<allTags> {

        const allTags = await getConnection().query(`
            select * from cards_tags
        `);

        return {tags: allTags} ;
    }

    @Mutation(() => allImages)
    @UseMiddleware(isAuth)
    async getImagesByTags(
    @Arg("img_tag1") img_tag1: number,
    @Arg("img_tag2", { nullable: true }) img_tag2: number
    ): Promise<allImages> {

        if(img_tag2 != undefined){
            let allImages = await getConnection().query(`
                select *
                from cards_image
                where img_tag1 = ${img_tag1} and img_tag2 = ${img_tag2}
            `);
            return {images: allImages} ;
        } else{
            let allImages = await getConnection().query(`
                select *
                from cards_image
                where img_tag1 = ${img_tag1}
            `);
            return {images: allImages} ;
        }
    }

    @Mutation(() => Cards_game, { nullable: true })
    @UseMiddleware(isAuth)
    async updateImage(
      @Arg("cg_category") cg_category: number,
      @Arg("cg_family") cg_family: number,
      @Arg("cg_number") cg_number: number,
      @Arg("cg_image") cg_image: string
    ): Promise<Cards_game | null> {
      const result = await getConnection()
        .createQueryBuilder()
        .update(Cards_game)
        .set({ cg_image })
        .where("cg_category = :cg_category and cg_family = :cg_family and cg_number = :cg_number", {
          cg_category,
          cg_family,
          cg_number
        })
        .execute();
      return result.raw[0];
    }


    
}