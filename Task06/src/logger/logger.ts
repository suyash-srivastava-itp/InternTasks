import type { NextFunction, Request, Response } from "express";
import logger from "./logger.config.ts";



export function LogHandler(req : Request, res : Response, next : NextFunction) {
    logger.log({
        level : 'http',
        message : 'A-OK',
        request_host : req.host,
        request_url : req.url,
        request_headers : req.headers,
    })

    next();
}