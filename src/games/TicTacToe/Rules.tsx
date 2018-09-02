/**
 * Initial state, the game starts with this
 */
export function start(): ITicTacToe {
    return {
        playerCount: 2,
        currentPlayer: 1,
        table: [[0, 0, 0], 
                [0, 0, 0], 
                [0, 0, 0]]
    }
};

/**
 * Actions, for a given game state, checks what the current player can do
 */
export function getActions(game: ITicTacToe, actions: IActions) {

  for(let x=0; x<=2; x++) {
    for(let y=0; y<=2; y++) {

      if (game.table[x][y] == 0) {

        let copy = clone(game);
        
        copy.table[x][y] = copy.currentPlayer;
        copy.currentPlayer = copy.currentPlayer == 1 ? 2 : 1;

        actions.add("Lépés: " + x + " " + y, copy);
      }
      
    }
  }

};

/**
 * For a given game state, returns the winner
 */
export function getWinner(game: ITicTacToe) {
  let table = game.table;

  if (table[0][0] == table[0][1] && table[0][2]) return table[0][0];
  if (table[1][0] == table[1][1] && table[1][2]) return table[1][0];
  if (table[2][0] == table[2][1] && table[2][2]) return table[2][0];

  if (table[0][0] == table[1][0] && table[2][0]) return table[0][0];
  if (table[0][1] == table[1][1] && table[2][1]) return table[0][1];
  if (table[0][2] == table[1][2] && table[2][2]) return table[0][2];

  if (table[0][0] == table[1][1] && table[2][2]) return table[0][0];

  if (table[0][2] == table[1][1] && table[2][0]) return table[0][2];

  return null;
}
