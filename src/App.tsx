import * as React from 'react';
import { BoardGameRulesComponent } from './component/BoardRulesComponent';
import { BoardGameRenderedComponent } from './component/BoardRenderComponent';
import SplitPane from 'react-split-pane';

import './App.css';
import './splitpane.css';
import { compileString } from './utils/Compiler';
import { BoardGameRenderer } from './BoardGameRenderer';
import { IGame } from './BoardGame';
import { BoardGameRules, IAction } from './BoardGameRules';

interface IAppProps {

}

interface IAppState {
  game?: IGame;
  actions: IAction<IGame>[];

  indexString: string,

  rulesString: string;
  rules?: BoardGameRules<IGame>;

  rendererString: string;
  renderer?: {new(): BoardGameRenderer};

  styleString: string;
}

export class App extends React.Component<IAppProps, IAppState> {

  private styleElement: HTMLStyleElement;

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      indexString: require(`!raw-loader!./games/Drag/index.d.ts`),
      rulesString: require(`!raw-loader!./games/Drag/Rules.tsx`),
      rendererString: require(`!raw-loader!./games/Drag/Renderer.tsx`),
      styleString: require(`!raw-loader!./games/Drag/style.css`),

      actions: []
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
      const rulesClass = compileString<{default: {new(): BoardGameRules<IGame>}}>(this.state.rulesString);

      if (rulesClass) {
        const rules = new rulesClass.default();
        this.setState({rules: rules});
      }
    }

    if (!prevState || prevState.rendererString != this.state.rendererString) {
      const renderer = compileString<{default: {new(): BoardGameRenderer}}>(this.state.rendererString);
      if (renderer) {
        this.setState({renderer: renderer.default});
      }
    }

    if (!this.state.game && this.state.rules) {
      this.onRestart();
      
    }
  }

  private getActions(game: IGame, rules: BoardGameRules<IGame>) {
    rules.clearActions();
    rules.getActions(game);
    return rules.getActionList();
  }

  private onIndexStringChange(indexString: string) {
    this.setState({indexString});
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
      const newGame = this.state.actions[actionIndex].game;

      const winner = this.state.rules.getWinner(newGame);

      newGame.winner = winner || undefined;

      var actions: IAction<IGame>[];

      if (!newGame.winner) {
        actions = this.getActions(newGame, this.state.rules);
      } else {
        actions = [];
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
        
        rendered = React.createElement((this.state.renderer), {
            game: this.state.game,
            actions: this.state.actions,
            onAction: this.onAction.bind(this)
          }
        );
        console.log(rendered);
      } catch(e) {console.error(e)} 
    }

    return (
      <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", alignItems: "center", backgroundColor: "#2e2e2e"}}>
          <h3 style={{flex: "1", margin: "0.5em"}}>Board Game Rules Tester</h3>
          <div style={{margin: "1em"}}>
            <button onClick={this.onRestart.bind(this, this.state.rules)}>Restart game</button>
          </div>
        </div>

        <div style={{flex: 1, position: "relative", height: "100%"}}>
          <SplitPane split="vertical" defaultSize="50%">
            <BoardGameRulesComponent
                indexString={this.state.indexString}
                rulesString={this.state.rulesString}
                rendererString={this.state.rendererString}
                styleString={this.state.styleString}
                onIndexStringChange={this.onIndexStringChange.bind(this)}
                onRulesStringChange={this.onRulesStringChange.bind(this)}
                onRendererStringChange={this.onRendererStringChange.bind(this)}
                onStyleStringChange={this.onStyleStringChange.bind(this)}
              />
            <BoardGameRenderedComponent
                  game={this.state.game}
                  actions={this.state.actions}
                  onAction={this.onAction.bind(this)}
            >
              {rendered}
            </BoardGameRenderedComponent>
          </SplitPane>
        </div>
      </div>
    );
  }
}
