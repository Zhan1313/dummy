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
