import {Request, Response} from 'express';
import { Redis } from 'ioredis';
import {Session } from "express-session"
import { createUserLoader } from './utils/createUserLoader';

export type MyContext = { 
    req: Request & { session?: Session & { userId?: number } };
    redis: Redis,
    res: Response;
    userLoader: ReturnType<typeof createUserLoader>;
}