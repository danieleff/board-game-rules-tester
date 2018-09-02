import * as React from 'react';
import { Actions } from './Actions';

interface BoardRenderedProps {
    game?: IGame;
    actions?: Actions<IGame>;
    onAction: (key: number) => void;
}

interface BoardRenderedState {
    
}

export class BoardRendered extends React.Component<BoardRenderedProps, BoardRenderedState> {
    render() {
        return <div style={{height: "100%", overflow: "auto"}}>
            {this.props.children}

            <hr/>
            Actions:
            {
                this.props.actions && this.props.actions.getActionList().length > 0
                ?
                this.props.actions.getActionList().map((action, index) => {
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
