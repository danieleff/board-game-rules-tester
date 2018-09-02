import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App }  from './App';
import './index.css';

window["require"] = (name: string) => {
  switch(name) {
    case 'react': return React;
    default: console.log("Not supported: " + name);
  }
  return null;
}

window["clone"] = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj));
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
