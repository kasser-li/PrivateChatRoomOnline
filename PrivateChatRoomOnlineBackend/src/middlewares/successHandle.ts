import { Response, NextFunction } from "express";

const successHandle = (data: any, res: Response, next: NextFunction) => {
  console.log('data',data);
  
  res.status(200).json({
    code: 200,
    success: true,
    data:{
        code:200,
        data
    },
  });
  next();
};

export default successHandle;
