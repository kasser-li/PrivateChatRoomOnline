import { Request, Response, NextFunction } from "express";
import {IUser} from "../../models/User";
import { AuthUser } from './../../types/user';
import { ClientBadRequestError } from "../../errors";
import jwt from 'jsonwebtoken';
import * as ws from 'ws';
// ws 连接测试
// const clients: { [key: string]: ws.WebSocket } = {};

export interface SocketInfo {
  userId: string[], //用户id，
  ws: ws.WebSocket[] ,//ws.WebSocket,
}
export interface SocketData {
  // roomId: string, //房间id做键值，
  [key: string] : SocketInfo[] 
}
const clients: SocketData = {} as SocketData;


export const hello = async (ws: ws.WebSocket, req: Request, next: NextFunction) => {
    ws.on('message', function(msg: any) {
      // ws.listenerCount('message');
      // console.log('收到来自前端的消息：',msg.toString());
      if(msg.toString() === 'ping'){
        // 不做处理，不做回应
      }else{
        const SECRETJWT = process.env.SECRETJWT;
        if (!SECRETJWT) {
          // 如果 SECRETJWT 未定义，抛出错误或返回响应
          return next(new Error('SECRETJWT is not defined in environment variables'));
        }
        const token = req.query.token as string;
        // 解析token 获取用户信
        const userInfo = jwt.verify(token, SECRETJWT) as AuthUser;  
        console.log('front userinfo: ',userInfo);
        let socketData = JSON.parse(msg);
        let roomId = socketData.data.roomId;
        console.log('front send msg: ',socketData);
        if(socketData.type == 'newMessage'){
          // 检查房间是否存在，如果不存在则创建
          if(!clients[roomId]){
            clients[roomId] = []; // Initialize as an empty array
            clients[roomId].push({
              userId: [userInfo.id],
              ws: [ws]
            });
          }else{
            // 检查房间中是否存在该用户的socket连接，如果不存在则添加
            if(!clients[roomId].some(client => client.userId.includes(userInfo.id))){
              clients[roomId].push({
                userId: [userInfo.id],
                ws: [ws]
              });
            }
            // // 遍历房间内的所有客户端，将消息发送给每个客户端,不包括当前客户端
            // for (let client of clients[roomId]) {
            //   if(!client.userId.includes(userInfo.id)){
            //     client.ws.forEach((socket: ws.WebSocket) => socket.send(JSON.stringify({type: 'newMessage', message: socketData.data})));
            //   }
            // }         
          }
          console.log('clients111',clients);
        }        
      }
      
    });
    console.log('socket success get token',req.query.token);
    // const data = {
    //   code: '200',
    //   data:req.query.token
    // }

    // ws.send(JSON.stringify(data));
}
export const newsBroadcast = async (clientOn: string,data:any) => {
    // 遍历房间内的所有客户端，将消息发送给每个客户端,不包括当前客户端
    const { 
      roomId,
      userId,
      message
    } = data
    console.log('clients',clients);
    
    for (let client of clients[roomId]) {
      if(!client.userId.includes(userId)){
        client.ws.forEach((socket: ws.WebSocket) => socket.send(JSON.stringify({type: 'newMessage', message: message})));
      }
    }  
}
export default { newsClients: clients, }