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
dummyPlay('J', 'Spades', 'K', 'Spades', 'Clubs'); // true
dummyPlay('J', 'Spades', 'K', 'Spades', 'Spades'); // true
dummyPlay('J', 'Spades', 'K', 'Hearts', 'Clubs'); // false
dummyPlay('J', 'Spades', 10, 'Clubs', 'Clubs'); // true
dummyPlay('J', 'Clubs', 10, 'Clubs', 'Clubs'); // false
dummyPlay('J', 'Spades', 10, 'Hearts', 'Clubs'); // false
dummyPlay('J', 'Diamonds', 'J', 'Hearts', 'Hearts'); // true

const dealCards = (cardsPack, quantityOfCards) => {
    let player1 = [];
    let player2 = [];
    let startDealing = (cardsPack, cardsQuantity) => {
        if (player1.length >= 2 && player2.length >= 2) {
            return cardsPack;
        }
        let randomCard1 = Math.floor(Math.random() * cardsQuantity);
        player1.push(cardsPack[randomCard1]);
        let reducedPack = cardsPack.filter(card => card !== cardsPack[randomCard1]);
        let randomCard2 = Math.floor(Math.random() * (cardsQuantity - 1));
        player2.push(reducedPack[randomCard2]);
        let moreReducedPack = reducedPack.filter(card => card !== cardsPack[randomCard2]);
        return startDealing(moreReducedPack, cardsQuantity - 2);
    }
    let finalReducedPack = startDealing(cardsPack, quantityOfCards);
    console.log(player1);
    console.log(player2);
    console.log(finalReducedPack);
}

let cards = [{level: 10, suit: 'spades'}, {level: 8, suit: 'clubs'}, {level: 9, suit: 'spades'},
    {level: 7, suit: 'hearts'}, {level: 'J', suit: 'spades'}, {level: 'J', suit: 'clubs'}, {level: '8', suit: 'hearts'}]
