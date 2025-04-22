import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
// import { PiniaPluginContext } from 'pinia'

// export interface PersitedStrate{
//     key?: string; // 默认使用store的id作为key
//     storage?: Storage; // 默认使用localStorage
//     path?: string[] | (string | number)[];
// }
// export interface PersistOptions{
//     enabled?: boolean; // 是否启用持久化
//     strategies?: PersitedStrate[] | PersitedStrate; // 持久化策略
// }
// type Store =PiniaPluginContext['store']
// type PartialState = Partial<Store['$state']>
// declare module 'pinia' {
//     export interface DefineStoreOptionsBase<S, Store> {
//         persist?: PersistOptions;
//     }
// }

// 创建
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

// 导出
export default pinia
