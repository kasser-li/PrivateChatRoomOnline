import { onUnmounted } from 'vue'

// 基础配置
interface SocketOptions {
    // 心跳间隔
    heartbeatInterval?: number
    // 超时重传
    reconnectInterval?: number
    // 最大重连次数
    maxReconnectAttempts?: number

}
class Socket {
    url: string | null = ''
    ws: WebSocket | null = null
    opts: SocketOptions
    reconnectAttempts: number = 0
    listeners: {[key:string]:Function[]} = {}
    // 心跳间隔
    heartbeatInterval: number | null = null

    // 构造函数
    constructor(url:string,opts: SocketOptions = {}) {
        this.url = url
        this.opts = {
            heartbeatInterval: 30000,
            reconnectInterval: 5000,
            maxReconnectAttempts: 5,
            ...opts
        }
        this.init()
    }
    // 初始化
    init(){
        if (!this.url) {
            throw new Error('WebSocket URL 未定义');
        }
        this.ws = new WebSocket(this.url as string)
        this.ws.onopen = this.onOpen.bind(this)
        this.ws.onmessage = this.onMessage.bind(this)
        this.ws.onerror = this.onError.bind(this)
        this.ws.onclose = this.onClose.bind(this)
    }
    // 打开连接时触发

    onOpen(event:Event){
        console.log('WebSocket连接成功',event)
        this.reconnectAttempts = 0
        this.startHeartbeat()
        this.emit('open',event)
    }
    // 收到消息时触发
    onMessage(event: MessageEvent){
        this.emit('message',event)

    }
    // 连接错误时触发
    onError(event: Event){
        console.log('WebSocket连接错误',event)
        this.emit('error',event)
    }
    // 重连逻辑
    onClose(event: CloseEvent){
        console.log('WebSocket连接关闭',event)
        this.stopHeartbeat()
        this.emit('close',event)

        if (this.opts.maxReconnectAttempts && this.opts.maxReconnectAttempts !== 0 && this.reconnectAttempts < this.opts.maxReconnectAttempts) {
            setTimeout(() => {
                this.reconnectAttempts++
                this.init()
            }, this.opts.reconnectInterval)
        }
    }
    // 心跳检测
    startHeartbeat(){

        this.heartbeatInterval = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                // 发送心跳消息，例如一个空字符串或特定格式的消息
                this.ws.send('ping')
            }
        }, this.opts.heartbeatInterval as number)
    }
    stopHeartbeat(){
        if(this.heartbeatInterval){
            clearInterval(this.heartbeatInterval as number)
            this.heartbeatInterval = null
        }
    }
    // 发送消息
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data)
        } else {
            console.error('WebSocket is not open. Ready state: ', this.ws?.readyState)
        }
    }
    // 事件监听
    on(event: string, callback: Function) {
        if(!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(callback)
    }
    // 移除事件监听
    off(event: string) {
        if(this.listeners[event]) {
            delete this.listeners[event]
        }
    }
    // off(event: string, callback: Function) {
    //     if(this.listeners[event]) {
    //         this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
    //     }
    // }
    emit(event: string, ...args: any[]) {
        if(this.listeners[event]) {
            this.listeners[event].forEach((callback) => {
                callback(...args)
            })
        }
    }
}

export function useWebSocket(url: string, opts: SocketOptions = {}) {
    // 初始化socket
    const socket = new Socket(url, opts)
    onUnmounted(() => {
        socket.off('open')
        socket.off('message')
        socket.off('error')
        socket.off('close')
        socket.ws?.close()
    })
    return {
        socket,
        send: socket.send,
        on: socket.on,
        off: socket.off,
        emit: socket.emit // 此方法尽量不暴露出去，只在内部使用
    }
}   