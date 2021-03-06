import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';

import './BoardRulesComponent.css';

interface BoardGameRulesProps {
    indexString: string;
    rulesString: string;
    rendererString: string;
    styleString: string;
    onIndexStringChange: (indexString: string) => void
    onRulesStringChange: (rulesString: string) => void
    onRendererStringChange: (rendererString: string) => void
    onStyleStringChange: (styleString: string) => void
}

interface BoardGameRulesState {
    tab: "index.d.tsx" | "Rules.tsx" | "Renderer.tsx" | "style.css";
}

export class BoardGameRulesComponent extends React.Component<BoardGameRulesProps, BoardGameRulesState> {

    constructor(props: BoardGameRulesProps) {
        super(props);

        this.state = {
            tab: "Rules.tsx"
        }
    }
    
    private onSelectTab(selectedTab: "index.d.tsx" | "Rules.tsx" | "Renderer.tsx" | "style.css") {
        this.setState({tab: selectedTab});
    }

    render() {
        return <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
            <nav>
                <ul className="rules_tab">
                    <li className={"rules_tab-item " + (this.state.tab == "index.d.tsx" ? "rules_tab-item--is_active" : "")}
                        onClick={this.onSelectTab.bind(this, "index.d.tsx")}>
                        index.d.tsx
                    </li>
                    <li className={"rules_tab-item " + (this.state.tab == "Rules.tsx" ? "rules_tab-item--is_active" : "")}
                        onClick={this.onSelectTab.bind(this, "Rules.tsx")}>
                        Rules.tsx
                    </li>
                    <li className={"rules_tab-item " + (this.state.tab == "Renderer.tsx" ? "rules_tab-item--is_active" : "")}
                        onClick={this.onSelectTab.bind(this, "Renderer.tsx")}>
                        Renderer.tsx
                    </li>
                    <li className={"rules_tab-item " + (this.state.tab == "style.css" ? "rules_tab-item--is_active" : "")}
                        onClick={this.onSelectTab.bind(this, "style.css")}>
                        style.css
                    </li>
                </ul>
            </nav>
            
            <div style={{flex: "1", height: "100%", display: this.state.tab == "index.d.tsx" ? undefined : "none"}}>
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language=""
                    theme="vs-dark"
                    value={this.props.indexString}
                    options={{
                        selectOnLineNumbers: true, 
                        automaticLayout: true
                    }}
                    onChange={(e) => this.props.onIndexStringChange(e)} 
                    />
            </div>
            <div style={{flex: "1", height: "100%", display: this.state.tab == "Rules.tsx" ? undefined : "none"}}>
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language=""
                    theme="vs-dark"
                    value={this.props.rulesString}
                    options={{
                        selectOnLineNumbers: true, 
                        automaticLayout: true
                    }}
                    onChange={(e) => this.props.onRulesStringChange(e)} 
                    />
            </div>
            <div style={{flex: "1", height: "100%", display: this.state.tab == "Renderer.tsx" ? undefined : "none"}}>
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language=""
                    theme="vs-dark"
                    value={this.props.rendererString}
                    options={{
                        selectOnLineNumbers: true, 
                        automaticLayout: true
                    }}
                    onChange={(e) => this.props.onRendererStringChange(e)} 
                    />
            </div>
            <div style={{flex: "1", height: "100%", display: this.state.tab == "style.css" ? undefined : "none"}}>
                <MonacoEditor
                    width="100%"
                    height="100%"
                    language="css"
                    theme="vs-dark"
                    value={this.props.styleString}
                    options={{
                        selectOnLineNumbers: true, 
                        automaticLayout: true
                    }}
                    onChange={(e) => this.props.onStyleStringChange(e)} 
                    />
            </div>
        </div>
        ;
    }
}
