import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App }  from './App';
import './index.css';

import * as thisModule from '.';


export * from './BoardGame';

export * from './BoardGameRenderer';

export * from './BoardGameRules';

export * from './component/SVGBoard';

export * from './utils/Utils';


window["require"] = (name: string) => {
  switch(name) {
    case 'react': return React;
    case 'board-game-rules-tester': return thisModule;
    default: console.log("Unknown module: " + name);
  }
  return null;
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
