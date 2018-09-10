import * as React from 'react';
import * as bg from 'board-game-rules-tester';
import Rules from './Rules';
import { IDrag, IChange } from '.';
import { IDragState, SVGBoard, SVGDraggable, SVGDropzone } from 'board-game-rules-tester';

interface IRendererState {
    dragId?: any
}

export default class Renderer extends bg.BoardGameRenderer<Rules, IDrag, IRendererState, IChange> {

    constructor(props: any) {
        super(props);

        this.state = {};
    }

    private onDragStateChange(dragState: IDragState) {
        if (this.state.dragId !== dragState.id) {
            this.setState({dragId: dragState.id});
        }
    }

    render() {
        return <SVGBoard width={700} 
                    height={500} 
                    onDragStateChange={this.onDragStateChange.bind(this)}
                    onAction={this.props.onAction}
                    >
                    <defs>
                        <linearGradient id="color-gradient-gold">
                            <stop offset="0%" stop-color="hsl(50, 70%, 50%)"/>
                            <stop offset="100%" stop-color="hsl(60, 90%, 70%)"/>
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id="color-gradient-wood">
                            <stop offset="0%" stop-color="#735337"/>
                            <stop offset="100%" stop-color="#CF9663"/>
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id="color-gradient-steel">
                            <stop offset="0%" stop-color="#2E486E"/>
                            <stop offset="100%" stop-color="#88C4FF"/>
                        </linearGradient>
                    </defs>
                    {/*
                <rect 
                  x="0" y="0" width="700" height="500" fill="#ddd" rx="5"
                />
                    */}

                <image 
                x="0" y="0" width="700" height="500"
                href="https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&h=500&w=700"
                 />

                <rect 
                  x="50" y="280" width="430" height="70" fill="white"
                />

                <rect 
                  x="50" y="380" width="430" height="70" fill="white"
                />

                {this.renderTiles()}
                {this.renderPlayers()}
                {this.renderPlayerHouses()}
            </SVGBoard>
    }

    private renderTiles() {
        const tiles = [];
        for(var y=0; y<this.props.game.board.length; y++) {
            for(var x=0; x<this.props.game.board[y].length; x++) {
                const tile = this.props.game.board[y][x];
                tiles.push(
                    <SVGDropzone key={x + " " + y} 
                        actionIdOnDrop={this.getActionIdOnDrop(this.state.dragId, x, y)}
                        >
                        <image 
                            x={50 + x * 110} 
                            y={50 + y * 110}
                            width="100" 
                            height="100" 
                            preserveAspectRatio="xMidYMid slice"
                            href="https://images.pexels.com/photos/1092364/pexels-photo-1092364.jpeg?auto=compress&cs=tinysrgb&h=100&w=100"
                        />
                        <rect className="box"
                            x={50 + x * 110} 
                            y={50 + y * 110}
                            width="100" 
                            height="100" 
                            fill="none"
                            stroke="black"/>
                            {
                                tile.wood
                                ?
                                <g>
                                    <text x={65 + x * 110} y={70 + y * 110} textAnchor="middle" fill="white" stroke="black">{tile.wood}</text>
                                    <Wood x={65 + x * 110} y={90 + y * 110} />
                                </g>
                                :
                                null
                            }
                            {
                                tile.stone
                                ?
                                <g>
                                    <text x={100 + x * 110} y={70 + y * 110} textAnchor="middle" fill="white" stroke="black">{tile.stone}</text>
                                    <Steel x={100 + x * 110} y={90 + y * 110} />
                                </g>
                                :
                                null
                            }
                            {
                                tile.gold
                                ?
                                <g>
                                    <text x={135 + x * 110} y={70 + y * 110} textAnchor="middle" fill="white" stroke="black">{tile.gold}</text>
                                    <Gold x={135 + x * 110} y={90 + y * 110} />
                                </g>
                                :
                                null
                            }

                    </SVGDropzone>
                );
            }
        }
        return tiles;
    }

    private renderPlayers() {
        return this.props.game.players.map((p, i) => {
            return <g>
                
                <text x={60 + 210} y={310 + i * 100} textAnchor="middle" >{p.wood}</text>
                <Wood x={60 + 210} y={330 + i * 100} />

                <text x={100 + 210} y={310 + i * 100} textAnchor="middle" >{p.stone}</text>
                <Steel x={100 + 210} y={330 + i * 100} />

                <text x={140 + 210} y={310 + i * 100} textAnchor="middle" >{p.gold}</text>
                <Gold x={140 + 210} y={330 + i * 100} />
            </g>
        });
    }

    private renderPlayerHouses() {
        return this.props.game.players.map((p, pIndex) => {
            return p.houses.map((h, hIndex) => {
                var x,y;
                if (h.pos == "player") {
                    x = 50 + hIndex * 60;
                    y = 300 + pIndex * 100;
                } else {
                    x = 80 + h.x * 110;
                    y = 100 + h.y * 110;
                }
                return <SVGDraggable x={x} y={y} id={{pIndex, hIndex}} key={pIndex + " " + hIndex} active={pIndex == this.props.game.currentPlayer}>

                    <polygon 
                        points="5,10 20,0 35,10 30,10 30,30 10,30 10,10"
                        fill={`hsl(${80 * pIndex}, 60%, 40%)`}
                        stroke="white"
                    />
                </SVGDraggable>
            })
        })
    }
    
    private getActionIdOnDrop(dragId: any, x: number, y: number) {
        if (!dragId) return undefined;

        for(var i = 0; i < this.props.actions.length; i++) {
            const action = this.props.actions[i];
            const change = action.change!;

            if (change.houseIndex == dragId.hIndex && 
                change.playerIndex == dragId.pIndex && 
                change.newPosition.pos == "board" &&
                change.newPosition.x == x && 
                change.newPosition.y == y) {
                return i;
            }
        }
        return undefined;
    }

}


function Wood(props: {x: number, y: number}) {
    return <polygon transform={`translate(${props.x}, ${props.y})`} points="-7,-3 7,-3 10,3 -10,3" fill="url(#color-gradient-wood)"stroke="#333" stroke-width="0.5"/>;
}

function Steel(props: {x: number, y: number}) {
    return <g transform={`translate(${props.x}, ${props.y})`} >
        <polygon points="-7,-3 7,-3 10,5 -10,5" fill="url(#color-gradient-steel)"stroke="#333" stroke-width="0.5" />
        <line x1="-6" y1="-2" x2="-9" y2="4" fill="none" stroke="white" stroke-linecap="round" />
        </g>
}

function Gold(props: {x: number, y: number}) {
    return <circle cx={props.x} cy={props.y} r="9" fill="url(#color-gradient-gold)" stroke="#333" stroke-width="0.5"/>;
}