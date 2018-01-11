
import {ISnakePages} from "./types/server-interfaces"
import {IRequest, IResponse} from "./types/system-interfaces"

const uuidv1 = require("uuid/v1")
const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile)

async function combineJsHtml(req: IRequest, res: IResponse, uuid: string, hashed_js: string, file_name: string) {
    try {
        const host_url = req.headers.host
        const game_board = await readFile("./html/game-board.html", "utf8")
        let file = await readFile(file_name, "utf8")
        file = file.replace("~~COMMON_GAME_BOARD~~", game_board)
        const hashed_javascript = await readFile("./javascript/webpack_js_chunks.json", "utf8")
        const hashed_json = JSON.parse(hashed_javascript)

        const polyfill_bundle = hashed_json.babel_polyfill.js
        const polyfill_chunkhash_url = "//" + host_url + "/" + polyfill_bundle
        file = file.replace("~~POLYFILL_GAME_ENTRY~~", polyfill_chunkhash_url)

        const common_bundle = hashed_json.common_game_entry.js
        const common_chunkhash_url = "//" + host_url + "/" + common_bundle
        file = file.replace("~~COMMON_GAME_ENTRY~~", common_chunkhash_url)
        const js_bundle = hashed_json[hashed_js].js
        const chunkhash_url = "//" + host_url + "/" + js_bundle
        file = file.replace("~~SPECIFIC_ENTRY_TYPE~~", chunkhash_url)
        file = file.replace("~~WS_RANDOM_KEY~~", uuid)
        if (typeof res.send === "function") {
            res.send(file)
        }
    } catch (err) {
        console.error(err)
    }
}

const snake_pages: ISnakePages = {

    serveCreate: (req: IRequest, res: IResponse, hashed_js: string, file_name: string): void => {
        const uuid: string = uuidv1()
        combineJsHtml(req, res, uuid, hashed_js, file_name)
    },

    serverJoin: (req: IRequest, res: IResponse, hashed_js: string, file_name: string): void => {
        const uuid: string = uuidv1()
        combineJsHtml(req, res, uuid, hashed_js, file_name)
    },

    getPage: (req: IRequest, res: IResponse): void => {
        const [plain_url] = req.originalUrl.split("?")
        if (plain_url === "/create-game") {
            snake_pages.serveCreate(req, res, "create_game_entry", "./html/create-game.html")
        } else if (plain_url === "/join-game") {
            snake_pages.serverJoin(req, res, "join_game_entry", "./html/join-game.html")
        } else {
            res.redirect("/create-game")
        }
    }
}
export default snake_pages
