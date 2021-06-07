import { Resolver, Query, Arg, Ctx, Mutation } from "type-graphql";
import argon2 from 'argon2';
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../constant";
/*Entities*/
import { User } from "../entities/User";
/*Fields*/
import { UsernamePasswordinput, UserResponse } from "../utils/fields"
/*Context*/
import { MyContext } from "../types";
/*Verif*/
import { validateRegister } from "../utils/validateRegister";



@Resolver(User) 
export class UserResolver { 

    @Query(() => User, {nullable: true}) 
    me(@Ctx() {req}: MyContext){
        if(!req.session.userId){
            return null;
        }
        return User.findOne(req.session.userId);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordinput, 
        @Ctx() {req}: MyContext
    ): Promise<UserResponse>{

        const errors = validateRegister(options);
        if(errors){
            return {errors}; 
        }

        const hashedPassword = await argon2.hash(options.password); 
        let user;

        try{ 
            await getConnection().createQueryBuilder().insert().into(User).values( 
                {
                    username: options.username, 
                    email: options.email,
                    password: hashedPassword
                }
            ).execute();

            let find = await User.findOne({
                where: {email: options.email}
            });

            user = find as any;
        } catch(err){
            //console.log("--------",err)
            if(err.sqlMessage.includes("Duplicata")){
                return{
                    errors: [
                        {
                            field: "username",
                            message: "Username déjà existant"
                        }
                    ]
                }
            }
        }

        req.session.userId = user.id; 


        return {user};
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('usernameOrEmail') usernameOrEmail: string, 
        @Arg('password') password: string, 
        @Ctx() {req}: MyContext 
    ) : Promise<UserResponse> {
        //console.log(User)
        const user = await User.findOne( //email ou pseudo
            usernameOrEmail.includes('@') 
            ? {where: {email: usernameOrEmail}}
            : {where: {username: usernameOrEmail}} 
        );

        if(!user){
            return {
                errors: [
                    {
                        field: "usernameOrEmail", 
                        message: "Ce username n'existe pas",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if(!valid){
            return { 
                errors: [ 
                    {
                        field: "password",
                        message: "Ce mot de passe n'existe pas",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {user};
    }

    @Mutation(() => Boolean) 
    async logout(
        @Ctx() {req, res}: MyContext
    ){
        return new Promise ((resolve) => req.session.destroy((err: any) => {
            res.clearCookie(COOKIE_NAME);
            if(err){
                console.log(err)
                resolve(false)
                return
            }

            resolve(true)
        }) )
    }

    
}
