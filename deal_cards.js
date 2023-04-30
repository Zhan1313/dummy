import { levels, suits } from "./levels_suits";
import { CardsDeck } from "./cardsDeck_Class";

export let masterSuitCard = new CardsDeck();
masterSuitCard.generateCardsDeck(levels, suits);
masterSuitCard.shuffleDeck();
let player1 = [];
let player2 = [];

const dealCards = (player1Deck, player2Deck) => {
    for (let i = 0; i < 6; i++) {
        let topCard = masterSuitCard.takeOneCard();
        masterSuitCard.putOneCard(topCard, player1Deck);
        topCard = masterSuitCard.takeOneCard();
        masterSuitCard.putOneCard(topCard, player2Deck);
    }
    let masterSuit = masterSuitCard.takeOneCard();
    return [player1Deck, player2Deck, masterSuit];
}
const twoPlayersDecks = dealCards(player1, player2);
export let play1Deck = twoPlayersDecks[0];
export let play2Deck = twoPlayersDecks[1];
export let masterSuit = twoPlayersDecks[2];
export let playField = [];
export let finishedCards = [];