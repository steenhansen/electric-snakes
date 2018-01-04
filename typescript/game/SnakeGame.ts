
import {Map} from "immutable"
import project_constants from "../project-constants"
import {IBoardOptionsMap, IPlayersSnakeMap, IXyPointRecord, IXYToColorMap} from "../types/immutable-interfaces"
import {EMoveTypes, EWallTypes} from "../types/project-enums"
import {XyFactory} from "../types/project-factories"
import {ISnakeOptions, IStartPosition, IWallLine} from "../types/server-interfaces"
import PlayerSnake from "./PlayerSnake"

const {WALL_HORIZONTAL, WALL_VERTICAL, WALL_DIAGONAL} = EWallTypes
const {EMPTY_INDEX_COLOR, NON_EXISTANT_XY, WALL_INDEX_COLOR, WS_MESSAGE_DELIM} = project_constants

class SnakeGame {
    public board_turn: number
    public player_snakes: IPlayersSnakeMap

    private milli_turn_window: number
    private board_width: number
    private board_height: number
    private max_size: number
    private wall_lines_current: IWallLine[]
    private player_current_positions: IStartPosition[]
    private xy_board_colors: IXYToColorMap
    private move_deadline: number

    public constructor(board_options: IBoardOptionsMap) {
        this.milli_turn_window = board_options.get("milli_between_turns")
        this.board_width = board_options.get("board_width")
        this.board_height = board_options.get("board_height")
        this.max_size = board_options.get("max_size")
        this.wall_lines_current = board_options.get("wall_lines_current")
        this.player_current_positions = board_options.get("player_positions_current")
        this.player_snakes = Map() as IPlayersSnakeMap
        this.xy_board_colors = Map() as IXYToColorMap
        this.createBoard()
        this.createSnakes()
        this.board_turn = 0
    }

    public boardWidth(): number {
        return this.board_width
    }

    public boardHeight(): number {
        return this.board_height
    }

    public justCrashedSnakes(): string[] {
        const crashed_snakes: string[] = []
        const the_board_turn: number = this.board_turn
        this.player_snakes.forEach( (player_snake, index): void => {
            if (typeof player_snake === "object") {
                if (player_snake.crashedOnTurn(the_board_turn)) {
                    const snake_head = player_snake.headSnake()
                    const head_vars = [snake_head.x, snake_head.y, index]
                    const head_move = head_vars.join(WS_MESSAGE_DELIM)
                    crashed_snakes.push(head_move)
                }
            }
        })
        return crashed_snakes
    }

    public lastBoardMoves(): string[] {
        const last_moves: string[] = []
        this.player_snakes.forEach( (player_snake, index): void => {
            if (typeof player_snake === "object") {
                if (!player_snake.hasCrashed()) {
                    const snake_head = player_snake.headSnake()
                    const head_vars = [snake_head.x, snake_head.y, index]
                    const head_move = head_vars.join(WS_MESSAGE_DELIM)
                    last_moves.push(head_move)
                    if (typeof player_snake.last_empty.x !== "undefined") {
                        const last_empty = player_snake.last_empty
                        const tail_vars = [last_empty.x, last_empty.y, "0"]
                        const tail_move = tail_vars.join(WS_MESSAGE_DELIM)
                        last_moves.push(tail_move)
                    }
                }
            }
        })
        return last_moves
    }

    public firstMoveTime(): void {
        this.move_deadline = new Date().getTime() + this.milli_turn_window
    }

    public advanceBoardTurn(): void {
        this.board_turn = this.board_turn + 1
        this.move_deadline = new Date().getTime() + this.milli_turn_window
    }

    public isFinishedTurn(): boolean {
        let is_finished = true
        const next_board_turn = this.board_turn + 1
        this.player_snakes.forEach( (player_snake): void => {
            if (typeof player_snake === "object") {
                if (!player_snake.hasCrashed()) {
                    if (player_snake.turn_number !== next_board_turn) {
                        is_finished = false
                    }
                }
            }
        })
        const now_milliseconds = new Date().getTime()
        if (now_milliseconds > this.move_deadline) {
            return is_finished
        } else {
            return false
        }
    }

    public snakeMove(player_number: number, new_direction: EMoveTypes): boolean {
        const moving_snake = this.player_snakes.get(player_number)
        if (!moving_snake.hasCrashed()) {
            const new_x_y = moving_snake.futureXy(new_direction)
            if (this.snakeCrash(new_x_y)) {
                moving_snake.crashIntoWall()
                return false
            } else {
                const the_next = this.overUnderFlow(new_x_y)
                this.xy_board_colors = this.xy_board_colors.set(the_next, player_number)
                const new_empty = moving_snake.moveSnake(the_next)
                if (new_empty.x !== NON_EXISTANT_XY) {
                    this.xy_board_colors = this.xy_board_colors.set(new_empty, 0)
                }
                return true
            }
        }
        return false
    }

    public createSnakes(): void {
        const self = this
        this.player_current_positions.forEach( (player, index: number): void => {
            const player_number: number = index + 1
            const xy: IXyPointRecord = XyFactory({x: player.x, y: player.y})

            const the_player_direction: EMoveTypes = player.start_direction
            const the_test_moves: EMoveTypes[] = player.test_moves
            const snake_options: ISnakeOptions = {
                 max_size: self.max_size
                , player_number
                , snake_direction: the_player_direction
                , test_moves: the_test_moves
                , xy
            }
            const player_snake: PlayerSnake =  new PlayerSnake(snake_options)
            self.player_snakes = self.player_snakes.set(player_number, player_snake)
            self.xy_board_colors = self.xy_board_colors.set(xy, player_number)
        })
    }

    public alivePlayers(): number {
        const countStillPlaying = (alive_count: (number|undefined),
                                   player_snake: (PlayerSnake|undefined)): number => {
            if (typeof alive_count === "number") {
                if (typeof player_snake !== "undefined") {
                    if (player_snake.hasCrashed()) {
                        return alive_count
                    } else {
                        return alive_count + 1
                    }
                }
                return alive_count
            } else {
                return 0
            }
        }
        if (typeof this.player_snakes !== "undefined") {
            const alive_players: number  = this.player_snakes.reduce(countStillPlaying, 0)
            return alive_players
        }
        return 0
    }

    public winnerIs(): number {
        let winner_player = 0
        this.player_snakes.forEach( (player_snake): void => {
            if (typeof player_snake === "object") {
                if (!player_snake.hasCrashed()) {
                    winner_player = player_snake.player_number
                }
            }
        })
        return winner_player
    }

    public consoleBoard(): string {
        let console_print = ""
        for (let row = 0; row < this.board_height; row++) {
            for (let column = 0; column < this.board_width; column++) {
                const xy = XyFactory({x: column, y: row})
                console_print += this.xy_board_colors.get(xy)
            }
            console_print += "\n"
        }
        return console_print
    }

    public jsonBoard(): number[][] {
        const the_data: number[][] = []
        for (let row = 0; row < this.board_height; row++) {
            the_data[row] = []
            for (let column = 0; column < this.board_width; column++) {
                const xy = XyFactory({x: column, y: row})
                the_data[row][column] = this.xy_board_colors.get(xy)
            }
        }
        return the_data
    }

    private createBoard(): void {
        this.zeroBoard(EMPTY_INDEX_COLOR)
        const self = this
        this.wall_lines_current.forEach( (wall): void => {
            const [column, row, length, type] = wall
            self.drawWall(column, row, length, type)
        })
    }

    private snakeCrash(new_x_y: IXyPointRecord): boolean {
        const the_next = this.overUnderFlow(new_x_y)
        const snake_next = this.xy_board_colors.get(the_next)
        if (snake_next === 0) {
            return false
        } else {
            return true
        }
    }

   private overUnderFlow(new_x_y: IXyPointRecord): IXyPointRecord {
        let x = new_x_y.x
        let y = new_x_y.y
        if (x < 0) {
            x = this.board_width - 1
        } else if (x >= this.board_width) {
            x = 0
        } else if (y < 0) {
            y = this.board_height - 1
        } else if (y >= this.board_height) {
            y = 0
        }
        const xy = XyFactory({x, y})
        return xy
    }

    private drawWall(column: number, row: number, length: number, type: string): void {
        if (type === WALL_HORIZONTAL) {
            for (let h_step = 0; h_step < length; h_step++) {
                const xy = XyFactory({x: column + h_step, y: row})
                this.xy_board_colors = this.xy_board_colors.set(xy, WALL_INDEX_COLOR)
            }
        } else if (type === WALL_VERTICAL) {
            for (let v_step = 0; v_step < length; v_step++) {
                const xy = XyFactory({x: column, y: row + v_step})
                this.xy_board_colors = this.xy_board_colors.set(xy, WALL_INDEX_COLOR)
            }
        } else if (type === WALL_DIAGONAL) {
            for (let d_step = 0; d_step < length; d_step++) {
                const xy = XyFactory({x: column + d_step, y: row + d_step})
                this.xy_board_colors = this.xy_board_colors.set(xy, WALL_INDEX_COLOR)
            }
        }
    }

   private zeroBoard(empty_cell: number) {
        for (let column = 0; column < this.board_width; column++) {
            for (let row = 0; row < this.board_height; row++) {
                const xy = XyFactory({x: column, y: row})
                this.xy_board_colors = this.xy_board_colors.set(xy, empty_cell)
            }
        }
    }

}

export default SnakeGame
