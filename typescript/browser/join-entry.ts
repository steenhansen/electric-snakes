
import project_constants from "../project-constants"
import { blockById, eventListenerAdd, getUrlParamByName, inputValueSet, noneById,
    propertyValueSet, sanitizeInputValue, sanitizeValue, selectedValueGet } from "../project-routines"
import {IGameBoard, IGameJoin} from "../types/browser-interfaces"
import {EActions, EJoinStates} from "../types/project-enums"
import game_object from "./game-object"

const {WAIT_JOIN_NAME_GAME_1, WAIT_JOIN_GAME_2, WAIT_JOIN_START_3, WAIT_JOIN_PLAYING_4} = EJoinStates
const {TO_SERVER_joinGame, TO_SERVER_gameList} = EActions
const {ONE_SECOND, WS_MESSAGE_DELIM} = project_constants

const game_board: IGameBoard = game_object.the_game_board

const join_game: IGameJoin = {

    refresh_func_id: 0,
    selected_game: "",
    have_joined: false,

    missedStart: (missed_game_name: string): void  =>  {
        join_game.visibleHtmlJoin(WAIT_JOIN_NAME_GAME_1)
    },

    areNamesEmpty: (): boolean  => {
        const game_name = sanitizeInputValue("game-name")
        const join_name = sanitizeInputValue("join-name")
        if (game_name.length === 0 || join_name.length === 0) {
            return true
        } else {
            join_game.selected_game = game_name
            return false
        }
    },

    notEmptyNames: ()  => {
        if (join_game.areNamesEmpty()) {
            join_game.visibleHtmlJoin(WAIT_JOIN_NAME_GAME_1)
        } else {
            join_game.visibleHtmlJoin(WAIT_JOIN_GAME_2)
        }
    },  

    visibleHtmlJoin: (new_join_state: EJoinStates): void  => {
        switch (new_join_state) {
            case(WAIT_JOIN_NAME_GAME_1):
                join_game.have_joined = false
                noneById(["join-game", "waiting-for-start", "join-color"])
                blockById(["name-of-join", "choose-game"])
                break
            case (WAIT_JOIN_GAME_2):
                blockById(["join-game"])
                break
            case (WAIT_JOIN_START_3):
                join_game.have_joined = true
                noneById(["name-of-join", "choose-game", "join-game"])
                blockById(["waiting-for-start"])
                break
            case (WAIT_JOIN_PLAYING_4):
                noneById(["waiting-for-start", "join-game"])
                blockById(["join-color"])
                break
            default:
                break
        }
    },

    fixStartJoinHtml: ()  => {
        join_game.visibleHtmlJoin(WAIT_JOIN_PLAYING_4)
    },

    fixEndJoinHtml: ()  => {
        join_game.visibleHtmlJoin(WAIT_JOIN_NAME_GAME_1)
    },

    showJoinGames: (the_data: string[]): void =>  {
        if (!join_game.have_joined){
            let select_html = ""
            let is_selected
            for (const game_user_names of the_data) {
                const [game_name, user_name] = game_user_names.split(WS_MESSAGE_DELIM)
                if (game_name === join_game.selected_game) {
                    is_selected = " selected "
                } else {
                    is_selected = ""
                }
                const option = `<option value="${game_name}" ${is_selected}>${game_name} - ${user_name}</option>`
                select_html += option
            }
            propertyValueSet("game-name", "innerHTML", select_html)
            const selected_game = selectedValueGet("game-name")
            if (selected_game !== "") {
                join_game.visibleHtmlJoin(WAIT_JOIN_GAME_2)
            }
        }
    },

    // localhost: 3000/join-game?game_name=TEST_GAME&join_name=TEST_PLAYER_2_
    autoFillGame: (): void => {
        if (typeof getUrlParamByName === "function") {
            const game_name: string = sanitizeValue(getUrlParamByName("game_name"))
            const join_name: string = sanitizeValue(getUrlParamByName("join_name"))
            if (game_name && join_name) {
                if (typeof join_game.showJoinGames === "function") {
                    join_game.showJoinGames(new Array(game_name))
                }
                inputValueSet("game-name", game_name)
                inputValueSet("join-name", join_name)
                join_game.sendJoinGame()
            }
        }
    },

    sendJoinGame: () => {
        try {
            const join_name = sanitizeInputValue("join-name")
            const game_name = sanitizeInputValue("game-name")
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    game_name,
                    message_type: TO_SERVER_joinGame,
                    user_name: join_name,
                    uuid_key: game_object.ws_random_key
                }
                game_board.sendMessage(message_object)
                join_game.visibleHtmlJoin(WAIT_JOIN_START_3)
            }
        } catch (e) {
            console.error("err", e)
        }
    },

    sendRefreshedGames: () => {
        try {
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    message_type: TO_SERVER_gameList,
                    uuid_key: game_object.ws_random_key
                }
                game_board.sendMessage(message_object)
            }
        } catch (e) {
            console.error("err", e)
        }
    }

}

join_game.visibleHtmlJoin(WAIT_JOIN_NAME_GAME_1)
join_game.refresh_func_id = window.setInterval(join_game.sendRefreshedGames, ONE_SECOND)
eventListenerAdd("join-name", "input", join_game.notEmptyNames)
eventListenerAdd("game-name", "change", join_game.notEmptyNames)
eventListenerAdd("game-name", "click", join_game.notEmptyNames)
eventListenerAdd("join-game", "click", join_game.sendJoinGame)

game_object.the_websocket.onopen = () => {
    join_game.autoFillGame()
}
export {join_game}
