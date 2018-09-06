import * as bg from 'board-game-rules-tester';
import { IDrag } from '.';

export default class Rules extends bg.BoardGameRules<IDrag> {

    start() {
        return {
            playerCount: 2,
            currentPlayer: 1,
            tokens: [false, false, true, false, true]
        }
    };

    getActions() {
        
        this.game.tokens.map((token, fromIndex) => {
            if (token) {
                this.game.tokens.map((isOccupied, toIndex) => {
                    if (!isOccupied) {

                        const copy = bg.copy(this.game);
                        copy.tokens[fromIndex] = false;
                        copy.tokens[toIndex] = true;

                        this.addAction(`${fromIndex} => ${toIndex}`, copy);
                    }
                });
            }
        });

    };

    getWinner() {
        return undefined;
    }
}
