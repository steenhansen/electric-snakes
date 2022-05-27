
import project_constants from "./project-constants"
import {dateInSeconds, setUpTesting} from "./project-routines"
import snake_pages from "./snake-pages"
import action_types from "./store/action-types"
import game_store from "./store/game-store"
import socket_events_spawn from "./store/socket-events"
import {IConnection, IConnectionArray} from "./types/server-interfaces"       /// conosle.log
import {IProcessEnv, IWebSocket} from "./types/system-interfaces"

require("@babel/polyfill");

global.CONFIG_TESTING_VARS = setUpTesting()

const express = require("express")
const SocketServer = require("ws").Server
const {DEFAULT_PORT, TIME_OUT_SECONDS} = project_constants
const PORT = process.env.PORT || DEFAULT_PORT
const user_connections: IConnectionArray = {}
const socket_events = socket_events_spawn(user_connections, game_store)

const server = express()
.use(express.static("public", {maxAge: "1y"}))
.use(snake_pages.getPage)
.listen(PORT, () => console.error(`Listening on ${ PORT }`))
const socket_server = new SocketServer({server})

socket_server.on("connection", (web_socket: IWebSocket, req:any) => {
  web_socket.upgradeReq = req;       // https://github.com/websockets/ws/pull/1099
  const slash_question_uuid: string = web_socket.upgradeReq.url
  const uuid_key: string = slash_question_uuid.substring(2)
  const seconds_connected_at: number = dateInSeconds()
  user_connections[uuid_key] = {connection_seconds: seconds_connected_at, web_socket}
  web_socket.on("close", () => {
    delete user_connections[uuid_key]
    game_store.dispatch(action_types.disconnectBrowser_ac(uuid_key))
  })
  web_socket.on("message", socket_events.incomingMessage)
})

setInterval(() => {
  socket_events.deleteTimedOutGames(TIME_OUT_SECONDS)
  socket_events.deleteTimedOutHumans(TIME_OUT_SECONDS)
}, 1000)
