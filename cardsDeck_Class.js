import {Card} from "./card_Class";

export class CardsDeck {
    constructor() {
        this.deck = [];
    }
    generateCardsDeck(levels, suits) {
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < levels.length; j++) {
                this.deck.push(new Card(levels[j], suits[i]));
            }
        }
    }
    shuffleDeck() {
        let shuffledDeck = [];
        let startShuffling = (decks, cardsQuantity) => {
            if (decks.length < 1) {
                return shuffledDeck;
            }
            let r = Math.floor(Math.random() * cardsQuantity);
            shuffledDeck.push(decks[r]);
            let reducedDeck = decks.filter(card => card !== decks[r])
            startShuffling(reducedDeck, cardsQuantity - 1)
        }
        startShuffling(this.deck, this.deck.length);
        this.deck = shuffledDeck;
    }
    takeOneCard() {
        return this.deck.pop()
    }
    putOneCard(oneCard, playerDeck) {
        playerDeck.push(oneCard);
        return playerDeck;
    }
}