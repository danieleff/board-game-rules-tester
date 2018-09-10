import * as React from 'react';
import { IGame } from '../BoardGame';
import { IAction } from '../BoardGameRules';

interface BoardRenderedProps {
    game?: IGame;
    actions?: IAction<IGame, any>[];
    onAction: (key: number) => void;
}

interface BoardRenderedState {
    
}

export class BoardGameRenderedComponent extends React.Component<BoardRenderedProps, BoardRenderedState> {
    render() {
        return <div style={{height: "100%", width: "100%", overflow: "auto"}}>
            {this.props.children}

            <hr/>
            Actions:
            {
                this.props.actions && this.props.actions.length > 0
                ?
                this.props.actions.map((action, index) => {
                    return <div key={index}>
                        <button onClick={() => this.props.onAction(index)}>
                            {action.name}
                        </button>
                    </div>
                })
                :
                <div>Nincs</div>
            }
            <hr/>
            GameState:
            <pre>{JSON.stringify(this.props.game, null, 4)}</pre>
        </div>;
    }
}
