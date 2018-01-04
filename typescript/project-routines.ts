
import SNAKE_TEST_CONFIG from "./global_test_config"
import project_constants from "./project-constants"
import {EMoveTypes} from "./types/project-enums"
import {IWebSocket} from "./types/system-interfaces"

const {TINY_SNAKE_SIZE, MEDIUM_SNAKE_SIZE, LARGE_SNAKE_SIZE,
       SLOW_SNAKE_SPEED, AVERAGE_SNAKE_SPEED, FAST_SNAKE_SPEED} = project_constants
const {DOWN_MOVE, UP_MOVE, LEFT_MOVE, RIGHT_MOVE, CONTINUE_MOVE} = EMoveTypes

export let sendSocket = (user_websocket: IWebSocket, message_type: string, message_data: any) => {
    const socket_data = {
        data:  message_data
        , message_type
    }
    const json_data = JSON.stringify(socket_data)
    try {
        user_websocket.send(json_data)
    } catch (e) {
        console.error("sendSocket error", e.message, socket_data, user_websocket)
    }
}

export function dateInSeconds(): number {
    const date_seconds = Number(new Date())
    return Math.floor(date_seconds / 1000)
}

export function mouseListenerAdd(id_name: string, event_type: string,
                                 event_function: (event: Event) => void ): void {
    const event_element = (document.getElementById(id_name) as HTMLInputElement)
    event_element.addEventListener(event_type, event_function, false)
}

export function eventListenerAdd(id_name: string, event_type: string, event_function: () => void ): void {
    const event_element = (document.getElementById(id_name) as HTMLInputElement)
    event_element.addEventListener(event_type, event_function, false)
}

export function hiddenById(element_ids: string[]): void {
    for (const element_id of element_ids) {
        (document.getElementById(element_id) as HTMLInputElement).style.visibility = "hidden"
    }
}

export function visibleById(element_ids: string[]): void {
    for (const element_id of element_ids) {
       (document.getElementById(element_id) as HTMLInputElement).style.visibility = "visible"
    }
}

export function displayInlineById(element_ids: string[]): void {
    for (const element_id of element_ids) {
        (document.getElementById(element_id) as HTMLInputElement).style.display = "inline"
    }
}

export function displayBlockById(element_ids: string[]): void {
    for (const element_id of element_ids) {
        (document.getElementById(element_id) as HTMLInputElement).style.display = "block"
    }
}

export function displayNoneById(element_ids: string[]): void {
    for (const element_id of element_ids) {
        (document.getElementById(element_id) as HTMLInputElement).style.display = "none"
    }
}

export function focusById(element_id: string): void {
    (document.getElementById(element_id) as HTMLInputElement).focus()
}

export function getUrlParamByName(get_name: string): string {
    const get_match = RegExp("[?&]" + get_name + "=([^&]*)").exec(window.location.search)
    if (get_match) {
        const get_value = decodeURIComponent(get_match[1].replace(/\+/g, " "))
        if (get_value !== "") {
            return get_value
        }
    }
    return ""
}

export function never_needTwoToTango(name: string): void {
    console.error("IMPOSSIBLE TESTING ONLY, we need two people to have a human game", name)
}

export function never_nineMakesACrowd(name: string): void {
    console.error("IMPOSSIBLE TESTING ONLY, we somehow have a nine-player game", name)
}

export function colorTextSpan(rgb_color: string, text: string): string {
    const colored_text = " <span style='color: " + rgb_color + "'>" + text + "</span> "
    return colored_text
}

export function upDownLeftRight(key_code: number, left_udlr_keys: number[], right_udlr_keys: number[]): string {
    let direction = CONTINUE_MOVE
    if ( (key_code === left_udlr_keys[0]) || (key_code === right_udlr_keys[0])) {
        direction = UP_MOVE
    } else if ((key_code === left_udlr_keys[1]) || (key_code === right_udlr_keys[1])) {
        direction = DOWN_MOVE
    } else if ((key_code === left_udlr_keys[2]) || (key_code === right_udlr_keys[2])) {
        direction = LEFT_MOVE
    } else if ((key_code === left_udlr_keys[3]) || (key_code === right_udlr_keys[3])) {
        direction = RIGHT_MOVE
    }
    return direction
}

// No semi-colon typescript error is fixed with two steps
// https: //stackoverflow.com/questions/43032004/queryselector-in-typescript
export function inputValueSet(element_id: string, element_value: string): void {
    const input_element = document.getElementById(element_id) as HTMLInputElement
    input_element.value = element_value
}

// Stop Object is possibly "null" typescript error
export function propertyValueSet(element_id: string, attribute_name: string, attribute_value: any): void {
    const input_element: any = document.getElementById(element_id) as HTMLInputElement
    input_element[attribute_name] = attribute_value
}

// Stop Object is possibly "null" typescript error on setting styles
export function styleValueSet(element_id: string, style_name: string, style_value: string): void {
    const input_element: any = document.getElementById(element_id) as HTMLInputElement
    input_element.style[style_name] = style_value
}

export function getArgByIndex(arg_index: number) {
    if (process.argv[arg_index]) {
        const the_args = process.argv[arg_index].split("=")
        return the_args
    } else {
        return ["", ""]
    }
}

export function setUpTesting(): IConfigTestingVars {
    const [arg_type, arg_value ] = getArgByIndex(2)
    if (arg_type === "testing") {
        if (arg_value === "true") {
            return SNAKE_TEST_CONFIG
        }
    }
    return undefined
}

export function decodeSnakeSize(create_snake_size: string): number {
    let game_snake_size = LARGE_SNAKE_SIZE
    if (create_snake_size === "tiny") {
        game_snake_size = TINY_SNAKE_SIZE
    } else if (create_snake_size === "medium") {
        game_snake_size = MEDIUM_SNAKE_SIZE
    }
    return game_snake_size
}

export function decodeSnakeSpeed(create_snake_speed: string): number {
    let game_snake_speed = FAST_SNAKE_SPEED
    if (create_snake_speed === "slow") {
        game_snake_speed = SLOW_SNAKE_SPEED
    } else if (create_snake_speed === "average") {
        game_snake_speed = AVERAGE_SNAKE_SPEED
    }
    return game_snake_speed
}

export function decodeSnakeWalls(create_snake_walls: string): boolean {
    let game_snake_walls = false
    if (create_snake_walls === "random") {
        game_snake_walls = true
    }
    return game_snake_walls
}
