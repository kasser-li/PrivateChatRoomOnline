import express from "express";
import cookieParser from 'cookie-parser'

const ssoRouter = express.Router()

ssoRouter.use(cookieParser())

ssoRouter.all('/*', function(req:any, res:any, next:any) {
    
    console.log('进入sso路由中间件', req.cookies, req.signedCookies, req.headers)
    // if(validate_token) {
        next()
    // } else {
    //     // do something 可以是重定向等
    //     res.send()
    // }
})

export default ssoRouter