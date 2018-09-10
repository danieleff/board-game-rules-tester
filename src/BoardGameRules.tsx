import { IGame, IActions } from "./BoardGame";

export interface IAction<GAME extends IGame, CHANGE> {
    name: string;
    game: GAME;
    change?: CHANGE;
}
export abstract class BoardGameRules<GAME extends IGame, CHANGE = any> {

    private actions: IAction<GAME, CHANGE>[];

    protected game: GAME;

    abstract getStartGame(): GAME;

    abstract createActions(): void;

    abstract getWinner(): number | undefined;

    setGame(game: GAME) {
        this.game = game;
    }

    clearActions() {
        this.actions = [];
    }

    addAction(name: string, game: GAME, change?: CHANGE) {
        this.actions.push({
            name, game, change
        });
    }

    getActionList() {
        return this.actions;
    }

}
