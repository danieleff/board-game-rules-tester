import * as React from 'react';
/*
export function render(game: ICardGame) {
    return <div style={{width: "100%"}}>
        <h3>{game.winner ? "Winner: " + game.winner + ".player" : ""}</h3>
        <h3>{game.currentPlayer}. player turn</h3>

        <div style={{display: "flex"}}>
            <div>
                1. player hand: <br/>
            {
                game.player1.hand.map(c => {
                    return <Card card={c} width="120px"/>
                })
            }
            </div>
            <div style={{margin: "0 0.5em"}}>
                Cards won:
                <div style={{position: "relative", height: "160px"}}>
                {
                    game.player1.past.map((c, index) => {
                        return <div style={{position: "absolute", left: index * 50 + "px"}}>
                                <Card card={c} width="120px"/>
                            </div>
                    })
                }
                </div>
            </div>
        </div>

        <div style={{display: "flex"}}>
            <div>
                2. player hand: <br/>
            {
                game.player2.hand.map(c => {
                    return <Card card={c} width="120px"/>
                })
            }
            </div>
            <div style={{margin: "0 0.5em"}}>
                Cards won:
                <div style={{position: "relative", height: "160px"}}>
                {
                    game.player2.past.map((c, index) => {
                        return <div style={{position: "absolute", left: index * 50 + "px"}}>
                                <Card card={c} width="120px"/>
                            </div>
                    })
                }
                </div>
            </div>
        </div>

        <div>Table: </div>
        {
            game.cardOntable
            ?
            <Card card={game.cardOntable} width="200px"/>
            :
            null
        }

    </div>;
}

function Card(props: {card: ICard, width: string}) {
    return <svg viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg" width={props.width}>
  
        <rect x="1" y="1" width="58" height="88" fill="white" rx="1" />

        <image href="https://media.istockphoto.com/photos/kitten-plays-with-toy-mouse-picture-id157512060" x="1" y="8" width="58" height="55" preserveAspectRatio="xMidYMid slice"/>
    
        <polygon points="1.5,1.5 10,1.5 10,10 1.5,15" className="wrapper" stroke-width="0.5" />
        
        <rect x="10" y="3" width="49" height="7" />
        
        <text x="34" y="8.5" text-anchor="middle" className="text-title">{props.card.name}</text>  
        
        <text x="5.5" y="10" text-anchor="middle" className="text-num">{props.card.strength}</text>  
        
        <rect x="1" y="63" width="58" height="25.5" className="wrapper" />
        
        <text x="30" y="77" text-anchor="middle" className="text-bottom">{props.card.flavorText1}</text>
        <text x="30" y="70" text-anchor="middle" className="text-bottom">Plays</text>
        <text x="30" y="84" text-anchor="middle" className="text-bottom">Kills on sight</text>
        
        <rect x="1" y="1" width="58" height="88" fill="none" stroke="black" rx="1" />
        
    </svg>;
  
}
*/