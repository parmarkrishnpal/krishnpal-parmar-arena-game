import { Arena } from "./src/modules/Arena.js";
import {
  promptUserForIntegerInput,
  displayMenu,
  handleAddPlayer,
  handleBattle,
  MenuOptions,
} from "./src/utils/common.js";

(async () => {
  const arena = new Arena();

  while (true) {
    displayMenu();

    try {
      const option = await promptUserForIntegerInput(
        "Enter your choice (integer): "
      );

      switch (option) {
        case MenuOptions.ADD_PLAYER:
          await handleAddPlayer(arena);
          break;
        case MenuOptions.BATTLE:
          await handleBattle(arena);
          break;
        case MenuOptions.END_GAME:
          console.log("Game Over...\n");
          return;
        default:
          console.log("Invalid option. Please choose a valid option.\n");
      }
    } catch (error) {
      console.error("An error occurred: ", error.message);
    }

    console.log(
      "\n____________________________________________________________________________________________________\n\n"
    );
  }
})();
