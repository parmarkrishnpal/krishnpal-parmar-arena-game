import { Arena } from "../src/modules/Arena.js";

describe("Arena class", () => {
  let A;

  beforeEach(() => {
    A = new Arena();
  });

  describe("addPlayer method", () => {
    test("A player's health can't be negative or zero.", () => {
      let id = A.addPlayer("A", -2, 200, 100);
      expect(id).toEqual(-1);

      id = A.addPlayer("A", 0, 200, 100);
      expect(id).toEqual(-1);
    });

    test("A player's strength can't be negative or zero.", () => {
      let id = A.addPlayer("A", 2, -200, 100);
      expect(id).toEqual(-1);

      id = A.addPlayer("A", 10, 0, 100);
      expect(id).toEqual(-1);
    });

    test("A player's attack can't be negative or zero.", () => {
      let id = A.addPlayer("A", 2, 200, -100);
      expect(id).toEqual(-1);

      id = A.addPlayer("A", 10, 120, 0);
      expect(id).toEqual(-1);
    });

    test("A newly added player should be present in the Arena.", () => {
      const id = A.addPlayer("A", 100, 200, 100);
      expect(A.isPresent(id)).toEqual(true);
    });

    test("Player count should increase after addition of a new player.", () => {
      const oldPlayerCount = A.getPlayerCount();
      A.addPlayer("A", 100, 200, 100);
      const newPlayerCount = A.getPlayerCount();

      expect(newPlayerCount).toEqual(oldPlayerCount + 1);
    });
  });

  describe("deletePlayer method", () => {
    test("The deleted player should not be present in the Arena.", () => {
      const id = A.addPlayer("A", 100, 200, 100);
      A.deletePlayer(id);
      expect(A.isPresent(id)).toEqual(false);
    });

    test("Player count should decrease after deletion of a player.", () => {
      const id = A.addPlayer("A", 100, 200, 100);
      const oldPlayerCount = A.getPlayerCount();

      A.deletePlayer(id);
      const newPlayerCount = A.getPlayerCount();

      expect(newPlayerCount).toEqual(oldPlayerCount - 1);
    });

    test("Trying to delete a player who is not in the Arena should not change player count.", () => {
      const id = A.addPlayer("A", 100, 200, 100);

      const oldPlayerCount = A.getPlayerCount();
      A.deletePlayer(id + 123); // Trying to delete a non-existent player
      const newPlayerCount = A.getPlayerCount();

      expect(newPlayerCount).toEqual(oldPlayerCount);
    });
  });

  describe("battle method", () => {
    test("Battle with empty arena should return an empty object.", () => {
      expect(A.battle(0, 1)).toEqual({});
    });

    test("Players have the same id should return an empty object.", () => {
      A.addPlayer("A", 100, 200, 100);
      A.addPlayer("B", 200, 300, 100);

      expect(A.battle(0, 0)).toEqual({});
    });

    test("One of the Player's id does not exist should return an empty object.", () => {
      A.addPlayer("A", 100, 200, 100);
      A.addPlayer("B", 200, 300, 100);

      expect(A.battle(0, 10)).toEqual({});
    });

    test("Normal battle should return the correct outcome.", () => {
      A.addPlayer("A", 100, 200, 100);
      A.addPlayer("B", 200, 300, 100);

      const possibleOutcomes = [
        { winner: 0, loser: 1 },
        { winner: 1, loser: 0 },
      ];

      const res = A.battle(0, 1);
      expect(possibleOutcomes).toContainEqual(res);

      const { winner, loser } = res;

      // The winner should be present in the Arena
      expect(A.isPresent(winner)).toBe(true);
      // The loser should not be present in the Arena
      expect(A.isPresent(loser)).toBe(false);
    });
  });
});
