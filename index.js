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
        let shuffledDeck = [];
        let startShuffling = (decks, cardsQuantity) => {
            if (decks.length < 1) {
                return;
            }
            let r = Math.floor(Math.random() * cardsQuantity);
            shuffledDeck.push(decks[r]);
            let reducedDeck = decks.filter(card => card !== decks[r])
            startShuffling(reducedDeck, cardsQuantity - 1)
        }
        startShuffling(deck, 36)
        return shuffledDeck;
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
const middleFieldElem = wrapperElem.querySelector('.middleField');
const playFieldElem = middleFieldElem.querySelector('.playField');

const dealCards = (someDeck, player1Deck, player2Deck) => {
    for (let i = 0; i < 6; i++) {
        let topCard = deck.takeOneCard(someDeck);
        deck.putOneCard(topCard, player1Deck);
        topCard = deck.takeOneCard(someDeck);
        deck.putOneCard(topCard, player2Deck);
    }
    return [player1Deck, player2Deck];
}
const twoPlayersDecks = dealCards(shuffledDeck, player1, player2);
let play1Deck = twoPlayersDecks[0];
let play2Deck = twoPlayersDecks[1];

const oneCardOut = (chosenCard, player1Deck) => {
    let lessCards = player1Deck.filter(card => card !== chosenCard);
    dealRealCards(lessCards);
}

const dealRealCards = (player1Deck) => {
    for (let i = 0; i < player1Deck.length; i++) {
        player1Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player1Deck[i].level}${player1Deck[i].suit}.png" 
                    alt="${player1Deck[i].level}${player1Deck[i].suit}"/>`);
        let pl1CardImgElem = player1Elem.querySelectorAll('img')[i];
        pl1CardImgElem.addEventListener('click', (e) => {
            let lessCards = player1Deck.filter(card => card !== player1Deck[i]);
            console.log('this is less now', lessCards)
            console.log(e.target)
            pl1CardImgElem.remove();
            playFieldElem.insertAdjacentHTML('afterbegin', player1Deck[i])
        })
        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/BackSideCard.png" 
                    alt="BackSideCard"/>`);
    }
}

dealRealCards(play1Deck);

const useCard = () => {
    const hitCard = (player1Deck) => {
        let lessCards = player1Deck.filter(card => card !== player1Deck[i]);
        console.log('this is less now', lessCards)
        console.log(e.target)
        pl1CardImgElem.remove();
        hitCard(lessCards)
    }
    hitCard(player1Deck)
}
