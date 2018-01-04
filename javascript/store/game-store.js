"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const snake_middleware_1 = require("./snake-middleware");
const snake_reducers_1 = require("./snake-reducers");
const redux = require("redux");
const INITIAL_STATE = {
    current_boards: immutable_1.Map(),
    hosted_games: immutable_1.Map(),
    human_players: immutable_1.Map(),
    machine_players: immutable_1.Map()
};
const game_store = redux.createStore(snake_reducers_1.default, INITIAL_STATE, redux.applyMiddleware(snake_middleware_1.default));
exports.default = game_store;
