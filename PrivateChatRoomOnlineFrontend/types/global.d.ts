declare global{
    interface Window {
        __APP__INFO__:__APP__INFO__
        global_config: {
            wsURl: string;
        } 
    }
}

export {}