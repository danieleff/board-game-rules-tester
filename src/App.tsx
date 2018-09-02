import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BoardGameRules } from './BoardGameRules';
import { BoardRendered } from './BoardRenderer';
import SplitPane from 'react-split-pane';

import './App.css';
import './splitpane.css';
import { compileString } from './Compiler';
import { Actions } from './Actions';

interface IAppProps {

}

interface IAppState {
  game?: IGame;
  actions?: Actions<IGame>;

  rulesString: string;
  rules?: IGameRules;

  rendererString: string;
  renderer?: IGameRenderer;

  styleString: string;
}

export class App extends React.Component<IAppProps, IAppState> {

  private styleElement: HTMLStyleElement;

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      rulesString: require(`!raw-loader!./games/TicTacToe/Rules.tsx`),
      rendererString: require(`!raw-loader!./games/TicTacToe/Renderer.tsx`),
      styleString: require(`!raw-loader!./games/TicTacToe/style.css`),
    }

    this.styleElement = document.createElement("style");
    document.getElementsByTagName("head")[0].appendChild(this.styleElement);

    this.styleElement.innerText = this.state.styleString;
  }

  componentWillUnmount() {
    if (this.styleElement) {
      this.styleElement.remove();
    }
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate(prevProps: IAppProps, prevState: IAppState) {
    this.update(prevState);
  }

  private update(prevState?: IAppState) {
    if (!prevState || prevState.rulesString != this.state.rulesString) {
      const rules = compileString<IGameRules>(this.state.rulesString);
      this.setState({rules});
    }

    if (!prevState || prevState.rendererString != this.state.rendererString) {
      const renderer = compileString<IGameRenderer>(this.state.rendererString);
      this.setState({renderer});
    }

    if (!this.state.game && this.state.rules) {
      this.onRestart();
      
    }
  }

  private getActions(game: IGame, rules: IGameRules) {
    const actions = new Actions();
    rules.getActions(game, actions);
    return actions;
  }

  private onRulesStringChange(rulesString: string) {
    this.setState({rulesString});
  }

  private onRendererStringChange(rendererString: string) {
    this.setState({rendererString});
  }

  private onStyleStringChange(styleString: string) {
    this.styleElement.innerText = styleString;
    this.setState({styleString});
  }

  private onRestart() {
    if (this.state.rules) {
      const game = this.state.rules.start();
      this.setState({
        game: game,
        actions: this.getActions(game, this.state.rules)
      });
    }
  }

  private onAction(actionIndex: number) {
    if (this.state.actions && this.state.rules) {
      const newGame = this.state.actions.getActionList()[actionIndex].game;

      const winner = this.state.rules.getWinner(newGame);

      newGame.winner = winner || undefined;

      var actions: Actions<IGame>;

      if (!newGame.winner) {
        actions = this.getActions(newGame, this.state.rules);
      } else {
        actions = new Actions();
      }

      this.setState({
        game: newGame,
        actions
      })
    }
  }

  public render() {
    var rendered = null;
    if (this.state.game && this.state.renderer) {

      try {
        rendered = this.state.renderer.render(this.state.game);
      } catch(e) {}
    }

    return (
      <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
        <div>
          <h1>Board Game Rules Tester</h1>
          
          <button onClick={this.onRestart.bind(this, this.state.rules)}>Restart</button>
        </div>

        <div style={{flex: 1, position: "relative", height: "100%"}}>
          <SplitPane split="horizontal" defaultSize="80%">
            <SplitPane split="vertical" defaultSize="50%">
              <BoardGameRules
                  rulesString={this.state.rulesString}
                  rendererString={this.state.rendererString}
                  styleString={this.state.styleString}
                  onRulesStringChange={this.onRulesStringChange.bind(this)}
                  onRendererStringChange={this.onRendererStringChange.bind(this)}
                  onStyleStringChange={this.onStyleStringChange.bind(this)}
                />
              <BoardRendered
                    game={this.state.game}
                    actions={this.state.actions}
                    onAction={this.onAction.bind(this)}
              >
                {rendered}
              </BoardRendered>
            </SplitPane>
            <div>
              Console:...
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }
}
