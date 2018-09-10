import * as React from 'react';
import { isEqual } from 'lodash';

export interface IDragState {
    id?: any;
    x: number;
    y: number;
    dropActionId?: number;
    setDragId?: (id: any, x: number, y: number) => void;
    setDropActionId?: (id?: number) => void;
}

const DropContext = React.createContext<IDragState>({x: 0, y: 0});

interface IBoardProps {
    width: number,
    height: number,
    onDragStateChange: (dragState: IDragState) => void,
    onAction: (actionId: number) => void
}

interface IBoardState {
    dragState: IDragState
}

export class SVGBoard extends React.Component<IBoardProps, IBoardState> {

    constructor(props: any) {
        super(props);

        this.state = {
            dragState: {
                x: 0,
                y: 0,
                setDragId: this.setDragId.bind(this),
                setDropActionId: this.setDropActionId.bind(this)
            }
        }
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
        }, () => this.props.onDragStateChange(this.state.dragState));
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
        }, () => this.props.onDragStateChange(this.state.dragState));
    }

    setDropActionId(dropActionId?: number) {
        if (this.state.dragState.dropActionId !== dropActionId) {
            
            this.setState({
                dragState: {...this.state.dragState, dropActionId: dropActionId}
            }, () => this.props.onDragStateChange(this.state.dragState));
        }
    }

    onMouseMove(event: any) {
        if (this.state.dragState) {

            const coord = getSvgCoordinate(this.refs.svg as SVGSVGElement, event.clientX, event.clientY);

            //this.state.dragState.x = coord.x;
            //this.state.dragState.y = coord.y;

            this.setState({
                dragState: {...this.state.dragState, x: coord.x, y: coord.y}
            }, () => this.props.onDragStateChange(this.state.dragState))
        }
    }

    render() {
        return <DropContext.Provider value={this.state.dragState}>
            <svg ref="svg" viewBox={`0 0 ${this.props.width} ${this.props.height}`}
            onMouseMove={this.onMouseMove.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)}
            onDragStart={(e) => {e.preventDefault(); return false;}}
            >
            {this.props.children}
            {
                this.state.dragState.id
                ?
                <use href={"#" + JSON.stringify(this.state.dragState.id)} style={{pointerEvents: "none"}} />
                :
                null
            }
        </svg>
        </DropContext.Provider>
    }
}

interface IDraggableProps {
    x: number;
    y: number;
    id: any;
    active: boolean;
}

interface IDraggableState {
    offsetX: number;
    offsetY: number;
    
    width: number;
    height: number;
}

export class SVGDraggable extends React.Component<IDraggableProps, IDraggableState> {

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

                    const isDragging = isEqual(dragState.id, this.props.id);

                    if (isDragging) {
                        x = dragState.x + this.state.offsetX;
                        y = dragState.y + this.state.offsetY;
                        var scale = 1;
                        className = "available mouse-passthrough";
                    } else if (dragState.id) {
                        className = "";
                    } else {
                        className = "available";
                    }

                    if (!this.props.active) {
                        className = "";
                    }

                    const g = <g 
                            id={JSON.stringify(this.props.id)}
                            ref={(g) => this.g = g!}
                            transform={`translate(${x}, ${y})`} 
                            className={className}
                            onMouseDown={(e) => this.onMouseDown(e, dragState)}
                            style={style}
                            >
                        {this.props.children}
                    </g>
                    if (isDragging) {
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
        if (!this.props.active) return;
        
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

export const SVGDropzone = React.forwardRef((props: {actionIdOnDrop?: number}, ref) => (
    <DropContext.Consumer>
        {dragState => <SVGDropzoneInternal dragState={dragState} {...props}/>}
    </DropContext.Consumer>
));

class SVGDropzoneInternal extends React.Component<{dragState: IDragState, actionIdOnDrop?: number}, {hover: boolean}> {

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

export function getSvgCoordinate(svg: SVGSVGElement, x: number, y: number) {
    const p = svg.createSVGPoint();
    p.x = x;
    p.y = y;
    return p.matrixTransform(svg.getScreenCTM()!.inverse());
}
