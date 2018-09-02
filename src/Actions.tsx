
export interface IAction<T extends IGame> {
    name: string;
    game: T;
}

export class Actions<T extends IGame> {

    private actions: IAction<T>[] = [];

    add(name: string, game: T) {
        this.actions.push({
            name, game
        })
    }

    getActionList() {
        return this.actions;
    }

}
