export class Player {
  /**
   * @class
   * This class represents a player in the game.
   *
   * It provides an interface to create player objects with specific attributes such as id, name, health, strength, and attack.
   * Example usage:
   *   const player = new Player(1, 'John', 100, 50, 30);
   *
   * @property {number} id - The unique identifier for the player.
   * @property {string} name - The name of the player.
   * @property {number} health - The health points of the player.
   * @property {number} strength - The strength attribute of the player.
   * @property {number} attack - The attack power of the player.
   */

  constructor(id, name, health, strength, attack) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.attack = attack;
  }
}
