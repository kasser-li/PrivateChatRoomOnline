const getCache = (key: string) => {
  const cache = localStorage.getItem(key);
  if (cache) {
    return JSON.parse(cache);
  }
  return null;
};
// 设置缓存数据 过期时间 单位为秒
const setCache = (key: string, value: any, expireTime?: number) => {
  if (expireTime) {
    value.expireTime = Date.now() + expireTime * 1000;
  }
  localStorage.setItem(key, JSON.stringify(value));
};
const delCache = (key: string) => {
  localStorage.removeItem(key);
};
export { getCache, setCache, delCache };
