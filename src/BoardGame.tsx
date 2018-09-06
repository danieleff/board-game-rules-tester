export interface IGame {
    playerCount: number;
    currentPlayer: number;
    winner?: number;
}

export interface IActions {
    add<T extends IGame>(name: string, game: T): void;
}
