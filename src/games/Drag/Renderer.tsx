import * as React from 'react';
import * as bg from 'board-game-rules-tester';
import { IDrag } from '.';
import Rules from './Rules';

interface IDragState {
    id?: string;
    x: number;
    y: number;
    dropActionId?: number;
    setDragId?: (id: string, x: number, y: number) => void;
    setDropActionId?: (id?: number) => void;
}

interface IRendererState {
    dragState: IDragState
}


const DropContext = React.createContext<IDragState>({x: 0, y: 0});


export default class Renderer extends bg.BoardGameRenderer<Rules, IDrag, IRendererState> {

    constructor(props: any) {
        super(props);

        this.state = {
            dragState: {
                x: 0, 
                y: 0,
                setDragId: this.setDragId.bind(this),
                setDropActionId: this.setDropActionId.bind(this)
            }
        };
    }

    onMouseUp() {
        if (typeof this.state.dragState.dropActionId !== 'undefined') {
            this.props.onAction(this.state.dragState.dropActionId);
        }
        this.setState({
            dragState: {
                x: 0, 
                y: 0, 
                setDragId: this.setDragId.bind(this),
                setDropActionId: this.setDropActionId.bind(this)
            }
        });
    }

    setDragId(dragId: string, x: number, y: number) {
        this.setState({
            dragState: {
                id: dragId, 
                x: x, 
                y: y, 
                setDragId: this.setDragId.bind(this),
                setDropActionId: this.setDropActionId.bind(this)
            }
        });
    }

    setDropActionId(dropActionId?: number) {
        if (this.state.dragState.dropActionId !== dropActionId) {
            
            this.state.dragState.dropActionId = dropActionId;
            this.setState({
                dragState: this.state.dragState
            });
        }
    }

    onMouseMove(event: any) {
        if (this.state.dragState) {

            const coord = getSvgCoordinate(this.refs.svg as SVGSVGElement, event.clientX, event.clientY);

            this.state.dragState.x = coord.x;
            this.state.dragState.y = coord.y;

            this.setState({
                dragState: this.state.dragState
            })
        }
    }

    render() {
        return <DropContext.Provider value={this.state.dragState}>
            <svg ref="svg" viewBox="0 0 700 500"  
                    onMouseMove={this.onMouseMove.bind(this)}
                    onMouseUp={this.onMouseUp.bind(this)}
                    onDragStart={(e) => {e.preventDefault(); return false;}}
                    >
                {
                    this.props.game.tokens.map((token, index) => {
                        return <Dropzone actionIdOnDrop={this.getActionIdOnDrop(index, this.state.dragState.id)}>
                                <rect className="box" key={index} x={50 + index * 100} y="50" width="80" height="80" fill="#eee" stroke="white" strokeDasharray="10" />
                            </Dropzone>
                    })
                }
                {
                    this.props.game.tokens.map((token, index) => {
                        if (!token) return null;
                        return <Draggable x={70 + index * 100} y={70} id={"" + index} key={index}>
                                <rect width="40" height="40" fill="hsl(30, 70%, 35%)" stroke="white"/>
                            </Draggable>
                    })
                }
                {
                    this.state.dragState.id
                    ?
                    <use href={"#" + this.state.dragState.id} style={{pointerEvents: "none"}} />
                    :
                    null
                }
            </svg>
        </DropContext.Provider>
    }
    
    private getActionIdOnDrop(index: number, dragging?: string) {
        for(var i = 0; i < this.props.actions.length; i++) {
            const action = this.props.actions[i];

            if (!this.props.game.tokens[index] && action.game.tokens[index] && dragging && (!action.game.tokens[dragging])) {
                return i;
            }
        }
        return undefined;
    }

}

interface IDraggableProps {
    x: number;
    y: number;
    id: string;
}

interface IDraggableState {
    offsetX: number;
    offsetY: number;
    
    width: number;
    height: number;
}

class Draggable extends React.Component<IDraggableProps, IDraggableState> {

    private g: SVGGElement;

    constructor(props: IDraggableProps) {
        super(props);

        this.state = {
            offsetX: 0,
            offsetY: 0,
            width: 0,
            height: 0
        }
    }

    render() {
        return <DropContext.Consumer>
                {(dragState) => {
                    var className = "";

                    var x = this.props.x;
                    var y = this.props.y;
                    var scale = 1;
                    var style: React.CSSProperties = {};

                    if (dragState.id == this.props.id) {
                        x = dragState.x + this.state.offsetX;
                        y = dragState.y + this.state.offsetY;
                        var scale = 1;
                        className = "available mouse-passthrough";
                    } else if (dragState.id) {
                        className = "";
                    } else {
                        className = "available";
                    }

                    const g = <g 
                            id={this.props.id}
                            ref={(g) => this.g = g!}
                            transform={`translate(${x}, ${y})  
                                translate(${-this.state.width}, ${-this.state.height}) 
                                scale(${scale}) 
                                translate(${this.state.width}, ${this.state.height}) `} 
                            className={className}
                            onMouseDown={(e) => this.onMouseDown(e, dragState)}
                            style={style}
                            >
                        {this.props.children}
                    </g>
                    if (dragState.id == this.props.id) {
                        return <symbol>{g}</symbol>;
                    } else {
                        return g;
                    }
                }
                }
            </DropContext.Consumer>;
    }

    componentDidMount() {
        const g: SVGGElement = this.g as SVGGElement;
        const gScreenPos = g.getBoundingClientRect();
        const gSvgTopLeft = getSvgCoordinate(g.ownerSVGElement!, gScreenPos.left, gScreenPos.top);
        const gSvgBottomRight = getSvgCoordinate(g.ownerSVGElement!, gScreenPos.right, gScreenPos.bottom);
        this.setState({
            width: gSvgBottomRight.x - gSvgTopLeft.x,
            height: gSvgBottomRight.y - gSvgTopLeft.y,
        })
    }

    onMouseDown(e: any, dragState: IDragState) {
        const g: SVGGElement = this.g as SVGGElement;

        const gScreenPos = g.getBoundingClientRect();

        const gSvgPos = getSvgCoordinate(g.ownerSVGElement!, gScreenPos.left, gScreenPos.top);

        const mouseSvgPos = getSvgCoordinate(g.ownerSVGElement!, e.clientX, e.clientY);

        this.setState({
            offsetX: gSvgPos.x - mouseSvgPos.x,
            offsetY: gSvgPos.y - mouseSvgPos.y
        })

        if (dragState.setDragId) {
            dragState.setDragId(this.props.id, mouseSvgPos.x, mouseSvgPos.y);
        }
    }

}


const Dropzone = React.forwardRef((props: {actionIdOnDrop?: number}, ref) => (
    <DropContext.Consumer>
        {dragState => <Dropzone2 dragState={dragState} {...props}/>}
    </DropContext.Consumer>
));

class Dropzone2 extends React.Component<{dragState: IDragState, actionIdOnDrop?: number}, {hover: boolean}> {

    private g: SVGGElement;

    constructor(props: any) {
        super(props);

        this.state = {
            hover: false
        }
    }

    render() {
        return <g ref={(g) => this.g = g!} 
                className={typeof this.props.actionIdOnDrop !== 'undefined' && this.state.hover ? "dropzone" : ""}
                onMouseOver={() => {
                    this.setState({hover: true}); 
                    if (this.props.dragState.setDropActionId) this.props.dragState.setDropActionId(this.props.actionIdOnDrop)}
                }
                onMouseOut={() => {
                    this.setState({hover: false}); 
                    if (this.props.dragState.setDropActionId) this.props.dragState.setDropActionId(undefined)}
                }
                >
            {this.props.children}
        </g>
    }

}

function getSvgCoordinate(svg: SVGSVGElement, x: number, y: number) {
    const p = svg.createSVGPoint();
    p.x = x;
    p.y = y;
    return p.matrixTransform(svg.getScreenCTM()!.inverse());
}
