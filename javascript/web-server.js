"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_constants_1 = require("./project-constants");
const project_routines_1 = require("./project-routines");
const snake_pages_1 = require("./snake-pages");
const action_types_1 = require("./store/action-types");
const game_store_1 = require("./store/game-store");
const socket_events_1 = require("./store/socket-events");
global.CONFIG_TESTING_VARS = project_routines_1.setUpTesting();
const express = require("express");
const SocketServer = require("ws").Server;
const { DEFAULT_PORT, TIME_OUT_SECONDS } = project_constants_1.default;
const env = require("node-env-file");
const PORT = process.env.PORT || DEFAULT_PORT;
const user_connections = {};
const socket_events = socket_events_1.default(user_connections, game_store_1.default);
const server = express()
    .use(express.static("public", { maxAge: "1y" }))
    .use(snake_pages_1.default.getPage)
    .listen(PORT, () => console.error(`Listening on ${PORT}`));
const socket_server = new SocketServer({ server });
socket_server.on("connection", (web_socket) => {
    const slash_question_uuid = web_socket.upgradeReq.url;
    const uuid_key = slash_question_uuid.substring(2);
    const seconds_connected_at = project_routines_1.dateInSeconds();
    user_connections[uuid_key] = { connection_seconds: seconds_connected_at, web_socket };
    web_socket.on("close", () => {
        delete user_connections[uuid_key];
        game_store_1.default.dispatch(action_types_1.default.disconnectBrowser_ac(uuid_key));
    });
    web_socket.on("message", socket_events.incomingMessage);
});
setInterval(() => {
    socket_events.deleteTimedOutGames(TIME_OUT_SECONDS);
    socket_events.deleteTimedOutHumans(TIME_OUT_SECONDS);
}, 1000);
