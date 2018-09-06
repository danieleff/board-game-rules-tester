import { IGame, IActions } from "./BoardGame";

export interface IAction<T extends IGame> {
    name: string;
    game: T;
}
export abstract class BoardGameRules<T extends IGame> {

    private actions: IAction<T>[];

    protected game: T;

    abstract start(): T;

    abstract getActions(): void;

    abstract getWinner(): number | undefined;

    setGame(game: T) {
        this.game = game;
    }

    clearActions() {
        this.actions = [];
    }

    addAction(name: string, game: T) {
        this.actions.push({
            name, game
        });
    }

    getActionList() {
        return this.actions;
    }

}
