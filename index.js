import { levels, suits } from "./levels_suits";
import { dummyPlay } from "./comparison";
import { Card } from "./card_Class";


class CardsDeck {
    constructor() {
        this.deck = [];
        this.shuffledDeck = [];
    }
    generateCardsDeck = (levels, suits) => {
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < levels.length; j++) {
                this.deck.push(new Card(levels[j], suits[i]));
            }
        }
    }
    shuffleDeck = () => {
        let startShuffling = (decks, cardsQuantity) => {
            if (decks.length < 1) {
                return;
            }
            let r = Math.floor(Math.random() * cardsQuantity);
            this.shuffledDeck.push(decks[r]);
            let reducedDeck = decks.filter(card => card !== decks[r])
            startShuffling(reducedDeck, cardsQuantity - 1)
        }
        startShuffling(this.deck, this.deck.length)
    }
    takeOneCard = (someDeck) => {
        return someDeck.pop()
    }
    putOneCard = (oneCard, playerDeck) => {
        playerDeck.push(oneCard);
        return playerDeck;
    }
}
const masterSuitCard = new CardsDeck();
masterSuitCard.generateCardsDeck(levels, suits);
masterSuitCard.deck.shuffleDeck();

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
let masterSuit = twoPlayersDecks[2];
let playField = [];

const dealRealCards = (player1Deck, player2Deck, masterSuit, playField) => {
    for (let i = 0; i < player1Deck.length; i++) {
        player1Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player1Deck[i].level}${player1Deck[i].suit}.png" 
                    alt="${player1Deck[i].level}${player1Deck[i].suit}"/>`);

        let pl1CardImgElem = player1Elem.querySelectorAll('img')[i];

        pl1CardImgElem.addEventListener('click', () => {
            let player1AttackCard = player1Deck.splice(i, 1)[0];
            console.log('this is Player1Deck', player1Deck);
            console.log('this is attacking card', player1AttackCard);

            pl1CardImgElem.remove();
            playField.push(player1AttackCard);
            console.log('this is cards on playField', playField);

            playFieldElem.insertAdjacentHTML('afterbegin',
                `<img src="./assets/${player1AttackCard.level}${player1AttackCard.suit}.png" 
                    alt="${player1AttackCard.level}${player1AttackCard.suit}"/>`);

            setTimeout(() => {
                for (let j = 0; j < player2Deck.length; j++) {
                    let player2IsBigger = dummyPlay(player1AttackCard.level, player1AttackCard.suit,
                                                player2Deck[j].level, player2Deck[j].suit, masterSuitCard.suit);
                    console.log('player2 wins?', player2IsBigger);
                    console.log('====', j);

                    if (player2IsBigger === true) {
                        let player2DefenceCard = player2Deck.splice(j, 1)[0];
                        console.log('this is updated player2 cards', player2Deck);
                        console.log('this is defendCard of player2', player2DefenceCard);

                        playField.push(player2DefenceCard);
                        console.log('this is updated playField cards', playField);

                        let pl2CardImgElem = player2Elem.querySelectorAll('img')[j];
                        pl2CardImgElem.remove();
                        playFieldElem.insertAdjacentHTML('afterbegin',
                            `<img src="./assets/${player2DefenceCard.level}${player2DefenceCard.suit}.png" 
                                    alt="${player2DefenceCard.level}${player2DefenceCard.suit}"/>`);
                        return;
                    }
                }
                playField.splice(0, 1);
                console.log('this is updated cards on playField', playField);

                let fieldPlay1ImgElem = playFieldElem.querySelector('img');
                fieldPlay1ImgElem.remove();
                player2Deck.push(player1AttackCard);
                console.log('this is updated player2 cards', player2Deck);

                player2Elem.insertAdjacentHTML('beforeend',
                    `<img src="./assets/${player1AttackCard.level}${player1AttackCard.suit}.png" 
                            alt="${player1AttackCard.level}${player1AttackCard.suit}"/>`);
            }, 2000);
        })
        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player2Deck[i].level}${player2Deck[i].suit}.png" 
                    alt="${player2Deck[i].level}${player2Deck[i].suit}"/>`);
    }
    mainDeckElem.insertAdjacentHTML('afterbegin',`<img src="./assets/${masterSuit
        .level}${masterSuit.suit}.png" alt="${masterSuit.level}${masterSuit.suit}"/>`)
}

dealRealCards(play1Deck, play2Deck, masterSuit, playField);

/*
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
        })
        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player2Deck[i].level}${player2Deck[i].suit}.png"
                    alt="${player2Deck[i].level}${player2Deck[i].suit}"/>`);
    }
    mainDeckElem.insertAdjacentHTML('afterbegin',`<img src="./assets/${masterSuitCard
        .level}${masterSuitCard.suit}.png" alt="${masterSuitCard.level}${masterSuitCard.suit}"/>`)
}*/
