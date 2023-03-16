const dummyPlay = (Card1_Level, Card1_Suit, Card2_Level, Card2_Suit, SuperSuit) => {
    let levels = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (let i = 0; i < levels.length; i++) {
        if (Card1_Level === levels[i]) {
            for(let j = 0; j < levels.length; j++) {
                if(Card2_Level === levels[j]) {
                    if (j > i && Card1_Suit === Card2_Suit) {
                        return true;
                    } else if ((j <= i && Card2_Suit === SuperSuit) && Card1_Suit !== SuperSuit) {
                        return true;
                    }
                    return false;
                }
            }
        }
    }
}

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
const mainDeckElem = middleFieldElem.querySelector('.mainDeck');

const dealCards = (someDeck, player1Deck, player2Deck) => {
    for (let i = 0; i < 6; i++) {
        let topCard = deck.takeOneCard(someDeck);
        deck.putOneCard(topCard, player1Deck);
        topCard = deck.takeOneCard(someDeck);
        deck.putOneCard(topCard, player2Deck);
    }
    let masterSuit = deck.takeOneCard(someDeck);
    return [player1Deck, player2Deck, masterSuit];
}
const twoPlayersDecks = dealCards(shuffledDeck, player1, player2);
let play1Deck = twoPlayersDecks[0];
let play2Deck = twoPlayersDecks[1];
let masterSuitCard = twoPlayersDecks[2];
let playField = [];

const dealRealCards = (player1Deck, player2Deck, masterSuitCard, playField) => {
    for (let i = 0; i < player1Deck.length; i++) {
        player1Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player1Deck[i].level}${player1Deck[i].suit}.png" 
                    alt="${player1Deck[i].level}${player1Deck[i].suit}"/>`);
        let pl1CardImgElem = player1Elem.querySelectorAll('img')[i];

        pl1CardImgElem.addEventListener('click', (e) => {
            let lessCards = player1Deck.filter(card => card !== player1Deck[i]);
            console.log('this is reduced cards of Player1', lessCards)
            console.log('this is chosen card', e.target)
            pl1CardImgElem.remove();
            let cardOnPlay = player1Deck.filter(card => card === player1Deck[i])[0];
            playField.push(cardOnPlay);
            playFieldElem.insertAdjacentHTML('afterbegin',
                `<img src="./assets/${cardOnPlay.level}${cardOnPlay.suit}.png" 
                    alt="${cardOnPlay.level}${cardOnPlay.suit}"/>`);
            console.log('this is cards on playField', playField);
            console.log('this is cards on playField', playFieldElem);
            setTimeout(() => {
                for (let j = 0; j < player2Deck.length; j++) {
                    let player2IsBigger = dummyPlay(player1Deck[i].level, player1Deck[i].suit,
                                                player2Deck[j].level, player2Deck[j].suit, masterSuitCard.suit);
                    console.log('player2 wins?', player2IsBigger);
                    console.log('====', j);
                    if (player2IsBigger === true) {
                        let card2OnPlay = player2Deck.filter(card => card === player2Deck[j])[0];
                        playField.push(card2OnPlay);
                        console.log('this is updated playField cards', playField);
                        let pl2CardImgElem = player2Elem.querySelectorAll('img')[j];
                        pl2CardImgElem.remove();
                        playFieldElem.insertAdjacentHTML('afterbegin',
                            `<img src="./assets/${card2OnPlay.level}${card2OnPlay.suit}.png" 
                                    alt="${card2OnPlay.level}${card2OnPlay.suit}"/>`);
                        return;
                    }
                }
                let fieldPlay1ImgElem = playFieldElem.querySelector('img');
                fieldPlay1ImgElem.remove();
                player2Deck.push(cardOnPlay);
                console.log('this is updated player2 cards', player2Deck);
                player2Elem.insertAdjacentHTML('beforeend',
                    `<img src="./assets/${cardOnPlay.level}${cardOnPlay.suit}.png" 
                            alt="${cardOnPlay.level}${cardOnPlay.suit}"/>`);
            }, 2000);


            /*setTimeout((player2Deck) => {
                playField.push(player2Deck[i]);
                let pl2CardImgElem = player2Elem.querySelectorAll('img')[i];
                pl2CardImgElem.remove();
                playFieldElem.insertAdjacentHTML('afterbegin',
                    `<img src="./assets/${player2Deck[i].level}${player2Deck[i].suit}.png" 
                    alt="${player2Deck[i].level}${player2Deck[i].suit}"/>`);

                    /!*if (player2IsBigger === true) {
                        playField.push(player2Deck[j]);
                        playFieldElem.insertAdjacentHTML('afterbegin',
                            `<img src="./assets/${player2Deck[j].level}${player2Deck[j].suit}.png" 
                                        alt="${player2Deck[j].level}${player2Deck[j].suit}"/>`);
                        let pl2CardImgElem = player2Elem.querySelectorAll('img')[j];
                        pl2CardImgElem.remove();
                        return alert('hey');
                    }*!/
                }*!/

            }, 2000)*/
        })
        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player2Deck[i].level}${player2Deck[i].suit}.png" 
                    alt="${player2Deck[i].level}${player2Deck[i].suit}"/>`);
    }
    mainDeckElem.insertAdjacentHTML('afterbegin',`<img src="./assets/${masterSuitCard
        .level}${masterSuitCard.suit}.png" alt="${masterSuitCard.level}${masterSuitCard.suit}"/>`)
}

dealRealCards(play1Deck, play2Deck, masterSuitCard, playField);

