import "reflect-metadata"; 
//Node
import cors from 'cors';
import path from "path";
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

const index = async () => {

    const conn = await createConnection({
        type: 'mysql',
        database: 'LQ',
        username: 'root',
        password: '',
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, './migrations/*')],
        entities: [User, Cards_category, Cards_family]
    });
    await conn.runMigrations(); 

    const app = express();

    const RedisStore = connectRedis(session)
    const redis = new Redis("127.0.0.1:6379");    

    app.use(cors({
        origin: "http://localhost:3005",
        credentials: true
    }))    

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
                sameSite: 'lax'
            },
            secret: "zaeposdfjhop",
            saveUninitialized: false,
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({ 
        schema: await buildSchema({ 
            resolvers: [UserResolver, Cards_categoryResolver],
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

    app.listen(4000, () => {
        console.log("Serveur actif sur :4000")
    })

}

index().catch((err) => {
    console.error(err)
})
