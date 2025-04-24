// import express,{ Express, NextFunction, Request, Response, Router } from "express";
import {
  hello
} from "../../controllers/ws/messageController";
// import ws from "ws";
// import expressWs from "express-ws";
// import { authMiddleware } from "../../middlewares/authMiddleware";
// import { roleMiddleware } from "../../middlewares/roleMiddleware";

// const wsRouter = (app: Express)=>{
//   var expressWss = expressWs(app);
//   var wsapp = expressWss.app;
//     wsapp.ws('/hello', hello);
//     return wsapp
// }
const wsRouter =[
    {path: "/hello", middleware: hello}
]
export default wsRouter
