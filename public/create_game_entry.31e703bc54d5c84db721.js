var GLOBAL_WEBPACK=GLOBAL_WEBPACK||{};GLOBAL_WEBPACK.create_game_entry=webpackJsonpGLOBAL_WEBPACK__name_([1],[function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={AVERAGE_SNAKE_SPEED:40,CTX_WALL_COLOR:"black",DEFAULT_PORT:3e3,EMPTY_INDEX_COLOR:0,FAST_SNAKE_SPEED:20,HUMAN_PLAYER_NUMBER:1,INIT_REDUX_ACTION:"@@redux/INIT",LARGE_SNAKE_SIZE:30,LEFT_HAND_UDLR_KEYS:[87,83,65,68],MAX_PLAYERS:8,MEDIUM_SNAKE_SIZE:20,MOVE_SEND_INTERVAL:20,NON_EXISTANT_XY:-1,ONE_SECOND:1001,PLAYER_0_SENTINEL:"_no_player_0_",RIGHT_HAND_UDLR_KEYS:[38,40,37,39],SECONDS_COUNT_DOWN:3,SLOW_SNAKE_SPEED:60,TEST_PLAYER_POSTFIX:"_",TILE_PIXEL_SIZE:10,TIME_OUT_SECONDS:3600,TINY_SNAKE_SIZE:5,WALL_INDEX_COLOR:9,WS_MESSAGE_DELIM:","}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});!function(e){e.WALL_HORIZONTAL="wall_horizontal",e.WALL_VERTICAL="wall_vertical",e.WALL_DIAGONAL="wall_diagonal"}(t.EWallTypes||(t.EWallTypes={}));!function(e){e[e.GAME_JOINING_1=0]="GAME_JOINING_1",e[e.GAME_PLAYING_2=1]="GAME_PLAYING_2"}(t.EGameStates||(t.EGameStates={}));!function(e){e[e.PLAYER_PERSON=0]="PLAYER_PERSON",e[e.PLAYER_MACHINE=1]="PLAYER_MACHINE"}(t.EPlayerStates||(t.EPlayerStates={}));!function(e){e[e.WAIT_JOIN_NAME_GAME_1=0]="WAIT_JOIN_NAME_GAME_1",e[e.WAIT_JOIN_GAME_2=1]="WAIT_JOIN_GAME_2",e[e.WAIT_JOIN_START_3=2]="WAIT_JOIN_START_3",e[e.WAIT_JOIN_PLAYING_4=3]="WAIT_JOIN_PLAYING_4"}(t.EJoinStates||(t.EJoinStates={}));!function(e){e[e.WAIT_COMPUTER_OPPONENTS_A=0]="WAIT_COMPUTER_OPPONENTS_A",e[e.WAIT_COMPUTER_START_B=1]="WAIT_COMPUTER_START_B",e[e.WAIT_COMPUTER_START_C=2]="WAIT_COMPUTER_START_C",e[e.WAIT_FOR_CHOICE=3]="WAIT_FOR_CHOICE",e[e.WAIT_HUMAN_NAMING_1=4]="WAIT_HUMAN_NAMING_1",e[e.WAIT_HUMAN_CREATION_2=5]="WAIT_HUMAN_CREATION_2",e[e.WAIT_HUMAN_START_3=6]="WAIT_HUMAN_START_3",e[e.WAIT_HUMAN_END_4=7]="WAIT_HUMAN_END_4"}(t.ECreateStates||(t.ECreateStates={}));!function(e){e.DOWN_MOVE="down",e.UP_MOVE="up",e.LEFT_MOVE="left",e.RIGHT_MOVE="right",e.CONTINUE_MOVE="continue"}(t.EMoveTypes||(t.EMoveTypes={}));!function(e){e.TO_SERVER_createGame="TO_SERVER_createGame",e.TO_SERVER_startPeople="TO_SERVER_startPeople",e.TO_SERVER_startMachine="TO_SERVER_startMachine",e.TO_SERVER_joinGame="TO_SERVER_joinGame",e.TO_SERVER_moveSnake="TO_SERVER_moveSnake",e.TO_SERVER_moveMachine="TO_SERVER_moveMachine",e.TO_SERVER_disconnectBrowser="TO_SERVER_disconnectBrowser",e.TO_SERVER_gameList="TO_SERVER_gameList",e.TO_BROWSER_missedStart="TO_BROWSER_missedStart",e.TO_BROWSER_gameList="TO_BROWSER_gameList",e.TO_BROWSER_timeout="TO_BROWSER_timeout",e.TO_BROWSER_startPeople="TO_BROWSER_startPeople",e.TO_BROWSER_2_to_tango="TO_BROWSER_2_to_tango",e.TO_BROWSER_9_players="TO_BROWSER_9_players",e.TO_BROWSER_advanceBoard="TO_BROWSER_advanceBoard",e.TO_BROWSER_crashTurn="TO_BROWSER_crashTurn",e.TO_BROWSER_announceWinner="TO_BROWSER_announceWinner",e.TO_BROWSER_announceTie="TO_BROWSER_announceTie",e.TO_BROWSER_announceNames="TO_BROWSER_announceNames",e.TO_BROWSER_your_color="TO_BROWSER_your_color",e.TO_BROWSER_all_moves="TO_BROWSER_all_moves"}(t.EActions||(t.EActions={}))},function(e,t,n){"use strict";(function(e){function a(t){if(e.argv[t]){return e.argv[t].split("=")}return["",""]}function r(e){if(void 0===e)return"";return e.replace(/[^a-z0-9 '_]/gi,"").trim()}var o=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],a=!0,r=!1,o=void 0;try{for(var _,i=e[Symbol.iterator]();!(a=(_=i.next()).done)&&(n.push(_.value),!t||n.length!==t);a=!0);}catch(e){r=!0,o=e}finally{try{!a&&i.return&&i.return()}finally{if(r)throw o}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();Object.defineProperty(t,"__esModule",{value:!0});var _=n(3),i=n(0),s=n(1),u=i.default,l=u.TINY_SNAKE_SIZE,c=u.MEDIUM_SNAKE_SIZE,d=u.LARGE_SNAKE_SIZE,m=u.SLOW_SNAKE_SPEED,f=u.AVERAGE_SNAKE_SPEED,E=u.FAST_SNAKE_SPEED,T=s.EMoveTypes,S=T.DOWN_MOVE,O=T.UP_MOVE,y=T.LEFT_MOVE,v=T.RIGHT_MOVE,p=T.CONTINUE_MOVE;t.sendSocket=function(e,t,n){var a={data:n,message_type:t},r=JSON.stringify(a);try{e.send(r)}catch(t){console.error("sendSocket error",t.message,a,e)}},t.dateInSeconds=function(){var e=Number(new Date);return Math.floor(e/1e3)},t.mouseListenerAdd=function(e,t,n){document.getElementById(e).addEventListener(t,n,!1)},t.eventListenerAdd=function(e,t,n){document.getElementById(e).addEventListener(t,n,!1)},t.blockById=function(e){var t=!0,n=!1,a=void 0;try{for(var r,o=e[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){var _=r.value;document.getElementById(_).style.display="inline-block"}}catch(e){n=!0,a=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw a}}},t.noneById=function(e){var t=!0,n=!1,a=void 0;try{for(var r,o=e[Symbol.iterator]();!(t=(r=o.next()).done);t=!0){var _=r.value;document.getElementById(_).style.display="none"}}catch(e){n=!0,a=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw a}}},t.focusById=function(e){document.getElementById(e).focus()},t.getUrlParamByName=function(e){var t=RegExp("[?&]"+e+"=([^&]*)").exec(window.location.search);if(t){var n=decodeURIComponent(t[1].replace(/\+/g," "));if(""!==n)return n}return""},t.never_needTwoToTango=function(e){console.error("IMPOSSIBLE TESTING ONLY, we need two people to have a human game",e)},t.never_nineMakesACrowd=function(e){console.error("IMPOSSIBLE TESTING ONLY, we somehow have a nine-player game",e)},t.colorTextSpan=function(e,t){return" <span style='color: "+e+"'>"+t+"</span> "},t.upDownLeftRight=function(e,t,n){var a=p;return e===t[0]||e===n[0]?a=O:e===t[1]||e===n[1]?a=S:e===t[2]||e===n[2]?a=y:e!==t[3]&&e!==n[3]||(a=v),a},t.inputValueSet=function(e,t){document.getElementById(e).value=t},t.propertyValueSet=function(e,t,n){document.getElementById(e)[t]=n},t.selectedValueGet=function(e){var t=document.getElementById(e);return-1===t.selectedIndex?"":t.options[t.selectedIndex].value},t.styleValueSet=function(e,t,n){document.getElementById(e).style[t]=n},t.getArgByIndex=a,t.setUpTesting=function(){var e=a(2),t=o(e,2),n=t[0],r=t[1];if("testing"===n&&"true"===r)return _.default},t.decodeSnakeSize=function(e){var t=d;return"tiny"===e?t=l:"medium"===e&&(t=c),t},t.decodeSnakeSpeed=function(e){var t=E;return"slow"===e?t=m:"average"===e&&(t=f),t},t.decodeSnakeWalls=function(e){var t=!1;return"random"===e&&(t=!0),t},t.sanitizeValue=r,t.sanitizeInputValue=function(e){return r(document.getElementById(e).value)}}).call(t,n(5))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={TESTING_BOARD_COLOR:0,TESTING_BOARD_INDEX:0,TESTING_SECONDS_COUNT_DOWN:1,TESTING_TIME_OUT_SECONDS:300}},,function(e,t,n){"use strict";function a(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(l===setTimeout)return setTimeout(e,0);if((l===a||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function _(){E&&m&&(E=!1,m.length?f=m.concat(f):T=-1,f.length&&i())}function i(){if(!E){var e=o(_);E=!0;for(var t=f.length;t;){for(m=f,f=[];++T<t;)m&&m[T].run();T=-1,t=f.length}m=null,E=!1,function(e){if(c===clearTimeout)return clearTimeout(e);if((c===r||!c)&&clearTimeout)return c=clearTimeout,clearTimeout(e);try{c(e)}catch(t){try{return c.call(null,e)}catch(t){return c.call(this,e)}}}(e)}}function s(e,t){this.fun=e,this.array=t}function u(){}var l,c,d=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:a}catch(e){l=a}try{c="function"==typeof clearTimeout?clearTimeout:r}catch(e){c=r}}();var m,f=[],E=!1,T=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];f.push(new s(e,t)),1!==f.length||E||o(i)},s.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=u,d.addListener=u,d.once=u,d.off=u,d.removeListener=u,d.removeAllListeners=u,d.emit=u,d.prependListener=u,d.prependOnceListener=u,d.listeners=function(e){return[]},d.binding=function(e){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(e){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(e,t,n){"use strict";var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(t,"__esModule",{value:!0});var r=n(7),o=n(3),_=n(0),i=n(2),s=n(1),u=n(8),l=n(9),c=_.default,d=c.SECONDS_COUNT_DOWN,m=c.ONE_SECOND,f=c.LEFT_HAND_UDLR_KEYS,E=c.RIGHT_HAND_UDLR_KEYS,T=s.EMoveTypes.CONTINUE_MOVE,S=s.EActions,O=S.TO_BROWSER_startPeople,y=S.TO_BROWSER_all_moves,v=S.TO_SERVER_moveSnake,p=S.TO_BROWSER_announceWinner,A=S.TO_BROWSER_announceTie,w=S.TO_BROWSER_your_color,R=S.TO_BROWSER_crashTurn,g=S.TO_BROWSER_announceNames,I=S.TO_BROWSER_9_players,N=S.TO_BROWSER_gameList,h=S.TO_BROWSER_2_to_tango,b=S.TO_BROWSER_timeout,L=S.TO_BROWSER_missedStart,B={live_colors:[],draw_board:{},show_players_data:[],count_down_vertical:0,showPlayers:function(e){if(!u.default.game_started){"object"===a(window.GLOBAL_WEBPACK.create_game_entry)&&window.GLOBAL_WEBPACK.create_game_entry.create_game.enableStartButton();for(var t="",n=void 0,r=1;r<e.length;r++){if(void 0===B.live_colors[0])n=e[r];else{var o=B.live_colors[r],_=e[r];n=i.colorTextSpan(o,_)}t=t+"<div> Player # "+r+" - "+n+"</div>"}i.propertyValueSet("game-names","innerHTML",t)}},initializeGame:function(e){var t=r.BoardColors.colorSet(e.color_index),n=u.default.tile_size;l.DrawBoard.initializeDraw(n,t),B.draw_board=l.DrawBoard,B.live_colors=t,B.showPlayers(B.show_players_data),B.fixStartHtml(),u.default.game_started=!1,u.default.game_over=!1,u.default.browser_turn=0,e.config_testing_vars?u.default.seconds_count_down=o.default.TESTING_SECONDS_COUNT_DOWN:u.default.seconds_count_down=d,u.default.count_down=u.default.seconds_count_down,Array.isArray(e.test_moves)&&(u.default.test_moves=e.test_moves),B.enableKeys(),u.default.next_key_move=T,B.draw_board.drawCanvas(e),i.styleValueSet("board-container","display",""),i.propertyValueSet("game-results","innerHTML",""),B.count_down_vertical=e.board_height*n/2,B.countDownStart()},enableKeys:function(){document.addEventListener("keydown",function(e){var t=e.keyCode,n=i.upDownLeftRight(t,f,E);u.default.next_key_move=n})},countDownStart:function(){var e=B.live_colors[u.default.your_player_number],t=u.default.tile_size/2+"px solid "+e;i.styleValueSet("board-container","border",t),u.default.count_down_func_id=window.setInterval(B.showCountDown,m);var n=m*(u.default.seconds_count_down+1);setTimeout(B.startGame,n)},showCountDown:function(){var e=document.getElementById("count-downer");e.style.top=String(B.count_down_vertical),u.default.count_down===u.default.seconds_count_down&&(e.classList.add("my-count"),B.playerColorElement("count-downer")),u.default.count_down<1?(e.innerHTML="",e.classList.remove("my-count"),window.clearTimeout(u.default.count_down_func_id)):e.innerHTML=u.default.count_down.toString(),u.default.count_down=u.default.count_down-1},startGame:function(){u.default.game_started=!0,u.default.sample_keys_func_id=window.setInterval(B.sendMoveToServer,u.default.send_move_interval)},showAllMoves:function(e){u.default.browser_turn=u.default.browser_turn+1,"function"==typeof u.default.the_game_board.draw_board.drawMoves&&u.default.the_game_board.draw_board.drawMoves(e)},showWinner:function(e){B.readyForGame();var t=e[0],n=Number(t),a=e[1],r=void 0;if(n===u.default.your_player_number){var o=B.live_colors[u.default.your_player_number];r=i.colorTextSpan(o,"You are the Winner!")}else{var _=B.live_colors[n],s=i.colorTextSpan(_,t);r="You lose. "+i.colorTextSpan(_,a)+"player # "+s+"is the winner."}i.propertyValueSet("game-results","innerHTML",r),B.fixEndHtml()},fixStartHtml:function(){"object"===a(window.GLOBAL_WEBPACK.create_game_entry)?(window.GLOBAL_WEBPACK.create_game_entry.create_game.fixStartCreateHtml(),B.playerColorElement("create-color")):"object"===a(window.GLOBAL_WEBPACK.join_game_entry)&&(window.GLOBAL_WEBPACK.join_game_entry.join_game.fixStartJoinHtml(),B.playerColorElement("join-color"))},fixEndHtml:function(){"object"===a(window.GLOBAL_WEBPACK.create_game_entry)?window.GLOBAL_WEBPACK.create_game_entry.create_game.fixEndCreateHtml():"object"===a(window.GLOBAL_WEBPACK.join_game_entry)&&window.GLOBAL_WEBPACK.join_game_entry.join_game.fixEndJoinHtml()},readyForGame:function(){window.clearInterval(u.default.sample_keys_func_id),u.default.game_over=!0,u.default.game_started=!1,u.default.browser_turn=0},showTie:function(){B.readyForGame(),i.propertyValueSet("game-results","innerHTML","we have a tie !"),B.fixEndHtml()},playerColorElement:function(e){var t=B.live_colors[u.default.your_player_number];i.styleValueSet(e,"color",t)},setPlayerNumber:function(e){u.default.your_player_number=e},moveToServer:function(e){if(!u.default.game_over)try{var t={browser_turn:u.default.browser_turn,message_type:v,move_direction:e,uuid_key:u.default.ws_random_key};B.sendMessage(t)}catch(e){console.error("err",e)}},sendMoveToServer:function(){var e=u.default.next_key_move;if(u.default.test_moves.length>0){u.default.test_moves.length===u.default.browser_turn&&(u.default.test_moves=u.default.test_moves.concat(u.default.test_moves));var t=u.default.test_moves[u.default.browser_turn];u.default.next_key_move===T?e=t:(e=u.default.next_key_move,u.default.next_key_move=T)}B.moveToServer(e)},sendMessage:function(e){var t=JSON.stringify(e);"function"==typeof u.default.the_websocket.send&&u.default.the_websocket.send(t)}};u.default.the_websocket.onclose=function(){u.default.the_websocket.send=null},u.default.the_websocket.onmessage=function(e){var t=JSON.parse(e.data),n=t.message_type,r=t.data;n===O?B.initializeGame(r):n===y?B.showAllMoves(r):n===p?B.showWinner(r):n===A?B.showTie():n===w?B.setPlayerNumber(r):n===R?B.draw_board.drawCrashes(r):n===g?(B.show_players_data=r,B.showPlayers(r)):n===h?i.never_needTwoToTango(r):n===I?i.never_nineMakesACrowd(r):n===b?i.styleValueSet("timed-out","display","block"):n===N?"object"===a(window.GLOBAL_WEBPACK.join_game_entry)&&window.GLOBAL_WEBPACK.join_game_entry.join_game.showJoinGames(r):n===L?"object"===a(window.GLOBAL_WEBPACK.join_game_entry)&&window.GLOBAL_WEBPACK.join_game_entry.join_game.missedStart(r):console.error("ERROR game-objects :  unknown message = ",n)},u.default.the_game_board=B,t.default=u.default},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=[["rgb(255, 255, 255)","rgb(255, 0, 0)","rgb(0, 255,0)","rgb(0, 0, 255)","rgb(0, 255, 255)","rgb(255, 0, 255)","rgb(255, 255, 0)","rgb(128, 128, 128)","rgb(128, 128, 0)","rgb(0, 0, 0)"],["rgb(0, 0, 0)","rgb(0,0,128)","rgb(0,128,128)","rgb(128,0,128)","rgb(0,128,0)","rgb(128,128,0)","rgb(128,0,0)","rgb(128,128,128)","rgb(192,192,192)","rgb(255, 255, 255)"]],a={randomColors:function(){if(void 0===e.CONFIG_TESTING_VARS){return Math.floor(Math.random()*n.length)}return e.CONFIG_TESTING_VARS.TESTING_BOARD_COLOR},colorSet:function(e){return n[e]}};t.BoardColors=a}).call(t,n(4))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n(1),o=a.default,_=o.SECONDS_COUNT_DOWN,i=o.MOVE_SEND_INTERVAL,s=o.TILE_PIXEL_SIZE,u=r.EMoveTypes.CONTINUE_MOVE,l=window.SNAKE_WS_RANDOM_KEY,c={browser_turn:0,count_down:_,count_down_func_id:0,game_over:!1,game_started:!1,host_name:location.origin.replace(/^http/,"ws")+"/?"+l,machine_game_count:1,next_key_move:u,sample_keys_func_id:0,seconds_count_down:0,send_move_interval:i,test_moves:[],the_game_board:{},the_websocket:{},tile_size:s,ws_random_key:l,your_player_number:0};c.the_websocket=new WebSocket(c.host_name),t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0).default,r=a.WS_MESSAGE_DELIM,o=a.CTX_WALL_COLOR,_=document.getElementById("board-container"),i=_.getContext("2d"),s={tile_size:123,live_colors:[],initializeDraw:function(e,t){s.tile_size=e,s.live_colors=t},drawCanvas:function(e){_.width=e.board_width*s.tile_size,_.height=e.board_height*s.tile_size,"function"==typeof s.drawGrid&&s.drawGrid(e.board_json)},drawSquares:function(e,t,n,a){var r=s.tile_size/2,o=1;do{i.beginPath(),i.moveTo(e+o,t+o),i.lineTo(n-o,t+o),i.lineTo(n-o,a-o),i.lineTo(e+o,a-o),i.lineTo(e+o,t+o),i.stroke(),o+=2}while(o<r)},drawCrashes:function(e){s.drawMoves(e),i.strokeStyle=o;for(var t=e.length-1;t>=0;t--){var n=e[t].split(r),a=parseInt(n[0],10),_=parseInt(n[1],10),u=a*s.tile_size+1,l=_*s.tile_size+1,c=(a+1)*s.tile_size-1,d=(_+1)*s.tile_size-1;s.drawSquares(u,l,c,d)}},drawGrid:function(e){for(var t=e.length-1;t>=0;t--)for(var n=e[t].length-1;n>=0;n--){var a=e[t][n];s.drawTile(n,t,a)}},drawTile:function(e,t,n){i.fillStyle=s.live_colors[n];var a=e*s.tile_size,r=t*s.tile_size;i.fillRect(a,r,s.tile_size,s.tile_size)},drawMoves:function(e){for(var t=e.length-1;t>=0;t--){var n=e[t].split(r),a=parseInt(n[0],10),o=parseInt(n[1],10),_=parseInt(n[2],10);s.drawTile(a,o,_)}}};t.DrawBoard=s},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(2),r=n(1),o=n(6),_=r.ECreateStates,i=_.WAIT_COMPUTER_OPPONENTS_A,s=_.WAIT_COMPUTER_START_B,u=_.WAIT_COMPUTER_START_C,l=_.WAIT_FOR_CHOICE,c=_.WAIT_HUMAN_NAMING_1,d=_.WAIT_HUMAN_CREATION_2,m=_.WAIT_HUMAN_START_3,f=_.WAIT_HUMAN_END_4,E=r.EActions,T=E.TO_SERVER_createGame,S=E.TO_SERVER_startPeople,O=E.TO_SERVER_startMachine,y=o.default.the_game_board,v={focusOnAName:function(){var e=document.activeElement;if(null!==e){var t=e.id;"game-name"!==t&&"create-name"!==t&&a.focusById("game-name")}},visibleHtmlJoin:function(e){switch(e){case i:a.noneById(["vs-computer","vs-humans","join-page"]),a.blockById(["computer-opponents"]);break;case s:a.noneById(["size-of-snakes","speed-of-snakes","walls-of-snakes","computer-opponents"]);break;case u:break;case l:a.noneById(["computer-opponents","name-of-game","name-of-creator","create-game","start-human","create-color"]),a.blockById(["vs-computer","vs-humans","join-page","size-of-snakes","speed-of-snakes","walls-of-snakes"]);break;case c:a.noneById(["vs-computer","vs-humans","join-page","create-game"]),a.blockById(["name-of-game","name-of-creator"]),v.focusOnAName();break;case d:a.blockById(["name-of-game","name-of-creator","create-game"]),a.noneById(["start-human"]);break;case m:a.noneById(["name-of-game","name-of-creator","create-game"]),a.blockById(["start-human"]);break;case f:a.noneById(["size-of-snakes","speed-of-snakes","walls-of-snakes","start-human"]),a.blockById(["create-color"])}},fixStartCreateHtml:function(){v.visibleHtmlJoin(f)},fixEndCreateHtml:function(){v.visibleHtmlJoin(l)},enableStartButton:function(){v.visibleHtmlJoin(m);var e=a.sanitizeInputValue("game-name");a.propertyValueSet("start-human","innerHTML","Start "+e),a.propertyValueSet("start-human","disabled",!1)},showHumanGame:function(){v.notEmptyNames()},autoFillCreate:function(){if("function"==typeof a.getUrlParamByName){var e=a.sanitizeValue(a.getUrlParamByName("game_name")),t=a.sanitizeValue(a.getUrlParamByName("create_name"));e&&t&&("function"==typeof v.showHumanGame&&v.showHumanGame(),a.inputValueSet("game-name",e),a.inputValueSet("create-name",t),v.sendCreateGame())}},areNamesEmpty:function(){var e=a.sanitizeInputValue("create-name"),t=a.sanitizeInputValue("game-name");return 0===e.length||0===t.length},notEmptyNames:function(){v.areNamesEmpty()?v.visibleHtmlJoin(c):(v.visibleHtmlJoin(c),v.visibleHtmlJoin(d))},showMachineGame:function(){v.visibleHtmlJoin(i)},sendCreateGame:function(){v.visibleHtmlJoin(m);try{var e=a.sanitizeInputValue("game-name"),t=a.sanitizeInputValue("create-name");if("function"==typeof y.sendMessage){var n={message_type:T,uuid_key:o.default.ws_random_key,game_name:e,user_name:t};y.sendMessage(n)}a.propertyValueSet("start-human","innerHTML","Waiting for other player(s) to join "+e),a.propertyValueSet("start-human","disabled",!0)}catch(e){console.error("err",e)}},sendStartGame:function(){try{var e=a.sanitizeInputValue("game-name"),t=a.sanitizeInputValue("create-name"),n=document.querySelector("input[name=snake-size]:checked").value,r=document.querySelector("input[name=snake-speed]:checked").value,_=document.querySelector("input[name=snake-walls]:checked").value;if("function"==typeof y.sendMessage){var i={message_type:S,uuid_key:o.default.ws_random_key,game_name:e,create_name:t,snake_size:n,snake_walls:_,milli_turns:r};y.sendMessage(i)}}catch(e){console.error("err",e)}},sendVersusComputer:function(e){var t=e.target.id.split("-")[1];v.visibleHtmlJoin(s);try{var n=o.default.ws_random_key+"_"+o.default.machine_game_count,a=o.default.ws_random_key+"-"+o.default.machine_game_count,r=document.querySelector("input[name=snake-size]:checked").value,_=document.querySelector("input[name=snake-speed]:checked").value,i=document.querySelector("input[name=snake-walls]:checked").value;if("function"==typeof y.sendMessage){var u={message_type:O,uuid_key:o.default.ws_random_key,game_name:n,user_name:a,num_computer:t,snake_size:r,snake_walls:i,milli_turns:_};y.sendMessage(u)}}catch(e){console.error("err",e)}}};t.create_game=v,v.visibleHtmlJoin(l),a.eventListenerAdd("create-game","click",v.sendCreateGame),a.eventListenerAdd("start-human","click",v.sendStartGame),a.eventListenerAdd("vs-computer","click",v.showMachineGame),a.eventListenerAdd("vs-humans","click",v.showHumanGame),a.mouseListenerAdd("computer-1","click",v.sendVersusComputer),a.mouseListenerAdd("computer-2","click",v.sendVersusComputer),a.mouseListenerAdd("computer-3","click",v.sendVersusComputer),a.mouseListenerAdd("computer-4","click",v.sendVersusComputer),a.mouseListenerAdd("computer-5","click",v.sendVersusComputer),a.mouseListenerAdd("computer-6","click",v.sendVersusComputer),a.mouseListenerAdd("computer-7","click",v.sendVersusComputer),a.eventListenerAdd("create-name","input",v.notEmptyNames),a.eventListenerAdd("game-name","input",v.notEmptyNames),o.default.the_websocket.onopen=function(){v.autoFillCreate()}}],[11]);