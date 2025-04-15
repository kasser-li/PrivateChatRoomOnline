import morgan, { StreamOptions } from "morgan";
import logger from "../logger";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      clientIP?: string;
    }
  }
}

// 创建一个流对象，用于将 morgan 的日志输出到 winston
const stream: StreamOptions = {
  write: (message: string) => logger.http(message.trim()),
};

// 自定义morgan格式
morgan.token("remote-addr", (req: Request) => req.clientIP);
morgan.token("user-agent", (req: Request) => req.headers["user-agent"] || "");
// morgan.token("req-headers", (req) => JSON.stringify(req.headers)); 如启动需要排除鉴权相关请求头
morgan.token(
  "ip-address",
  (req: Request) => req.headers["x-forwarded-for"]?.toString() || ""
);

// 配置 morgan 中间件
const morganMiddleware = morgan(
  ":remote-addr - :method :url :status :res[content-length] - :response-time ms :user-agent :ip-address",
  { stream }
);

export default morganMiddleware;
