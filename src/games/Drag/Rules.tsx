import * as bg from 'board-game-rules-tester';
import { IDrag, IChange, IPlayer, ITile } from '.';

export default class Rules extends bg.BoardGameRules<IDrag, IChange> {

    getStartGame() {
        return {
            playerCount: 2,
            currentPlayer: 0,
            board: [
                [{wood: 1},           {stone: 1}, {wood: 1}, {wood: 2}           ],
                [{wood: -2, gold: 1}, {stone: 2}, {wood: 2}, {stone: -2, gold: 1}]
            ],
            players: [
                {wood: 0, stone: 0, gold: 0, houses: [{pos: "player" as "player"}, {pos: "player" as "player"}]},
                {wood: 0, stone: 0, gold: 0, houses: [{pos: "player" as "player"}, {pos: "player" as "player"}]}
            ]
        };
    };

    createActions() {
        const player = this.game.players[this.game.currentPlayer];

        const occupied: any = {};

        for(const p of this.game.players) {
            for (const h of p.houses) {
                if (h.pos == "board") {
                    occupied[h.x + " " + h.y] = true;
                }
            }
        }

        player.houses.forEach((h, index) => {

            for(var y = 0; y < this.game.board.length; y++) {
                for(var x = 0; x < this.game.board[y].length; x++) {

                    if (occupied[x + " " + y]) continue;

                    const copy = bg.copy(this.game);
                    copy.players[this.game.currentPlayer].houses[index] = {pos: "board", x, y}

                    copy.currentPlayer = copy.currentPlayer === 0 ? 1 : 0;

                    if (copy.currentPlayer === 0) {
                        this.calculateEndTurn(copy);
                    }
            
                    this.addAction(`House ${index} => ${x}, ${y}`, copy, {
                        playerIndex: this.game.currentPlayer, 
                        houseIndex: index,
                        newPosition: {pos: "board" as "board", x: x, y: y}
                    });

                }
            }

        });

    };

    private calculateEndTurn(copy: IDrag) {
        for(var i = 0; i < copy.players.length; i++) {
            const player = copy.players[i];

            for(var j = 0; j < player.houses.length; j++) {
                const house = player.houses[j];
                if (house.pos == "board") {
                    const tile = copy.board[house.y][house.x];
                    if (house.pos == "board" && (tile.wood || 0) >= 0 && (tile.stone || 0) >= 0) {
                        this.calculateTile(player, copy.board[house.y][house.x]);
                    }
                }
            }

            for(var j = 0; j < player.houses.length; j++) {
                const house = player.houses[j];
                if (house.pos == "board") {
                    const tile = copy.board[house.y][house.x];
                    if (house.pos == "board" && ((tile.wood || 0) < 0 || (tile.stone || 0) < 0)) {
                        this.calculateTile(player, copy.board[house.y][house.x]);
                    }
                }
            }

        }
    }

    private calculateTile(player: IPlayer, tile: ITile) {
        if (player.wood + (tile.wood || 0) >= 0
            && player.stone + (tile.stone || 0) >= 0
            && player.gold + (tile.gold || 0) >= 0
            ) {
            player.wood += tile.wood || 0;
            player.stone += tile.stone || 0;
            player.gold += tile.gold || 0;
        }
    }

    getWinner() {
        if (this.game.currentPlayer !== 0) return undefined;

        for(var i=0; i<this.game.players.length; i++) {
            if (this.game.players[i].gold >= 10) return this.game.currentPlayer;
        }

        return undefined;
    }
}
