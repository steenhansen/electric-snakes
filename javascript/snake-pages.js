"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv1 = require("uuid/v1");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
function combineJsHtml(req, res, uuid, hashed_js, file_name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const host_url = req.headers.host;
            const game_board = yield readFile("./html/game-board.html", "utf8");
            let file = yield readFile(file_name, "utf8");
            file = file.replace("~~COMMON_GAME_BOARD~~", game_board);
            const hashed_javascript = yield readFile("./javascript/webpack_js_chunks.json", "utf8");
            const hashed_json = JSON.parse(hashed_javascript);
            const common_bundle = hashed_json.common_game_entry.js;
            const common_chunkhash_url = "//" + host_url + "/" + common_bundle;
            file = file.replace("~~COMMON_GAME_ENTRY~~", common_chunkhash_url);
            const js_bundle = hashed_json[hashed_js].js;
            const chunkhash_url = "//" + host_url + "/" + js_bundle;
            file = file.replace("~~SPECIFIC_ENTRY_TYPE~~", chunkhash_url);
            file = file.replace("~~WS_RANDOM_KEY~~", uuid);
            if (typeof res.send === "function") {
                res.send(file);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
const snake_pages = {
    serveCreate: (req, res, hashed_js, file_name) => {
        const uuid = uuidv1();
        combineJsHtml(req, res, uuid, hashed_js, file_name);
    },
    serverJoin: (req, res, hashed_js, file_name) => {
        const uuid = uuidv1();
        combineJsHtml(req, res, uuid, hashed_js, file_name);
    },
    getPage: (req, res) => {
        const [plain_url] = req.originalUrl.split("?");
        if (plain_url === "/create-game") {
            snake_pages.serveCreate(req, res, "create_game_entry", "./html/create-game.html");
        }
        else if (plain_url === "/join-game") {
            snake_pages.serverJoin(req, res, "join_game_entry", "./html/join-game.html");
        }
        else {
            res.redirect("/create-game");
        }
    }
};
exports.default = snake_pages;
