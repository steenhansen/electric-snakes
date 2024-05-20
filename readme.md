
<a name='s'></a>

## Multiplayer Game of Snakes

<img src="./images/tall-typescript.gif" height="534">


Electric-Snakes, [https://electric-snakes.onrender.com](https://electric-snakes.onrender.com/create-game) a slow to start free site, is a multi-computer snake game server, written in Typescript, using Redux and Immutable.js to hold state.
Interactions are synchronized via WebSockets between the single coordinating Node.js server and possibly several Javascript browsers.
The server is a free Render.com dyno, so it can take a few seconds to wake up. 150 seconds to be exact.

A single player game against seven computer players

![one person](images/electric-snakes.png)

A two player game, called "Battle of Troy" [started](https://electric-snakes.onrender.com/create-game) by "Hector" with "Achilles" [joining](https://electric-snakes.onrender.com/join-game).
One person "creates" and names the game. While others can join in.

![two people](images/two-browsers.png)

### Prepare Environment

- nvm install 18.2.0

- nvm use 18.2.0

### Compile all and run from scratch:

    $ npm install
    $ npx tsc
    $ npx webpack-cli
    $ npm start  or  npm test


### Run program

    $ npm start
    
## Free Hosting on render.com
	Web Service
	
	Settings
		Build Command	$ yarn
		Start Command	$ npm start
		
		
