import {Card} from "./card_Class";

export class CardsDeck {
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
    takeOneCard = () => {
        return this.shuffledDeck.pop()
    }
    putOneCard = (oneCard, playerDeck) => {
        playerDeck.push(oneCard);
        return playerDeck;
    }
}