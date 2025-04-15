import express from 'express';
const router = express.Router();
import mongoose from "mongoose";
// 引入自定义方法
import JWT from '../utils/JWT_Token';

// 注册
router.post('/user/register', async function(req, res) {
  let { acc, pwd } = req.body;
  console.log(acc, pwd);  
  if (!acc || !pwd) {
    res.send({
      code: 250,
      message: "账号或密码不能为空!",
    });
  }
  //根据账号查询用户数据
  let re = await mongoose.model("userModel").find({
    acc: acc,
  });
  if (re.length < 1) {
    const UserModel = mongoose.model("userModel");
    let newUser = await new UserModel({ acc, pwd }).save();
    console.log(newUser);
    
    res.send({
      code: 200,
      message: "注册成功!",
      data: {
        id:newUser._id,
        token: JWT.generate({ id: newUser._id , acc: newUser.acc, pwd: newUser.pwd }, '100000'),
      },
    });
  } else {
    res.send({
      code: 260,
      message: "该账号已存在!请重新输入!",
    });
  }


})

// 登录
router.post('/user/login', async function(req, res, next) {
  let { acc, pwd } = req.body;
  
  console.log('进入路由');
  console.log(acc, pwd);  
  if (!acc || !pwd) {
    res.send({
      code: 250,
      message: "账号或密码不能为空!",
    });
  }
  //根据账号查询用户数据
  let re = await mongoose.model("userModel").find({
    acc: acc,
    pwd: pwd,
  });
  console.log('re', re);
  if (re.length == 1) {
    // next(200)
    res.send({
      code: 200,
      message: "登录成功",
      data: {
        id:re[0]._id,
        token: JWT.generate({ id: re[0]._id , acc: re[0].acc, pwd: re[0].pwd }, '100000'),
      },
    });
  } else {
    res.send({
      code: 260,
      message: "账号或密码错误!请重新输入!",
    });
  }
})

// 获取用户id
router.get('/user/getuid', async function(req, res) {
  let acc = req.query.acc as { acc: string };
  console.log('acc',acc);
  if (!acc) {
    res.send({
      code: 250,
      message: "账号不能为空!",
    });
  }  
  let re = await mongoose.model('userModel').find({
    acc: acc,
  });
  if (re.length > 0) {
    res.send({
      code: 200,
      message: "查询成功",
      data: re[0]._id,
    });  
  }else {
    res.send({
      code: 250,
      message: "账号不存在",
    });
  }
  
})
export default router;
