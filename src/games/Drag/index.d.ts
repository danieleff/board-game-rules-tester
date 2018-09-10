import { IGame } from "board-game-rules-tester";

/**
 * Game state. 
 * Every possibility in the game must be represented by this game state type
 */

export interface IDrag extends IGame {
    board: ITile[][];
    players: IPlayer[];
}

type ITile = {
    wood?: number;
    stone?: number;
    gold?: number;
}

type IPlayer = {
    wood: number;
    stone: number;
    gold: number;
    houses: IHousePosition[];
}

type IHousePosition = 
    {pos: "player"} | 
    {pos: "board", x: number, y: number}

export type IChange = 
    {playerIndex: number, houseIndex: number, newPosition: IHousePosition}
