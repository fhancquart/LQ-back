import "reflect-metadata"; 
import "dotenv-safe/config"
//Node
import cors from 'cors';
// import path from "path";
//Express
import express from 'express';
import session from 'express-session';
//Apollo
import {ApolloServer} from 'apollo-server-express';
//GraphQL
import {buildSchema} from 'type-graphql';
//TypeORm
import {createConnection} from 'typeorm'
/*Redis*/
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
/*Others*/
import {COOKIE_NAME, _prod_} from './constant';
/*Entities*/
import { User } from "./entities/User";
import { Cards_category } from "./entities/cards/Cards_category";
/*Loader*/
import { createUserLoader } from "./utils/createUserLoader";
/*Resolver*/
import { UserResolver } from "./resolvers/user";
import { Cards_categoryResolver } from "./resolvers/cards";
import { Cards_family } from "./entities/cards/Cards_family";
import { Cards_familyResolver } from "./resolvers/cardsFamily";
import { Cards_gameResolver } from "./resolvers/cardsGame";
import { Cards_game } from "./entities/cards/Cards_game";
import { Cards_image } from "./entities/cards/Cards_image";
import { Cards_tags } from "./entities/cards/Cards_tags";
import { Cards_imageResolver } from "./resolvers/cardsImages";
import path from "path";

const index = async () => {
 
    const conn = await createConnection({
        type: 'mysql',
        url: process.env.DATABASE_URL,
        logging: true,
        //synchronize: true, //pas en production
        migrations: [path.join(__dirname, './migrations/*')],
        entities: [User, Cards_category, Cards_family, Cards_game, Cards_image, Cards_tags]
    });
    await conn.runMigrations(); 

    // console.log(process.env.CORS_ORIGIN)

    const app = express();

    const RedisStore = connectRedis(session)
    const redis = new Redis(process.env.REDIS_URL);    
    app.set("trust proxy", 1);
    app.use(
        cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        }) 
    );

    app.use(
        session({ //Redis 
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis, 
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
                httpOnly: true,
                secure: _prod_,
                sameSite: 'lax',
                domain: _prod_ ? ".learnerquiz.info" : undefined
            },
            secret: process.env.SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({ 
        schema: await buildSchema({ 
            resolvers: [UserResolver, Cards_categoryResolver, Cards_familyResolver, Cards_gameResolver, Cards_imageResolver],
            validate: false
        }),
        context: ({req, res}) => ({
            req, 
            res, 
            redis, 
            userLoader: createUserLoader(),
        }) //types.ts
    });

    apolloServer.applyMiddleware({
        app,
        cors: false
    });

    app.listen(parseInt(process.env.PORT), () => {
        console.log("Serveur actif sur :4000")
    })

}

index().catch((err) => {
    console.error(err)
})
