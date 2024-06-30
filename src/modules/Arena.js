import { rollDice } from "../utils/common.js";
import { Player } from "./Players.js";

export class Arena {
  /**
   * @class
   * This class provides an interface to manage an arena where players can be added, deleted, displayed, and made to battle each other.
   * It keeps track of the total number of players and their respective details using a Map.
   * Example usage:
   *   const arena = new Arena();
   *   arena.addPlayer('John', 100, 50, 30);
   *   arena.displayPlayers();
   *   arena.battle(0, 1);
   *
   * @property {number} totalPlayers - Total players present in the arena.
   * @property {Map<number, Player>} Players - A Map data structure to keep details of players.
   */

  constructor() {
    this.totalPlayers = 0;
    this.Players = new Map();
    console.log("Welcome to the arena!!!\n");
  }

  /**
   * Checks if a player with the given id exists.
   * @param {number} id - The player's id.
   * @returns {boolean} - True if player exists, otherwise false.
   */
  isPresent(id) {
    return this.Players.has(id);
  }

  /**
   * Gets the current number of players in the arena.
   * @returns {number} - The count of players.
   */
  getPlayerCount() {
    return this.Players.size;
  }

  /**
   * Adds a new player to the arena.
   * @param {string} name - The player's name.
   * @param {number} health - The player's health.
   * @param {number} strength - The player's strength.
   * @param {number} attack - The player's attack power.
   * @returns {number} - The new player's id.
   */
  addPlayer(name, health, strength, attack) {
    if (health <= 0 || strength <= 0 || attack <= 0) {
      console.error(
        "Health, Strength, and Attack should be positive integers."
      );
      return -1;
    }

    const id = this.totalPlayers;
    const newPlayer = new Player(id, name, health, strength, attack);
    this.Players.set(id, newPlayer);
    this.totalPlayers += 1;

    return id;
  }

  /**
   * Deletes a player from the arena by id.
   * @param {number} id - The player's id.
   */
  deletePlayer(id) {
    if (this.Players.has(id)) {
      const player = this.Players.get(id);
      console.log(`${player.name} has been un-alived...\n`);
      this.Players.delete(id);
    } else {
      console.error(`No player with id = ${id} exists.\n`);
    }
  }

  /**
   * Displays all players in the arena.
   */
  displayPlayers() {
    const playerArray = [];
    for (const [id, player] of this.Players) {
      playerArray.push({
        Id: id,
        Name: player.name,
        Health: player.health,
        Strength: player.strength,
        Attack: player.attack,
      });
    }
    console.clear();
    console.table(playerArray, ["Id", "Name", "Health", "Strength", "Attack"]);
  }

  /**
   * Initiates a battle between two players.
   * @param {number} firstPlayerID - The id of the first player.
   * @param {number} secondPlayerID - The id of the second player.
   * @returns {Object} - The result of the battle.
   */
  battle(firstPlayerID, secondPlayerID) {
    if (firstPlayerID === secondPlayerID) {
      console.error("Ids cannot be the same for both the Players.\n");
      return {};
    }
    if (!this.isPresent(firstPlayerID)) {
      console.error(`No player with id = ${firstPlayerID} exists.\n`);
      return {};
    }
    if (!this.isPresent(secondPlayerID)) {
      console.error(`No player with id = ${secondPlayerID} exists.\n`);
      return {};
    }

    let attacker = this.Players.get(firstPlayerID);
    let defender = this.Players.get(secondPlayerID);

    if (defender.health < attacker.health) {
      [attacker, defender] = [defender, attacker];
    }

    console.log(
      `\n____________${attacker.name} v/s ${defender.name}____________\n`
    );

    const battleRound = (attacker, defender) => {
      const attackingPower = attacker.attack * rollDice();
      const defendingPower = defender.strength * rollDice();

      console.log(
        `${attacker.name} hits ${defender.name} with power: ${attackingPower}\n`
      );
      console.log(`${defender.name} defends with power: ${defendingPower}\n`);

      if (attackingPower > defendingPower) {
        defender.health -= attackingPower - defendingPower;
        defender.health = Math.max(0, defender.health);
      }

      console.log(`${defender.name}'s health: ${defender.health}\n`);
    };

    while (defender.health > 0) {
      battleRound(attacker, defender);
      if (defender.health > 0) {
        [attacker, defender] = [defender, attacker];
      }
    }

    const result = { winner: attacker.id, loser: defender.id };
    console.log(`${attacker.name} has emerged victorious!!!\n`);
    this.deletePlayer(defender.id);

    return result;
  }
}
