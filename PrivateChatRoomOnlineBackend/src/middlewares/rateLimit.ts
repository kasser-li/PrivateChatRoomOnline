// 请求限流
import rateLimit, { Options } from "express-rate-limit";
import { Express, Request } from "express";

import { getConfig } from "../config/config";



export const rateLimitMiddleware = (app: Express) => {
  const { rateLimit: rateLimitConfig } = getConfig();

  const limiter = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: rateLimitConfig.max,
    message: rateLimitConfig.message,
    keyGenerator: (req: Request): string => {
      // 从自定义头部获取 IP 地址
      console.log("rateLimitConfig", rateLimitConfig);
      
      const ip = rateLimitConfig.customHeader
        ? req.headers[rateLimitConfig.customHeader]
        : req.ip;
      return typeof ip === "string" ? ip : "";
    },
  });

  app.use(limiter);
};