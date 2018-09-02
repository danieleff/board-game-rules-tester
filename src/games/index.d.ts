declare interface IGame {
    playerCount: number;
    currentPlayer: number;
    winner?: number;
}

declare interface IGameRules {
    start<T extends IGame>(): T;
    getActions<T extends IGame>(game: T, actions: IActions): void;
    getWinner<T extends IGame>(game: T): number | undefined;
}

declare interface IGameRenderer {
    render<T extends IGame>(game: T): JSX.Element;
}

declare interface IActions {
    add<T extends IGame>(name: string, game: T): void;
}

declare function clone<T>(obj: T): T;
