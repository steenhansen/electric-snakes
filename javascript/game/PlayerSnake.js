"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const project_enums_1 = require("../types/project-enums");
const project_factories_1 = require("../types/project-factories");
const { DOWN_MOVE, UP_MOVE, LEFT_MOVE, RIGHT_MOVE, CONTINUE_MOVE } = project_enums_1.EMoveTypes;
class PlayerSnake {
    constructor(snake_options) {
        this.player_number = snake_options.player_number;
        this.max_size = snake_options.max_size;
        this.snake_direction = snake_options.snake_direction;
        this.has_crashed = false;
        const start_xy = snake_options.xy;
        this.snake_segments = (0, immutable_1.List)().push(start_xy);
        this.turn_number = 0;
        this.last_empty = (0, project_factories_1.XyNull)();
        if (typeof snake_options.test_moves === "undefined") {
            this.test_moves = [];
        }
        else {
            this.test_moves = snake_options.test_moves;
        }
    }
    crashIntoWall() {
        this.has_crashed = true;
    }
    crashedOnTurn(board_turn) {
        if ((board_turn - 1) === this.turn_number) {
            return this.has_crashed;
        }
        else {
            return false;
        }
    }
    hasCrashed() {
        return this.has_crashed;
    }
    futureXy(new_direction) {
        if (new_direction === CONTINUE_MOVE) {
            new_direction = this.snake_direction;
        }
        else if (this.oppositeDirection(new_direction)) {
            new_direction = this.snake_direction;
        }
        else {
            this.snake_direction = new_direction;
        }
        const old_head = this.snake_segments.last();
        let x = old_head.x;
        let y = old_head.y;
        if (new_direction === DOWN_MOVE) {
            y = y + 1;
        }
        else if (new_direction === UP_MOVE) {
            y = y - 1;
        }
        else if (new_direction === LEFT_MOVE) {
            x = x - 1;
        }
        else if (new_direction === RIGHT_MOVE) {
            x = x + 1;
        }
        const xy = (0, project_factories_1.XyFactory)({ x, y });
        return xy;
    }
    headSnake() {
        const current_head = this.snake_segments.last();
        return current_head;
    }
    moveSnake(new_x_y) {
        this.turn_number = this.turn_number + 1;
        this.snake_segments = this.snake_segments.push(new_x_y);
        let new_empty;
        if (this.snake_segments.size > this.max_size) {
            new_empty = this.snake_segments.first();
            this.last_empty = new_empty;
            this.snake_segments = this.snake_segments.shift();
        }
        else {
            new_empty = (0, project_factories_1.XyNull)();
        }
        return new_empty;
    }
    oppositeDirection(new_direction) {
        if (new_direction === DOWN_MOVE && this.snake_direction === UP_MOVE) {
            return true;
        }
        else if (new_direction === UP_MOVE && this.snake_direction === DOWN_MOVE) {
            return true;
        }
        else if (new_direction === LEFT_MOVE && this.snake_direction === RIGHT_MOVE) {
            return true;
        }
        else if (new_direction === RIGHT_MOVE && this.snake_direction === LEFT_MOVE) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = PlayerSnake;
