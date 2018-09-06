import * as bg from 'board-game-rules-tester';
/*
export function start(): ICardGame {

    const deck = bg.shuffle(bg.copy(cards));

    return {
        playerCount: 2,
        currentPlayer: 1,
        deck: deck,
        player1: {hand: bg.pickMany(deck, 3), past: []},
        player2: {hand: bg.pickMany(deck, 3), past: []}
    }
};

export function getActions(game: ICardGame, actions: IActions) {
    const player = (game.currentPlayer == 1) ? game.player1 : game.player2;

    for(let i = 0; i < player.hand.length; i++) {
        const copy = bg.copy(game);

        if (game.currentPlayer == 1) {
            
            copy.cardOntable = copy.player1.hand[i];
            copy.player1.hand.splice(i, 1);
            
            const newCard = bg.pickOne(copy.deck);
            if (newCard) copy.player1.hand.push(newCard);
            
            copy.currentPlayer = 2;

            actions.add(game.currentPlayer + ". player puts on table: " + player.hand[i].name, copy);
        } else {

            if (copy.cardOntable && copy.cardOntable.strength > copy.player2.hand[i].strength) {
                copy.player1.past.push(copy.cardOntable);
                copy.player1.past.push(copy.player2.hand[i]);
            } else if (copy.cardOntable) {
                copy.player2.past.push(copy.cardOntable);
                copy.player2.past.push(copy.player2.hand[i]);
            }

            copy.cardOntable = undefined;
            copy.player2.hand.splice(i, 1);

            const newCard = bg.pickOne(copy.deck);
            if (newCard) copy.player2.hand.push(newCard);

            copy.currentPlayer = 1;

            actions.add(game.currentPlayer + ". player puts on table: " + player.hand[i].name, copy);
        }

  }

};

export function getWinner(game: ICardGame) {
  if (game.player1.hand.length > 0 || game.player2.hand.length > 0) return null;

  const player1Points = game.player1.past.map(card => card.strength).reduce((a, b) => a + b, 0);
  const player2Points = game.player1.past.map(card => card.strength).reduce((a, b) => a + b, 0);

  return (player1Points > player2Points) ? 1 : 2;
}

const cards: ICard[] = [
    {name: "Kitty", strength: 4, flavorText1: "Eats"},
    {name: "Sleepy", strength: 2, flavorText1: "Sleeps"},
    {name: "Killer", strength: 6, flavorText1: "Kills"},

    {name: "Normal", strength: 2, flavorText1: "Does everything"},
    {name: "Grumpy", strength: 9, flavorText1: "Grrr..."},
    {name: "Happy", strength:  3, flavorText1: ":D"},

    {name: "Sneezy", strength:  5, flavorText1: "Achoo"},
    {name: "Lala", strength:  1, flavorText1: "hmm..."},
]
*/