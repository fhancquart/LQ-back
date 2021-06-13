import { Resolver, Arg, Mutation, InputType, Field, Ctx, UseMiddleware } from "type-graphql";
/*Entities*/
import { Cards_category } from "../entities/cards/Cards_category";
/*Context*/
import { MyContext } from "../types";
/*Middleware*/
import { isAuth } from "../middleware/isAuth";

@InputType()
class categoryFields{
    @Field()
    cd_name: string;
    @Field()
    cd_link: string;
}

@Resolver(Cards_category) 
export class Cards_categoryResolver { 

    @Mutation(() => Cards_category) //Le fait de voter renvoi un booléen
    @UseMiddleware(isAuth)
    async category(
        @Arg("options") options: categoryFields,
        @Ctx() {req}: MyContext
    ): Promise<Cards_category>{
        return Cards_category.create({
            ...options,
            cd_userid: req.session.userId, //L'id de session du user
        }).save(); //Va effectuer un insert + un select
    }

}