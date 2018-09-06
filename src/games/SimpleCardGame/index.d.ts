import { IGame } from "board-game-rules-tester";

/**
 * Game state. 
 * Every possibility in the game must be represented by this game state type
 */

interface ICardGame extends IGame {
    deck: ICard[];
    player1: {
        hand: ICard[];
        past: ICard[];
    }
    player2: {
        hand: ICard[];
        past: ICard[];
    },
    cardOntable?: ICard;
}

interface ICard {
    name: string;
    strength: number;
    flavorText1: string;
}
