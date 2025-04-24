import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import express from 'express';
import { Request, Response, NextFunction } from 'express';
import morganMiddleware from "./middlewares/loggerHandler";
import errorHandler from "./middlewares/errorHandler";
import logger from "./logger";
// import { getConfig } from './config/config';
// import { connectDB } from './config/db';
// 装饰器
import 'reflect-metadata'


import initRoutes from './routes/index'
import { initSocketRoutes }  from './routes/socket'
// import usersRouter from './routes/usersRouter';

dotenv.config();


const parser = require('body-parser')
// 引入 tsconfig-paths/register 以支持路径别名
import 'tsconfig-paths/register';

// 引入集合模型创建代码文件
import './db/index'

const app = express();

// 中间件
app.use(morganMiddleware);
app.use(express.json());
app.use(parser.urlencoded({ extended: false}))

// token 统一鉴权
// app.use(function (req, res, next) {
//   const token = req.headers.token as string;
//   const SECRETJWT = process.env.SECRETJWT;

//   if (!SECRETJWT) {
//     // 如果 SECRETJWT 未定义，抛出错误或返回响应
//     return next(new Error('SECRETJWT is not defined in environment variables'));
//   }

//   if (token) {
//     jwt.verify(token, SECRETJWT, (err: Error | null, decoded: any) => {
//       if (decoded) {
//         // 将解析后的 token 加到请求的 user 属性，方便后续中间件使用
//         // req.user = decoded;
//         next();
//       } else {
//         // token 失效，进入错误中间件
//         next({ name: 'tokenError' });
//       }
//     });
//   } else {
//     // 不需要 token 鉴权的请求直接放行
//     next();
//   }
// });

// 路由

// 这里你可以导入并注册你的路由文件
// app.use('/api', usersRouter);
// app.use('', usersRouter);
// 注册路由文件
initRoutes(app)
initSocketRoutes(app)
// const wsapp = initSocketRoutes(app)
// console.log('wsapp', wsapp);

app.use(errorHandler);
// 统一处理错误
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// const PORT = process.env.PORT || 8099;

// try {
//   const mongoUri = process.env.MONGO_URI;
//   if (!mongoUri) {
//     throw new Error('MONGO_URI is not defined in environment variables');
//   }
//   connectDB().then(() => {
//     app.listen(PORT, () => {
//       logger.info(`Server running on http://localhost:${PORT}`);
//     });
//   });
// } catch (error) {
//   logger.error('Error connecting to MongoDB:', error);
// }


export default app