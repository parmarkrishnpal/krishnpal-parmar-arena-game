Packages used: 
    1. jest : For writing unit tests for the application.
    2. readline : Node.js's module for reading user input.
    3. cross-env: Allows setting environment variables across platforms in a consistent way.

Steps to run the program :

    1. Install all the dependencies

        `$ npm install`
    
    2. To run the unit tests, 

        `$ npm run test`
    
    3. To run the program,

        `$ node index.js`

        and follow the CLI to interact with the arena. 

File Structure

    krishnpal-parmar-arena-game/
    ├── .git/                       # Git directory for version control (created by `git init`)
    ├── .gitignore                  # Git ignore file
    ├── index.js                    # Entry point to start the game and take user input
    ├── src/                        # Folder containing additional source code
    │   ├── modules/                # Folder containing the classes
    │   │   ├── Player.js           # Represents a player in the arena
    │   │   └── Arena.js            # Manages the fighting logic
    │   └── utils/                  # Folder for common utility functions
    │       └── common.js           # Common utility function
    ├── test/                       # Contains unit tests
    │   ├── util.common.test.js     # Unit tests for Common utility function
    │   └── arena.test.js           # Unit tests for Arena class
    └── README.md                   # Instructions on how to run the code and tests

