
Electric-Snakes is a multiplayer snake game server using Redux and Immutable.js to hold state; written in Typescript

Live Example
	[https://electric-snakes.herokuapp.com/create-game](https://electric-snakes.herokuapp.com/create-game)
	[https://electric-snakes.herokuapp.com/join-game](https://electric-snakes.herokuapp.com/join-game)

Architecture
	Browser and Node.js share one TypeScript TSLinted code base via Webpack.
	The syncroniztion of different games and snakes is done with Redux using Immutable.js collections.
	Interactions are communitcated via WebSockets

Compile
	Compile all and run from scratch:
	    $ npm install
		$ gulp build
		$ npm start

	Compile changes and run via watches:
		$ tsc -w                   
		$ gulp ts_watch              
		$ gulp run_watch 
		$ gulp tslint_watch

	Compile changes separately and run:
		$ tsc                
		$ gulp webpack_js             
		$ tslint -p tsconfig.json
		$ npm start  or  npm test

Play
	To create single or multiple user game:
		http://localhost:3000/create-game

	To join multiple user game: 
		http://localhost:3000/join-game

Test
	localhost:3000/create-game?game_name=TEST_GAME&create_name=TEST_PLAYER_1_
	localhost:3000/join-game?game_name=TEST_GAME&join_name=TEST_PLAYER_2_

