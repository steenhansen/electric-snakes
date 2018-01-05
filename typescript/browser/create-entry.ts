
import {
    displayBlockById, displayInlineById, displayNoneById, eventListenerAdd, focusById, getUrlParamByName,
    hiddenById, inputValueSet, mouseListenerAdd, propertyValueSet, sanitizeInputValue, sanitizeValue, visibleById
} from "../project-routines"
import {IGameBoard, IGameCreate} from "../types/browser-interfaces"
import {EActions, ECreateStates} from "../types/project-enums"
import game_object from "./game-object"

const {
    WAIT_COMPUTER_OPPONENTS_A
    , WAIT_COMPUTER_START_B
    , WAIT_COMPUTER_START_C
    , WAIT_FOR_CHOICE
    , WAIT_HUMAN_NAMING_1
    , WAIT_HUMAN_CREATION_2
    , WAIT_HUMAN_START_3
    , WAIT_HUMAN_END_4
} = ECreateStates
const {TO_SERVER_createGame, TO_SERVER_startPeople, TO_SERVER_startMachine} = EActions

const game_board: IGameBoard = game_object.the_game_board

const create_game: IGameCreate = {
    opponentsValid:  (): boolean  => {
        const computer_opponents = sanitizeInputValue("num-opponents")
        if (computer_opponents.length > 0) {
            return true
        } else {
            return false
        }
    },

    numOpponents: (): void  => {
        if (create_game.opponentsValid()) {
            create_game.visibleHtmlJoin(WAIT_COMPUTER_START_B)
        } else {
            create_game.visibleHtmlJoin(WAIT_COMPUTER_OPPONENTS_A)
        }
    },

    focusOnAName: (): void => {
        const active_element = document.activeElement
        if (active_element !== null) {
            const active_name = active_element.id
            if (active_name !== "game-name" && active_name !== "create-name") {
                focusById("game-name")
            }
        }
    },

    visibleHtmlJoin: (new_create_state: ECreateStates): void  => {
        displayNoneById([ "computer-opponents", "name-of-game", "name-of-creator",  "create-game",
                          "start-human", "create-color"])
        hiddenById(["vs-computer", "vs-humans"])
        switch (new_create_state) {
            case (WAIT_COMPUTER_OPPONENTS_A):
                displayInlineById(["computer-opponents"])
                break
            case (WAIT_COMPUTER_START_B):
                displayInlineById(["computer-opponents"])
                break
            case (WAIT_COMPUTER_START_C):
                break
            case(WAIT_FOR_CHOICE):
                visibleById(["vs-computer", "vs-humans"])
                break
            case (WAIT_HUMAN_NAMING_1):
                displayBlockById(["name-of-game", "name-of-creator"])
                create_game.focusOnAName()
                break
            case (WAIT_HUMAN_CREATION_2):
                displayBlockById(["name-of-game", "name-of-creator", "create-game"])
                break
            case (WAIT_HUMAN_START_3):
                displayInlineById(["start-human"])
                break
            case (WAIT_HUMAN_END_4):
                displayInlineById(["create-color"])
                break
            default:
                break
        }
    },

    fixStartCreateHtml:  (): void  => {
        create_game.visibleHtmlJoin(WAIT_HUMAN_END_4)
    },

    fixEndCreateHtml:  (): void  => {
        create_game.visibleHtmlJoin(WAIT_FOR_CHOICE)
    },

    enableStartButton:  (): void =>  {
        create_game.visibleHtmlJoin(WAIT_HUMAN_START_3)
        const game_name = sanitizeInputValue("game-name")
        propertyValueSet("start-human", "innerHTML", "Start " + game_name)
        propertyValueSet("start-human", "disabled", false)
    },

    showHumanGame:  (): void  => {
        create_game.notEmptyNames()
    },

    // localhost: 3000/create-game?game_name=TEST_GAME&create_name=TEST_PLAYER_1_
    autoFillCreate:  (): void  => {
        if (typeof getUrlParamByName === "function") {
            const game_name: string = sanitizeValue(getUrlParamByName("game_name"))
            const create_name: string = sanitizeValue(getUrlParamByName("create_name"))
            if (game_name && create_name ) {
                if (typeof create_game.showHumanGame === "function") {
                    create_game.showHumanGame()
                }
                inputValueSet("game-name", game_name)
                inputValueSet("create-name", create_name)
                create_game.sendCreateGame()
            }
        }
    },

    areNamesEmpty:  (): boolean =>  {
        const create_name = sanitizeInputValue("create-name")
        const game_name = sanitizeInputValue("game-name")
        if (create_name.length === 0 || game_name.length === 0) {
            return true
        } else {
            return false
        }
    },

    notEmptyNames:  (): void => {
        if (create_game.areNamesEmpty()) {
            create_game.visibleHtmlJoin(WAIT_HUMAN_NAMING_1)
        } else {
            create_game.visibleHtmlJoin(WAIT_HUMAN_CREATION_2)
        }
    },

    showMachineGame:  (): void =>  {
        create_game.visibleHtmlJoin(WAIT_COMPUTER_OPPONENTS_A)
    },

    sendCreateGame:  (): void =>  {
        create_game.visibleHtmlJoin(WAIT_HUMAN_START_3)
        try {
            const game_name = sanitizeInputValue("game-name")
            const create_name = sanitizeInputValue("create-name")
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    message_type: TO_SERVER_createGame,
                    uuid_key: game_object.ws_random_key,
                    game_name,
                    user_name: create_name
                }
                game_board.sendMessage(message_object)
            }
            propertyValueSet("start-human", "innerHTML", "Waiting for other player(s) to join " + game_name)
            propertyValueSet("start-human", "disabled", true)
        } catch (e) {
            console.error("err", e)
        }
    },

    sendStartGame:  (): void  => {
        try {
            const game_name = sanitizeInputValue("game-name")
            const create_name = sanitizeInputValue("create-name")
            const snake_size =  (document.querySelector("input[name=snake-size]:checked") as HTMLInputElement).value
            const snake_speed = (document.querySelector("input[name=snake-speed]:checked") as HTMLInputElement).value
            const snake_walls = (document.querySelector("input[name=snake-walls]:checked") as HTMLInputElement).value
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    message_type: TO_SERVER_startPeople,
                    uuid_key: game_object.ws_random_key,
                    game_name,
                    create_name,
                    snake_size,
                    snake_walls,
                    milli_turns: snake_speed
                }
                game_board.sendMessage(message_object)
            }
        } catch (e) {
            console.error("err", e)
        }
    },

    sendVersusComputer: (event: Event): void => {
        const target_element: HTMLElement = event.target as HTMLElement
        const target_id_arr = target_element.id.split("-")
        const num_computers = target_id_arr[1]
        create_game.visibleHtmlJoin(WAIT_COMPUTER_START_C)
        try {
            const game_name: string = game_object.ws_random_key + "_" + game_object.machine_game_count
            const create_name: string = game_object.ws_random_key + "-" + game_object.machine_game_count
            const snake_size =  (document.querySelector("input[name=snake-size]:checked") as HTMLInputElement).value
            const snake_speed = (document.querySelector("input[name=snake-speed]:checked") as HTMLInputElement).value
            const snake_walls = (document.querySelector("input[name=snake-walls]:checked") as HTMLInputElement).value
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    message_type: TO_SERVER_startMachine,
                    uuid_key: game_object.ws_random_key,
                    game_name,
                    user_name: create_name,
                    num_computer: num_computers,
                    snake_size,
                    snake_walls,
                    milli_turns: snake_speed
                }
                game_board.sendMessage(message_object)
            }
        } catch (e) {
            console.error("err", e)
        }
    }
}

create_game.visibleHtmlJoin(WAIT_FOR_CHOICE)
eventListenerAdd("create-game", "click", create_game.sendCreateGame)
eventListenerAdd("start-human", "click", create_game.sendStartGame)
eventListenerAdd("vs-computer", "click", create_game.showMachineGame)
eventListenerAdd("vs-humans", "click", create_game.showHumanGame)

mouseListenerAdd("computer-1", "click", create_game.sendVersusComputer)
mouseListenerAdd("computer-2", "click", create_game.sendVersusComputer)
mouseListenerAdd("computer-3", "click", create_game.sendVersusComputer)
mouseListenerAdd("computer-4", "click", create_game.sendVersusComputer)
mouseListenerAdd("computer-5", "click", create_game.sendVersusComputer)
mouseListenerAdd("computer-6", "click", create_game.sendVersusComputer)
mouseListenerAdd("computer-7", "click", create_game.sendVersusComputer)

eventListenerAdd("computer-opponents", "input", create_game.numOpponents)
eventListenerAdd("create-name", "input", create_game.notEmptyNames)
eventListenerAdd("game-name", "input", create_game.notEmptyNames)

game_object.the_websocket.onopen = (): void => {
    create_game.autoFillCreate()
}

export {create_game}
