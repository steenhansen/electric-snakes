
import * as express from "express"

export interface IWebSocket {
    send: (message: any) => void
    onmessage: {}
    onopen: {}
    onclose: {}
    upgradeReq?: any
    on?: any
}

export interface IWindow extends Window {
    SNAKE_WS_RANDOM_KEY: any
    GLOBAL_WEBPACK: any
    SNAKE_TEST_CONFIG: any
}

export interface IProcessEnv {
    [key: string]: string | undefined
}

export type IRequest = express.Request
export type IResponse = express.Response

// stop some webstorm red-underlining
class Process {}

export interface IProcess extends Process {
    env: any
    exit: any
}
