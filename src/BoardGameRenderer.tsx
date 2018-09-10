import * as React from 'react';
import { IGame } from './BoardGame';
import { IAction, BoardGameRules } from './BoardGameRules';

interface IBoardGameRendererProps<RULES extends BoardGameRules<T>, T extends IGame, CHANGE> {
  game: T;
  rules: RULES;
  actions: IAction<T, CHANGE>[];
  onAction: (actionIndex: number) => void;
}

export abstract class BoardGameRenderer<RULES extends BoardGameRules<GAME>, GAME extends IGame = IGame, STATE = {}, CHANGE = any> 
  extends React.Component<IBoardGameRendererProps<RULES, GAME, CHANGE>, STATE> {
    
}
