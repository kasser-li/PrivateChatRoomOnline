import { createLogger, transports, format, config } from 'winston';
import path from 'path';
import fs from 'fs';

// 确保日志目录存在，如果不存在则创建
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 自定义日志级别
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
  }
};

// 创建日志记录器
const logger = createLogger({
  levels: customLevels.levels,
  // 设置日志级别，根据环境变量决定日志级别
  // 在生产环境中记录警告及以上级别的日志，在其他环境中记录信息及以上级别的日志
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'http',
  // 设置日志格式
  format: format.combine(
    // 添加时间戳
    format.timestamp(),
    // 自定义日志输出格式
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  // 设置日志输出的传输方式
  transports: [
    // 控制台输出，添加颜色
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }), // 使用自定义颜色
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      )
    }),
    // 错误日志文件输出，记录错误级别的日志
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    }),
    // 组合日志文件输出，记录所有级别的日志
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
    // HTTP 请求日志文件输出，记录HTTP级别的日志
    new transports.File({
      filename: path.join(logDir, 'http.log'),
      level: 'http',
    }),
  ],
});

// 添加颜色配置
config.addColors(customLevels.colors);

export default logger;