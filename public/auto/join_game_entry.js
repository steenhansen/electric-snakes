var GLOBAL_WEBPACK;(()=>{"use strict";var e,n={814:(e,n,o)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.join_game=void 0;const t=o(8443),a=o(7486),i=o(5130),s=o(1945);o(6981);const{WAIT_JOIN_NAME_GAME_1:r,WAIT_JOIN_GAME_2:l,WAIT_JOIN_START_3:m,WAIT_JOIN_PLAYING_4:c}=i.EJoinStates,{TO_SERVER_joinGame:d,TO_SERVER_gameList:u}=i.EActions,{ONE_SECOND:_,WS_MESSAGE_DELIM:f}=t.default,g=s.default.the_game_board,p={refresh_func_id:0,selected_game:"",have_joined:!1,missedStart:e=>{console.log("missedStart"),p.visibleHtmlJoin(r)},areNamesEmpty:()=>{console.log("areNamesEmpty");const e=(0,a.sanitizeInputValue)("game-name"),n=(0,a.sanitizeInputValue)("join-name");return 0===e.length||0===n.length||(p.selected_game=e,!1)},notEmptyNames:()=>{console.log("notEmptyNames"),p.areNamesEmpty()?p.visibleHtmlJoin(r):p.visibleHtmlJoin(l)},visibleHtmlJoin:e=>{switch(console.log("visibleHtmlJoin"),e){case r:p.have_joined=!1,(0,a.noneById)(["join-game","waiting-for-start","join-color"]),(0,a.blockById)(["name-of-join","choose-game"]);break;case l:(0,a.blockById)(["join-game"]);break;case m:p.have_joined=!0,(0,a.noneById)(["name-of-join","choose-game","join-game"]),(0,a.blockById)(["waiting-for-start"]);break;case c:(0,a.noneById)(["waiting-for-start","join-game"]),(0,a.blockById)(["join-color"])}},fixStartJoinHtml:()=>{console.log("fixStartJoinHtml"),p.visibleHtmlJoin(c)},fixEndJoinHtml:()=>{console.log("visibleHtmlJoin"),p.visibleHtmlJoin(r)},showJoinGames:e=>{if(console.log("showJoinGames the_data",e),!p.have_joined){let n,o="";for(const t of e){const[e,a]=t.split(f);n=e===p.selected_game?" selected ":"",o+=`<option value="${e}" ${n}>${e} - ${a}</option>`}(0,a.propertyValueSet)("game-name","innerHTML",o),""!==(0,a.selectedValueGet)("game-name")&&p.visibleHtmlJoin(l)}},autoFillGame:()=>{if("function"==typeof a.getUrlParamByName){const e=(0,a.sanitizeValue)((0,a.getUrlParamByName)("game_name")),n=(0,a.sanitizeValue)((0,a.getUrlParamByName)("join_name"));e&&n&&("function"==typeof p.showJoinGames&&p.showJoinGames(new Array(e)),(0,a.inputValueSet)("game-name",e),(0,a.inputValueSet)("join-name",n),p.sendJoinGame())}},sendJoinGame:()=>{console.log("sendJoinGame");try{const e=(0,a.sanitizeInputValue)("join-name"),n=(0,a.sanitizeInputValue)("game-name");if("function"==typeof g.sendMessage){const o={game_name:n,message_type:d,user_name:e,uuid_key:s.default.ws_random_key};g.sendMessage(o),p.visibleHtmlJoin(m)}}catch(e){console.error("err",e)}},sendRefreshedGames:()=>{console.log("sendRefreshedGames");try{if("function"==typeof g.sendMessage){const e={message_type:u,uuid_key:s.default.ws_random_key};g.sendMessage(e)}}catch(e){console.error("err",e)}}};n.join_game=p,p.visibleHtmlJoin(r),p.refresh_func_id=window.setInterval(p.sendRefreshedGames,_),(0,a.eventListenerAdd)("join-name","input",p.notEmptyNames),(0,a.eventListenerAdd)("game-name","change",p.notEmptyNames),(0,a.eventListenerAdd)("game-name","click",p.notEmptyNames),(0,a.eventListenerAdd)("join-game","click",p.sendJoinGame),s.default.the_websocket.onopen=()=>{p.autoFillGame()}}},o={};function t(e){var a=o[e];if(void 0!==a)return a.exports;var i=o[e]={exports:{}};return n[e](i,i.exports,t),i.exports}t.m=n,e=[],t.O=(n,o,a,i)=>{if(!o){var s=1/0;for(c=0;c<e.length;c++){for(var[o,a,i]=e[c],r=!0,l=0;l<o.length;l++)(!1&i||s>=i)&&Object.keys(t.O).every((e=>t.O[e](o[l])))?o.splice(l--,1):(r=!1,i<s&&(s=i));if(r){e.splice(c--,1);var m=a();void 0!==m&&(n=m)}}return n}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[o,a,i]},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={340:0};t.O.j=n=>0===e[n];var n=(n,o)=>{var a,i,[s,r,l]=o,m=0;if(s.some((n=>0!==e[n]))){for(a in r)t.o(r,a)&&(t.m[a]=r[a]);if(l)var c=l(t)}for(n&&n(o);m<s.length;m++)i=s[m],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(c)},o=self.webpackChunkGLOBAL_WEBPACK=self.webpackChunkGLOBAL_WEBPACK||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))})();var a=t.O(void 0,[25],(()=>t(814)));a=t.O(a),GLOBAL_WEBPACK=a})();