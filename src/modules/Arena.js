// @ts-nocheck
import { rollDice } from "../utils/common.js";
import Player from "./Player.js";

export default class Arena {
  constructor() {
    this.total_players = 0;
    this.Players = new Map();
    console.log("Welcome to the arena!!!\n");
  }

  isPresent(id) {
    return this.Players.has(id);
  }

  getPlayerCount() {
    return this.Players.size;
  }

  addPlayer(name, health, strength, attack) {
    if (health <= 0) {
      console.log("Health should be a positive integer.");
      return -1;
    }
    if (strength <= 0) {
      console.log("Strength should be a positive integer.");
      return -1;
    }
    if (attack <= 0) {
      console.log("Attack should be a positive integer.");
      return -1;
    }

    const id = this.total_players;
    const newPlayer = new Player(id, name, health, strength, attack);
    this.Players.set(id, newPlayer);
    this.total_players += 1;

    return id;
  }

  deletePlayer(id) {
    if (this.Players.has(id)) {
      const player = this.Players.get(id);
      console.log(`${player?.name} has been un-alived...\n`);
      this.Players.delete(id);
    } else {
      console.log(`No player with id = ${id} exists.\n`);
    }
  }

  displayPlayers() {
    console.log("|\tId\t|\tName\t|\tHealth\t|\tStrength\t|\tAttack\t|");
    for (const [id, player] of this.Players) {
      const { name, health, strength, attack } = player;
      console.log(
        `|\t${id}\t|\t${name}\t|\t${health}\t|\t${strength}\t|\t${attack}\t|`
      );
    }
    console.log("\n");
  }

  battle(id_first, id_second) {
    if (id_first === id_second) {
      console.log("Id's cannot be the same for both the players.\n");
      return {};
    } else if (!this.Players.has(id_first)) {
      console.log(`No player with id = ${id_first} exists.\n`);
      return {};
    } else if (!this.Players.has(id_second)) {
      console.log(`No player with id = ${id_second} exists.\n`);
      return {};
    } else {
      // extract the players from their ids
      let attacker = this.Players.get(id_first);
      let defender = this.Players.get(id_second);
      console.log(
        `\n____________${attacker.name} v/S ${defender.name}____________\n`
      );

      if (defender.health < attacker.health) {
        // Player with the lower health attacks first
        [attacker, defender] = [defender, attacker];
      }

      while (defender.health > 0) {
        const attacking_power = attacker.attack * rollDice();
        const defending_power = defender.strength * rollDice();

        console.log(
          `${attacker?.name} hits ${defender?.name} with power = ${attacking_power}\n`
        );
        console.log(
          `${defender?.name} defends with power = ${defending_power}\n`
        );

        if (attacking_power > defending_power) {
          defender.health -= attacking_power - defending_power;
          defender.health = Math.max(0, defender.health);
        }

        console.log(`${defender?.name}'s health: ${defender.health}\n`);

        if (defender.health > 0) {
          [attacker, defender] = [defender, attacker];
        }
      }

      const res = { winner: attacker.id, loser: defender.id };
      console.log(`${attacker?.name} has emerged victorious!!!\n`);
      this.deletePlayer(defender.id);

      return res;
    }
  }
}
