import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  // 定义一个公共的错误代码属性
  public errorCode: number;
  public data: any;
  // 构造函数，接受错误代码和可选的错误信息
  constructor(errorCode: number, message?: string) {
    // 调用父类（Error）的构造函数，传递错误信息
    super(message);

    // 设置错误名称为当前类的名称
    this.name = this.constructor.name;

    // 设置错误代码
    // this.errorCode = errorCode;
    this.errorCode = 200;
    this.data = {
      errorCode: errorCode,
      message: message || "An error occurred.",
    };

    // 捕获当前错误的堆栈信息，以便调试
    Error.captureStackTrace(this, this.constructor);
  }
}
