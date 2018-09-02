
/**
 * Game state. 
 * Every possibility in the game must be represented by this game state type
 */

interface ITicTacToe extends IGame {
    table: number[][]; // tic tac toe 3 x 3 matrix
}
