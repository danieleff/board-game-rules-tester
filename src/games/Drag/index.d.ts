import { IGame } from "board-game-rules-tester";

/**
 * Game state. 
 * Every possibility in the game must be represented by this game state type
 */

export interface IDrag extends IGame {
    tokens: boolean[];
}
