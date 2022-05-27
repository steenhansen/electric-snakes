"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const project_constants_1 = require("../project-constants");
const project_enums_1 = require("../types/project-enums");
const project_factories_1 = require("../types/project-factories");
const PlayerSnake_1 = require("./PlayerSnake");
const { WALL_HORIZONTAL, WALL_VERTICAL, WALL_DIAGONAL } = project_enums_1.EWallTypes;
const { EMPTY_INDEX_COLOR, NON_EXISTANT_XY, WALL_INDEX_COLOR, WS_MESSAGE_DELIM } = project_constants_1.default;
class SnakeGame {
    constructor(board_options) {
        this.milli_turn_window = board_options.get("milli_between_turns");
        this.board_width = board_options.get("board_width");
        this.board_height = board_options.get("board_height");
        this.max_size = board_options.get("max_size");
        this.wall_lines_current = board_options.get("wall_lines_current");
        this.player_current_positions = board_options.get("player_positions_current");
        this.player_snakes = (0, immutable_1.Map)();
        this.xy_board_colors = (0, immutable_1.Map)();
        this.createBoard();
        this.createSnakes();
        this.board_turn = 0;
    }
    boardWidth() {
        return this.board_width;
    }
    boardHeight() {
        return this.board_height;
    }
    justCrashedSnakes() {
        const crashed_snakes = [];
        const the_board_turn = this.board_turn;
        this.player_snakes.forEach((player_snake, index) => {
            if (typeof player_snake === "object") {
                if (player_snake.crashedOnTurn(the_board_turn)) {
                    const snake_head = player_snake.headSnake();
                    const head_vars = [snake_head.x, snake_head.y, index];
                    const head_move = head_vars.join(WS_MESSAGE_DELIM);
                    crashed_snakes.push(head_move);
                }
            }
        });
        return crashed_snakes;
    }
    lastBoardMoves() {
        const last_moves = [];
        this.player_snakes.forEach((player_snake, index) => {
            if (typeof player_snake === "object") {
                if (!player_snake.hasCrashed()) {
                    const snake_head = player_snake.headSnake();
                    const head_vars = [snake_head.x, snake_head.y, index];
                    const head_move = head_vars.join(WS_MESSAGE_DELIM);
                    last_moves.push(head_move);
                    if (typeof player_snake.last_empty.x !== "undefined") {
                        const last_empty = player_snake.last_empty;
                        const tail_vars = [last_empty.x, last_empty.y, "0"];
                        const tail_move = tail_vars.join(WS_MESSAGE_DELIM);
                        last_moves.push(tail_move);
                    }
                }
            }
        });
        return last_moves;
    }
    firstMoveTime() {
        this.move_deadline = new Date().getTime() + this.milli_turn_window;
    }
    advanceBoardTurn() {
        this.board_turn = this.board_turn + 1;
        this.move_deadline = new Date().getTime() + this.milli_turn_window;
    }
    isFinishedTurn() {
        let is_finished = true;
        const next_board_turn = this.board_turn + 1;
        this.player_snakes.forEach((player_snake) => {
            if (typeof player_snake === "object") {
                if (!player_snake.hasCrashed()) {
                    if (player_snake.turn_number !== next_board_turn) {
                        is_finished = false;
                    }
                }
            }
        });
        const now_milliseconds = new Date().getTime();
        if (now_milliseconds > this.move_deadline) {
            return is_finished;
        }
        else {
            return false;
        }
    }
    snakeMove(player_number, new_direction) {
        const moving_snake = this.player_snakes.get(player_number);
        if (!moving_snake.hasCrashed()) {
            const new_x_y = moving_snake.futureXy(new_direction);
            if (this.snakeCrash(new_x_y)) {
                moving_snake.crashIntoWall();
                return false;
            }
            else {
                const the_next = this.overUnderFlow(new_x_y);
                this.xy_board_colors = this.xy_board_colors.set(the_next, player_number);
                const new_empty = moving_snake.moveSnake(the_next);
                if (new_empty.x !== NON_EXISTANT_XY) {
                    this.xy_board_colors = this.xy_board_colors.set(new_empty, 0);
                }
                return true;
            }
        }
        return false;
    }
    createSnakes() {
        const self = this;
        this.player_current_positions.forEach((player, index) => {
            const player_number = index + 1;
            const xy = (0, project_factories_1.XyFactory)({ x: player.x, y: player.y });
            const the_player_direction = player.start_direction;
            const the_test_moves = player.test_moves;
            const snake_options = {
                max_size: self.max_size,
                player_number,
                snake_direction: the_player_direction,
                test_moves: the_test_moves,
                xy
            };
            const player_snake = new PlayerSnake_1.default(snake_options);
            self.player_snakes = self.player_snakes.set(player_number, player_snake);
            self.xy_board_colors = self.xy_board_colors.set(xy, player_number);
        });
    }
    alivePlayers() {
        const countStillPlaying = (alive_count, player_snake) => {
            if (typeof alive_count === "number") {
                if (typeof player_snake !== "undefined") {
                    if (player_snake.hasCrashed()) {
                        return alive_count;
                    }
                    else {
                        return alive_count + 1;
                    }
                }
                return alive_count;
            }
            else {
                return 0;
            }
        };
        if (typeof this.player_snakes !== "undefined") {
            const alive_players = this.player_snakes.reduce(countStillPlaying, 0);
            return alive_players;
        }
        return 0;
    }
    winnerIs() {
        let winner_player = 0;
        this.player_snakes.forEach((player_snake) => {
            if (typeof player_snake === "object") {
                if (!player_snake.hasCrashed()) {
                    winner_player = player_snake.player_number;
                }
            }
        });
        return winner_player;
    }
    consoleBoard() {
        let console_print = "";
        for (let row = 0; row < this.board_height; row++) {
            for (let column = 0; column < this.board_width; column++) {
                const xy = (0, project_factories_1.XyFactory)({ x: column, y: row });
                console_print += this.xy_board_colors.get(xy);
            }
            console_print += "\n";
        }
        return console_print;
    }
    jsonBoard() {
        const the_data = [];
        for (let row = 0; row < this.board_height; row++) {
            the_data[row] = [];
            for (let column = 0; column < this.board_width; column++) {
                const xy = (0, project_factories_1.XyFactory)({ x: column, y: row });
                the_data[row][column] = this.xy_board_colors.get(xy);
            }
        }
        return the_data;
    }
    createBoard() {
        this.zeroBoard(EMPTY_INDEX_COLOR);
        const self = this;
        this.wall_lines_current.forEach((wall) => {
            const [column, row, length, type] = wall;
            self.drawWall(column, row, length, type);
        });
    }
    snakeCrash(new_x_y) {
        const the_next = this.overUnderFlow(new_x_y);
        const snake_next = this.xy_board_colors.get(the_next);
        if (snake_next === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    overUnderFlow(new_x_y) {
        let x = new_x_y.x;
        let y = new_x_y.y;
        if (x < 0) {
            x = this.board_width - 1;
        }
        else if (x >= this.board_width) {
            x = 0;
        }
        else if (y < 0) {
            y = this.board_height - 1;
        }
        else if (y >= this.board_height) {
            y = 0;
        }
        const xy = (0, project_factories_1.XyFactory)({ x, y });
        return xy;
    }
    drawWall(column, row, length, type) {
        if (type === WALL_HORIZONTAL) {
            for (let h_step = 0; h_step < length; h_step++) {
                const xy = (0, project_factories_1.XyFactory)({ x: column + h_step, y: row });
                this.xy_board_colors = this.xy_board_colors.set(xy, WALL_INDEX_COLOR);
            }
        }
        else if (type === WALL_VERTICAL) {
            for (let v_step = 0; v_step < length; v_step++) {
                const xy = (0, project_factories_1.XyFactory)({ x: column, y: row + v_step });
                this.xy_board_colors = this.xy_board_colors.set(xy, WALL_INDEX_COLOR);
            }
        }
        else if (type === WALL_DIAGONAL) {
            for (let d_step = 0; d_step < length; d_step++) {
                const xy = (0, project_factories_1.XyFactory)({ x: column + d_step, y: row + d_step });
                this.xy_board_colors = this.xy_board_colors.set(xy, WALL_INDEX_COLOR);
            }
        }
    }
    zeroBoard(empty_cell) {
        for (let column = 0; column < this.board_width; column++) {
            for (let row = 0; row < this.board_height; row++) {
                const xy = (0, project_factories_1.XyFactory)({ x: column, y: row });
                this.xy_board_colors = this.xy_board_colors.set(xy, empty_cell);
            }
        }
    }
}
exports.default = SnakeGame;
