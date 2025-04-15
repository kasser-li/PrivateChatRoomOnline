import mongoose, { ConnectOptions } from 'mongoose';

const mongoUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/PrivateChatRoomServer';

const options: ConnectOptions = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 5,
  autoIndex: true,
  retryWrites: true,
  w: 'majority',
  readPreference: 'primary',
  authSource: 'admin',
};

export const initializeMongoose = async () => {
  try {
    await mongoose.connect(mongoUrl, options);
    console.log('MongoDB 连接成功...');
  } catch (err) {
    console.error('MongoDB 连接错误:', err);
  }

  mongoose.connection.on('connected', () => {
    console.log('Mongoose 已连接到数据库');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose 连接错误:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose 已断开与数据库的连接');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('应用程序终止，Mongoose 已断开连接');
    process.exit(0);
  });
};