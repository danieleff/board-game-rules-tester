import * as React from 'react';
import { IGame } from './BoardGame';
import { IAction } from './BoardGameRules';

interface IBoardGameRendererProps<T extends IGame> {
  game: T;
  actions: IAction<T>[];
  onAction: (actionIndex: number) => void;
}

export abstract class BoardGameRenderer<T extends IGame = IGame, STATE = {}> 
  extends React.Component<IBoardGameRendererProps<T>, STATE> {
    
}
