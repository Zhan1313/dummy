const dummyPlay = (Card1_Level, Card1_Suit, Card2_Level, Card2_Suit, SuperSuit) => {
    let levels = [6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
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
const levels = [6, 7 , 8, 9, 10, 'J', 'Q', 'K', 'A'];

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
    putOneCard = (oneCard) => {
        let pl1 = [];
        pl1.push(oneCard);
        return pl1;
    }
}
const deck = new CardsDeck();
const deck1 = deck.generateCardsDeck(levels, suits);
const shuffledDeck = deck.shuffleDeck(deck1);


const dealCards = (someDeck) => {
    let topCard = deck.takeOneCard(someDeck);
    return deck.putOneCard(topCard);
}




/*dealingCards = (cardsPack) => {
    let player1 = [];
    let player2 = [];
    for (let i = 0; player1.length < 6; i + 2) {
        player1.push(cardsPack[i]);
        player2.push(cardsPack[i + 1]);
    }
    return [player1, player2]
}*/

/*const shuffleDeck = (deck) => {
    let shuffledDeck = [];
    let startShuffling = (deck, cardsQuantity) => {
        if (deck.length < 1) {
            return deck;
        }
        let r = Math.floor(Math.random() * cardsQuantity);
        shuffledDeck.push(deck[r]);
        deck.filter(card => card !== deck[r])
        startShuffling(deck, cardsQuantity - 1)
    }
    startShuffling(deck, 36)
    return shuffledDeck;
}
shuffleDeck(deck1)*/


/*
const dealCards = (cardsPack, quantityOfCards) => {
    let player1 = [];
    let player2 = [];
    let startDealing = (cardsPack, cardsQuantity) => {
        if (player1.length >= 6 && player2.length >= 6) {
            return cardsPack;
        }
        let randomCard1 = Math.floor(Math.random() * cardsQuantity);
        player1.push(cardsPack[randomCard1]);
        let reducedPack = cardsPack.filter(card => card !== cardsPack[randomCard1]);
        let randomCard2 = Math.floor(Math.random() * (cardsQuantity - 1));
        player2.push(reducedPack[randomCard2]);
        let moreReducedPack = reducedPack.filter(card => card !== reducedPack[randomCard2]);
        return startDealing(moreReducedPack, cardsQuantity - 2);
    }
    let finalReducedPack = startDealing(cardsPack, quantityOfCards);
    return player1;
}
dealCards(deck, 36);

const shuffleDeck = (deck) => {
    for (let i = 0; i < deck.length; i++) {
        let r = Math.floor(Math.random() * 36);
        let temp = deck[r];
        deck[r] = deck[i];
        deck[i] = temp;
    }
    return deck;
}*/

/*const generateCardPack = (levels, suits) => {
    let cardPack = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < levels.length; j++) {
            cardPack.push(new Card(levels[j], suits[i]));
        }
    }
    return cardPack;
}*/

/*const generateCardPack = (levels, suits) => {
    let cardPack = [];
    let makePack = (levels, suits, cardsQuantity) => {
        if (levels.length === 0) {
            return;
        }
        let random = Math.floor(Math.random() * cardsQuantity);
        cardPack.push(new Card(levels[random], suits[0]));
        cardPack.push(new Card(levels[random], suits[1]));
        cardPack.push(new Card(levels[random], suits[2]));
        cardPack.push(new Card(levels[random], suits[3]));
        let reducedLevels = levels.filter(level => level !== levels[random]);
        makePack(reducedLevels, suits, cardsQuantity - 1);
    }
    makePack(levels, suits, 8);

    return cardPack;
}*/

/*dummyPlay('J', 'Spades', 'K', 'Spades', 'Clubs'); // true
dummyPlay('J', 'Spades', 'K', 'Spades', 'Spades'); // true
dummyPlay('J', 'Spades', 'K', 'Hearts', 'Clubs'); // false
dummyPlay('J', 'Spades', 10, 'Clubs', 'Clubs'); // true
dummyPlay('J', 'Clubs', 10, 'Clubs', 'Clubs'); // false
dummyPlay('J', 'Spades', 10, 'Hearts', 'Clubs'); // false
dummyPlay('J', 'Diamonds', 'J', 'Hearts', 'Hearts'); // true*/