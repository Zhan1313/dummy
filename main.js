'use strict';
import { dummyPlay } from "./comparison";
import { player1Elem, player2Elem, playFieldElem, mainDeckElem } from "./DOM_elements";

export const welcome = (player1Deck, player2Deck, masterSuit, playField) => {
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
                        player2Deck[j].level, player2Deck[j].suit, masterSuit.suit);
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
