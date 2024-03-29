"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeInputValue = exports.sanitizeValue = exports.decodeSnakeWalls = exports.decodeSnakeSpeed = exports.decodeSnakeSize = exports.setUpTesting = exports.getArgByIndex = exports.styleValueSet = exports.selectedValueGet = exports.propertyValueSet = exports.inputValueSet = exports.upDownLeftRight = exports.colorTextSpan = exports.never_nineMakesACrowd = exports.never_needTwoToTango = exports.getUrlParamByName = exports.focusById = exports.noneById = exports.blockById = exports.eventListenerAdd = exports.mouseListenerAdd = exports.dateInSeconds = exports.sendSocket = void 0;
const global_test_config_1 = require("./global_test_config");
const project_constants_1 = require("./project-constants");
const project_enums_1 = require("./types/project-enums");
const { TINY_SNAKE_SIZE, MEDIUM_SNAKE_SIZE, LARGE_SNAKE_SIZE, SLOW_SNAKE_SPEED, AVERAGE_SNAKE_SPEED, FAST_SNAKE_SPEED } = project_constants_1.default;
const { DOWN_MOVE, UP_MOVE, LEFT_MOVE, RIGHT_MOVE, CONTINUE_MOVE } = project_enums_1.EMoveTypes;
let sendSocket = (user_websocket, message_type, message_data) => {
    const socket_data = {
        data: message_data,
        message_type
    };
    const json_data = JSON.stringify(socket_data);
    try {
        user_websocket.send(json_data);
    }
    catch (e) {
        console.error("sendSocket error", e.message, socket_data, user_websocket);
    }
};
exports.sendSocket = sendSocket;
function dateInSeconds() {
    const date_seconds = Number(new Date());
    return Math.floor(date_seconds / 1000);
}
exports.dateInSeconds = dateInSeconds;
function mouseListenerAdd(id_name, event_type, event_function) {
    const event_element = document.getElementById(id_name);
    event_element.addEventListener(event_type, event_function, false);
}
exports.mouseListenerAdd = mouseListenerAdd;
function eventListenerAdd(id_name, event_type, event_function) {
    const event_element = document.getElementById(id_name);
    event_element.addEventListener(event_type, event_function, false);
}
exports.eventListenerAdd = eventListenerAdd;
function blockById(element_ids) {
    for (const element_id of element_ids) {
        document.getElementById(element_id).style.display = "inline-block";
    }
}
exports.blockById = blockById;
function noneById(element_ids) {
    for (const element_id of element_ids) {
        document.getElementById(element_id).style.display = "none";
    }
}
exports.noneById = noneById;
function focusById(element_id) {
    document.getElementById(element_id).focus();
}
exports.focusById = focusById;
function getUrlParamByName(get_name) {
    const get_match = RegExp("[?&]" + get_name + "=([^&]*)").exec(window.location.search);
    if (get_match) {
        const get_value = decodeURIComponent(get_match[1].replace(/\+/g, " "));
        if (get_value !== "") {
            return get_value;
        }
    }
    return "";
}
exports.getUrlParamByName = getUrlParamByName;
function never_needTwoToTango(name) {
    console.error("IMPOSSIBLE TESTING ONLY, we need two people to have a human game", name);
}
exports.never_needTwoToTango = never_needTwoToTango;
function never_nineMakesACrowd(name) {
    console.error("IMPOSSIBLE TESTING ONLY, we somehow have a nine-player game", name);
}
exports.never_nineMakesACrowd = never_nineMakesACrowd;
function colorTextSpan(rgb_color, text) {
    const colored_text = " <span style='color: " + rgb_color + "'>" + text + "</span> ";
    return colored_text;
}
exports.colorTextSpan = colorTextSpan;
function upDownLeftRight(key_code, left_udlr_keys, right_udlr_keys) {
    let direction = CONTINUE_MOVE;
    if ((key_code === left_udlr_keys[0]) || (key_code === right_udlr_keys[0])) {
        direction = UP_MOVE;
    }
    else if ((key_code === left_udlr_keys[1]) || (key_code === right_udlr_keys[1])) {
        direction = DOWN_MOVE;
    }
    else if ((key_code === left_udlr_keys[2]) || (key_code === right_udlr_keys[2])) {
        direction = LEFT_MOVE;
    }
    else if ((key_code === left_udlr_keys[3]) || (key_code === right_udlr_keys[3])) {
        direction = RIGHT_MOVE;
    }
    return direction;
}
exports.upDownLeftRight = upDownLeftRight;
// No semi-colon typescript error is fixed with two steps
// https: //stackoverflow.com/questions/43032004/queryselector-in-typescript
function inputValueSet(element_id, element_value) {
    const input_element = document.getElementById(element_id);
    input_element.value = element_value;
}
exports.inputValueSet = inputValueSet;
// Stop Object is possibly "null" typescript error
function propertyValueSet(element_id, attribute_name, attribute_value) {
    const property_element = document.getElementById(element_id);
    property_element[attribute_name] = attribute_value;
}
exports.propertyValueSet = propertyValueSet;
function selectedValueGet(element_id) {
    const select_element = document.getElementById(element_id);
    if (select_element.selectedIndex === -1) {
        return "";
    }
    else {
        const selected_value = select_element.options[select_element.selectedIndex].value;
        return selected_value;
    }
}
exports.selectedValueGet = selectedValueGet;
// Stop Object is possibly "null" typescript error on setting styles
function styleValueSet(element_id, style_name, style_value) {
    const input_element = document.getElementById(element_id);
    input_element.style[style_name] = style_value;
}
exports.styleValueSet = styleValueSet;
function getArgByIndex(arg_index) {
    if (process.argv[arg_index]) {
        const the_args = process.argv[arg_index].split("=");
        return the_args;
    }
    else {
        return ["", ""];
    }
}
exports.getArgByIndex = getArgByIndex;
function setUpTesting() {
    const [arg_type, arg_value] = getArgByIndex(2);
    if (arg_type === "testing") {
        if (arg_value === "true") {
            return global_test_config_1.default;
        }
    }
    return undefined;
}
exports.setUpTesting = setUpTesting;
function decodeSnakeSize(create_snake_size) {
    let game_snake_size = LARGE_SNAKE_SIZE;
    if (create_snake_size === "tiny") {
        game_snake_size = TINY_SNAKE_SIZE;
    }
    else if (create_snake_size === "medium") {
        game_snake_size = MEDIUM_SNAKE_SIZE;
    }
    return game_snake_size;
}
exports.decodeSnakeSize = decodeSnakeSize;
function decodeSnakeSpeed(create_snake_speed) {
    let game_snake_speed = FAST_SNAKE_SPEED;
    if (create_snake_speed === "slow") {
        game_snake_speed = SLOW_SNAKE_SPEED;
    }
    else if (create_snake_speed === "average") {
        game_snake_speed = AVERAGE_SNAKE_SPEED;
    }
    return game_snake_speed;
}
exports.decodeSnakeSpeed = decodeSnakeSpeed;
function decodeSnakeWalls(create_snake_walls) {
    let game_snake_walls = false;
    if (create_snake_walls === "random") {
        game_snake_walls = true;
    }
    return game_snake_walls;
}
exports.decodeSnakeWalls = decodeSnakeWalls;
function sanitizeValue(unsanitized_val) {
    if (typeof unsanitized_val === "undefined") {
        return "";
    }
    else {
        const sanitize_val = unsanitized_val.replace(/[^a-z0-9 '_]/ig, "");
        const trimmed_val = sanitize_val.trim();
        return trimmed_val;
    }
}
exports.sanitizeValue = sanitizeValue;
function sanitizeInputValue(id_name) {
    const id_val = document.getElementById(id_name).value;
    const sanitize_val = sanitizeValue(id_val);
    return sanitize_val;
}
exports.sanitizeInputValue = sanitizeInputValue;
