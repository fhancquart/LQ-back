"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const constant_1 = require("./constant");
const User_1 = require("./Entities/User");
const createUserLoader_1 = require("./utils/createUserLoader");
const user_1 = require("./resolvers/user");
const index = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    const conn = yield typeorm_1.createConnection({
        type: 'mysql',
        database: 'LQ',
        username: 'root',
        password: '',
        logging: true,
        synchronize: true,
        migrations: [path_1.default.join(__dirname, './migrations/*')],
        entities: [User_1.User]
    });
    yield conn.runMigrations();
    app.use(cors_1.default({
        origin: "http://localhost:3005",
        credentials: true
    }));
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default("127.0.0.1:6379");
    app.use(express_session_1.default({
        name: constant_1.COOKIE_NAME,
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: constant_1._prod_,
            sameSite: 'lax'
        },
        secret: "zaeposdfjhop",
        saveUninitialized: false,
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [user_1.UserResolver],
            validate: false
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: createUserLoader_1.createUserLoader(),
        })
    });
    apolloServer.applyMiddleware({
        app,
        cors: false
    });
    app.listen(5000, () => {
        console.log("Serveur actif sur :5000");
    });
});
index().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map