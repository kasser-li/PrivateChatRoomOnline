import { Express, Request, Response, Router } from "express";
import logger from "../logger";

// 路由导入
import authRoute from './api/authRouter';
import userRoute from './api/userRouter';
import roomRouter from "./api/roomRouter";
import messageRouter from "./api/messageRouter";

interface RouterConf {
  path: string;
  router: Router;
  meta?: any;
}

const routerGroup: RouterConf[] = [
  {
    path: "/user",
    router: userRoute,
  },
  {
    path: "/auth",
    router: authRoute,
  },
  {
    path: "/room",
    router: roomRouter,
  },
  {
    path: "/message",
    router: messageRouter,
  },
];

function registerRouteGroup(app: Express, routes: RouterConf[]) {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
}

function initRoutes(app: Express) {
  logger.info("Router initialization");

  app.get("/", (req: Request, res: Response) => {
    logger.info("This is an info message");
    logger.warn("This is a warning message");
    logger.error("This is an error message");
    res.send("Hello, Object Storage System!");
  });
  registerRouteGroup(app, routerGroup);
}

export default initRoutes;