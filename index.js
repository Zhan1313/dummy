class Card {
    constructor(level, suit) {
        this.level = level;
        this.suit = suit;
    }
}

const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
const levels = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

class CardsDeck {
    generateCardsDeck = (levels, suits) => {
        let cardDeck = [];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < levels.length; j++) {
                cardDeck.push(new Card(levels[j], suits[i]));
            }
        }
        return cardDeck;
    }
    shuffleDeck = (deck) => {
        for (let i = 0; i < deck.length; i++) {
            let r = Math.floor(Math.random() * 36);
            let temp = deck[r];
            deck[r] = deck[i];
            deck[i] = temp;
        }
        return deck;
    }
    takeOneCard = (someDeck) => {
        return someDeck.pop()
    }
    putOneCard = (oneCard, playerDeck) => {
        playerDeck.push(oneCard);
        return playerDeck;
    }
}
const deck = new CardsDeck();
const deck1 = deck.generateCardsDeck(levels, suits);
const shuffledDeck = deck.shuffleDeck(deck1);
let player1 = [];
let player2 = [];

const wrapperElem = document.querySelector('.wrapper');
const player1Elem = wrapperElem.querySelector('.player1');
const player2Elem = wrapperElem.querySelector('.player2');

player1Elem.insertAdjacentHTML('beforeend', '<img src="./assets/6Clubs.png" alt="6C"/>');

const dealCards = (someDeck, player1Deck, player2Deck) => {
    for (let i = 0; i < 6; i++) {
        let topCard = deck.takeOneCard(someDeck);
        deck.putOneCard(topCard, player1Deck);
        topCard = deck.takeOneCard(someDeck);
        deck.putOneCard(topCard, player2Deck);
    }
}
dealCards(shuffledDeck, player1, player2);

const dealRealCards = (player1Deck, player2Deck) => {
    for (let i = 0; i < player1Deck.length; i++) {
        player1Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player1Deck.level}${player1Deck.suit}.png" 
                    alt="${player1Deck.level} ${player1Deck.suit}"/>`);
        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player2Deck.level} ${player2Deck.suit}.png" 
                    alt="${player2Deck.level} ${player2Deck.suit}"/>`);
    }
}
dealRealCards(player1,player2);
