import express, { Express } from "express";
import { getRealIp } from "../utils/ip";

declare global {
  namespace Express {
    interface Request {
      clientIP?: string;
    }
  }
}

export const requestParserMiddleware = (app: Express) => {
  app.use(express.json()); // 解析 JSON 格式的请求体
  app.use(express.urlencoded({ extended: true })); // 解析 URL 编码的请求体
  app.use((req, res, next) => {
    req.clientIP = getRealIp(req.headers);
    next()
  });
};