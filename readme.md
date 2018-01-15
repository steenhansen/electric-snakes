

Electric-Snakes is a multiplayer snake game server, written in Typescript, using Redux and Immutable.js to hold state.

![visual explanation](https://nyc3.digitaloceanspaces.com/steen/electric-snakes.png)

## Live Example
	
### To create a multiplayer game or play against the computer
[https://electric-snakes.herokuapp.com/create-game](https://electric-snakes.herokuapp.com/create-game)

### To join a multiplayer game	
[https://electric-snakes.herokuapp.com/join-game](https://electric-snakes.herokuapp.com/join-game)

## Architecture

Browser and Node.js share one TypeScript TSLinted code base via Webpack. The syncroniztion of different games and snakes is done with Redux using Immutable.js collections. Interactions are communitcated via WebSockets

## Compile

### Compile all and run from scratch:

    $ npm install
	$ gulp build
	$ npm start

### Compile changes and run via watches:

	$ tsc -w                   
	$ gulp ts_watch              
	$ gulp run_watch 
	$ gulp tslint_watch

### Compile changes separately and run:

	$ tsc                
	$ gulp webpack_js             
	$ tslint -p tsconfig.json
	$ npm start  or  npm test

### To create a local multiplayer game or play against the computer
[http://localhost:3000/create-game](http://localhost:3000/create-game)


### To join a local multiplayer game	
[http://localhost:3000/join-game](http://localhost:3000/join-game)


