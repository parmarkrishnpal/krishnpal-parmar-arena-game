import * as readline from "readline";

// Define the available menu options as an immutable object
export const MenuOptions = Object.freeze({
  ADD_PLAYER: 1,
  BATTLE: 2,
  END_GAME: 3,
});

// Function to simulate a dice roll, returning a random integer between 1 and 6
export const rollDice = () => {
  const min = 1,
    max = 6;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to prompt the user for string input, returning a promise that resolves with the user's input
export const promptUserForStringInput = (prompt) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(prompt, (inputString) => {
      rl.close();
      resolve(inputString);
    });
  });
};

// Function to prompt the user for integer input, validating and re-prompting if necessary
export const promptUserForIntegerInput = (promptMessage) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(promptMessage, (inputString) => {
      rl.close();
      const userInput = parseInt(inputString.trim(), 10);
      if (!isNaN(userInput)) {
        resolve(userInput);
      } else {
        console.log("Invalid input. Please enter a valid integer.");
        resolve(promptUserForIntegerInput(promptMessage));
      }
    });
  });
};

// Function to prompt the user for new player details (name, health, attack, strength)
export const inputNewPlayerDetails = async () => {
  const name = await promptUserForStringInput("Enter the player's name: ");
  const health = await promptUserForIntegerInput(`Enter ${name}'s health: `);
  const attack = await promptUserForIntegerInput(`Enter ${name}'s attack: `);
  const strength = await promptUserForIntegerInput(
    `Enter ${name}'s strength: `
  );

  return { name, health, attack, strength };
};

// Function to display the main menu options
export const displayMenu = () => {
  console.log("Options: \n\t1> Add new player\n\t2> Battle\n\t3> End game\n");
};

// Function to handle the process of adding a new player to the arena
export const handleAddPlayer = async (arena) => {
  const { name, health, attack, strength } = await inputNewPlayerDetails();
  arena.addPlayer(name, health, attack, strength);
  arena.displayPlayers();
};

// Function to handle the battle process between two players in the arena
export const handleBattle = async (arena) => {
  if (arena.getPlayerCount() < 2) {
    console.log(
      "There should be at least two players in the Arena.\nPlease add more players.\n"
    );
    return;
  }
  arena.displayPlayers();

  const idFirst = await promptUserForIntegerInput(
    "Enter the first player's id from above table: "
  );
  const idSecond = await promptUserForIntegerInput(
    "Enter the second player's id from above table: "
  );

  arena.battle(idFirst, idSecond);
};
