import * as React from 'react';

/**
 * Tic Tac Toe player:
 * 1 - X
 * 2 - O
 */
function ox(player: number) {
  switch(player) {
    case 0: return ".";
    case 1: return "X";
    case 2: return "O";
    default: return "unknown";
  }
}

/**
 * For a given game board, renders the game to HTML
 */
/*
export function render(game: ITicTacToe) {
  return <div>
      <p>Játékos: {ox(game.currentPlayer)}</p>
      <p>{ game.winner ? "Nyertes: " + ox(game.winner) : ""}</p>
      <table className="tictactoe">
        <tr>
          <td>{ox(game.table[0][0])}</td>
          <td>{ox(game.table[0][1])}</td>
          <td>{ox(game.table[0][2])}</td>
        </tr>
        <tr>
          <td>{ox(game.table[1][0])}</td>
          <td>{ox(game.table[1][1])}</td>
          <td>{ox(game.table[1][2])}</td>
        </tr>
        <tr>
          <td>{ox(game.table[2][0])}</td>
          <td>{ox(game.table[2][1])}</td>
          <td>{ox(game.table[2][2])}</td>
        </tr>
      </table>
    </div>;
}
*/