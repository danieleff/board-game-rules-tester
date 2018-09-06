import { IGame, IActions } from "./BoardGame";

export interface IAction<T extends IGame> {
    name: string;
    game: T;
}
export abstract class BoardGameRules<T extends IGame> {

    private actions: IAction<T>[];

    abstract start(): T;

    abstract getActions(game: T): void;

    abstract getWinner(game: T): number | undefined;

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
