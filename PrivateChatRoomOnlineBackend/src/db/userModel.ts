// //引入mongoose
// // let mongoose = require("mongoose");
// import mongoose from "mongoose";


// //创建目标模型对象
// let userSchema = new mongoose.Schema({
//   acc: String,
//   pwd: String,
// });
// //建立模型对象与集合的关联关系
// let userModel = mongoose.model("userModel", userSchema, "user");
// ===================================
// 引入models下所有文件
// import fs from 'fs';
// import path from 'path';
 
// const modelsPath = path.join(__dirname, '../models');
 
// fs.readdirSync(modelsPath).forEach(file => {
//   if (file.endsWith('.js')) {
//     import(path.join(modelsPath, file)); // 注意：这种方式在顶层代码中不支持同步导入，通常用在异步函数中。
//   }
// });
// ===================
// const fs = require('fs');
// const path = require('path');
 
// // 假设你的models目录位于根目录下的models文件夹
// const modelsPath = path.join(__dirname, '../models');
 
// // 读取models目录下的所有文件
// fs.readdirSync(modelsPath).forEach((file: string) => {
//   if (file.endsWith('.js')) {
//     // 动态require每个模型文件
//     require(path.join(modelsPath, file));
//   }
// });
