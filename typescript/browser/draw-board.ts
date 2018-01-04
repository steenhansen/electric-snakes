
import project_constants from "../project-constants"
import {IColorArray, IDrawBoard, IGameInfo} from "../types/browser-interfaces"
import {IWindow} from "../types/system-interfaces"

declare let window: IWindow

const {WS_MESSAGE_DELIM, CTX_WALL_COLOR} = project_constants
const board_canvas = document.getElementById("board-container") as HTMLCanvasElement
const ctx = board_canvas.getContext("2d") as CanvasRenderingContext2D

const DrawBoard: IDrawBoard = {

    tile_size: 123,
    live_colors: [] as IColorArray,

    initializeDraw:  (tile_size: number, board_colors: IColorArray): void => {
        DrawBoard.tile_size = tile_size
        DrawBoard.live_colors = board_colors
    },

    drawCanvas: (the_data: IGameInfo): void => {
        board_canvas.width = the_data.board_width * DrawBoard.tile_size
        board_canvas.height = the_data.board_height * DrawBoard.tile_size
        if (typeof DrawBoard.drawGrid === "function") {
            DrawBoard.drawGrid(the_data.board_json)
        }
    },

    drawSquares: (start_x: number, start_y: number, end_x: number, end_y: number): void => {
        const middle_square: number = DrawBoard.tile_size / 2
        let spacer: number = 1
        do {
            ctx.beginPath()
            ctx.moveTo(start_x + spacer, start_y + spacer)
            ctx.lineTo(end_x - spacer, start_y + spacer)
            ctx.lineTo(end_x - spacer, end_y - spacer)
            ctx.lineTo(start_x + spacer, end_y - spacer)
            ctx.lineTo(start_x + spacer, start_y + spacer)
            ctx.stroke()
            spacer += 2
        } while (spacer < middle_square)
    },

    drawCrashes: (crash_list: string[]): void => {
        DrawBoard.drawMoves(crash_list)
        ctx.strokeStyle = CTX_WALL_COLOR
        for (let index = crash_list.length - 1; index >= 0; index--) {
            const player_move: string = crash_list[index]
            const move_arr = player_move.split(WS_MESSAGE_DELIM)
            const x: number = parseInt(move_arr[0], 10)
            const y: number = parseInt(move_arr[1], 10)
            const start_x = x * DrawBoard.tile_size + 1
            const start_y = y * DrawBoard.tile_size + 1
            const end_x = ( (x + 1) * DrawBoard.tile_size) - 1
            const end_y = ( (y + 1) * DrawBoard.tile_size) - 1
            DrawBoard.drawSquares(start_x, start_y, end_x, end_y)
        }
    },

    drawGrid: (json_obj: number[][]): void => {
        for (let row = json_obj.length - 1; row >= 0; row--) {
            for (let column = json_obj[row].length - 1; column >= 0; column--) {
                const color_index: number = json_obj[row][column]
                DrawBoard.drawTile(column, row, color_index)
            }
        }
    },

    drawTile: (column: number, row: number, color_index: number): void => {
        ctx.fillStyle = DrawBoard.live_colors[color_index]
        const start_x: number = column * DrawBoard.tile_size
        const start_y: number = row * DrawBoard.tile_size
        ctx.fillRect(start_x, start_y, DrawBoard.tile_size, DrawBoard.tile_size)
    },

    drawMoves: (test_moves: string []): void => {
        for (let index = test_moves.length - 1; index >= 0; index--) {
            const player_move: string = test_moves[index]
            const move_arr = player_move.split(WS_MESSAGE_DELIM)
            const x: number = parseInt(move_arr[0], 10)
            const y: number = parseInt(move_arr[1], 10)
            const color_index = parseInt(move_arr[2], 10)
            DrawBoard.drawTile(x, y, color_index)
        }
    }
}

export {DrawBoard}
