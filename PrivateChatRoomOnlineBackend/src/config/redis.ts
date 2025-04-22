// 暂时禁用 Redis（内存缓存）

// import Redis,{RedisOptions} from "ioredis";
// import { getConfig } from "./config";
// console.log(getConfig('redis') as RedisOptions);

// const redis = new Redis(getConfig('redis') as RedisOptions);

// redis.on("connect", () => {
//   console.log("Connected to Redis");
// });

// redis.on("error", (err) => {
//   console.error("Redis error", err);
// });

// export default redis