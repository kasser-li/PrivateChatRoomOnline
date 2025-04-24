import express,{ Express, NextFunction, Request, Response, Router } from "express";
import logger from "../logger";
import ws from "ws";
import expressWs from "express-ws";
// 路由导入 webSocket
import wsRouter from "./socketapi/wsRouter";
let wsapp = expressWs(express())
let wssapp = wsapp.app;

const clients: { [key: string]: ws.WebSocket } = {};



function initSocketRoutes(app: Express) {
  logger.info("SocketRouter initialization");
  var expressWss = expressWs(app);
  wssapp = expressWss.app;  
  wsRouter.forEach((route)=>{
    wssapp.ws('/ws'+ route.path, route.middleware)
  })
//   wssapp.ws('/ws/hello', (ws: ws.WebSocket, req: Request, next: NextFunction) => {
//     wssapp.on('message', function(msg: any) {
//       if(msg.toString() === 'ping'){
//         // 不做处理，不做回应
//       }else{
//         // let u = req.body
//         // console.log('front userinfo: ',u);
//         let socketData: { roomId: string; type: string } = JSON.parse(msg);
//         console.log('front send msg: ',socketData.type);
//         if(socketData.type == 'newMessage'){
//           if(clients[socketData.roomId] && clients[socketData.roomId].readyState === ws.OPEN){
//             clients[socketData.roomId].send(msg);
//           }else{
//             clients[socketData.roomId] = ws;
//             ws.send('pong')
//           }
//         }        
//       }
      
//     });
// })
return wssapp
}
export {initSocketRoutes,wsapp,wssapp};
// =========================
// import express,{ Express, NextFunction, Request, Response, Router } from "express";
// import http from "http";
// import { Server } from "socket.io";
// import logger from "../logger";




// function initSocketRoutes(app: Express) {
//   logger.info("SocketRouter initialization");
//   // 初始化io
//   const io = new Server(app.get('ws'));
//   io.on('connection', (socket) => {
//     console.log('a user connected');
//     io.on('/ws/hello', (msg) => {
//       console.log('a user connected',msg);
//     });
//   });

  
//   return io;
// }
// const wsapp = express();
// const wssapp = http.createServer(wsapp);


// const wsapp = expressWs(express()).app;

// const initSocketRoutes = () => {
//   logger.info("SocketRouter initialization");
//   wsRouter.forEach((route)=>{
//     wsapp.ws('/ws'+ route.path, route.middleware)
//   })
//   wsapp.listen(8081);
// }
// export {initSocketRoutes};

