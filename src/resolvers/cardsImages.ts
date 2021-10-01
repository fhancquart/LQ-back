import { isAuth } from "../middleware/isAuth";
import {
    Query,
    Resolver,
    UseMiddleware
  } from "type-graphql";
import { getConnection } from "typeorm";
import { Cards_image } from "../entities/cards/Cards_image";
import { allImages, allTags } from "../utils/cardsField";

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
    
}