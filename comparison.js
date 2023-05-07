import { levels } from "./levels_suits";

export const dummyPlay = (Card1_Level, Card1_Suit, Card2_Level, Card2_Suit, SuperSuit) => {
    for (let i = 0; i < levels.length; i++) {
        if (Card1_Level === levels[i]) {
            for(let j = 0; j < levels.length; j++) {
                if(Card2_Level === levels[j]) {
                    if (j > i && Card1_Suit === Card2_Suit) {
                        return true;
                    } else if (Card2_Suit === SuperSuit && Card1_Suit !== SuperSuit) {
                        return true;
                    }
                    return false;
                }
            }
        }
    }
}
