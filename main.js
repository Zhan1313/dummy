'use strict';
import { dummyPlay } from "./comparison";
import { player1Elem, player2Elem, playFieldElem, mainDeckElem, finishedCardsElem,
    beatenButtonElem, getMoreCardsButtonElement } from "./DOM_elements";

const dealPlayer1CardImages = (player1Deck, number) => {
    player1Elem.insertAdjacentHTML('beforeend',
        `<img src="./assets/${player1Deck[number].level}${player1Deck[number].suit}.png" 
                    alt="${player1Deck[number].level}${player1Deck[number].suit}"/>`);
}
const dealPlayer2CardImages = (player2Deck, number) => {
    player2Elem.insertAdjacentHTML('beforeend',
        `<img src="./assets/${player2Deck[number].level}${player2Deck[number].suit}.png" 
                    alt="${player2Deck[number].level}${player2Deck[number].suit}"/>`);
}

export const dealRealCards = (player1Deck, player2Deck, masterSuit, playField) => {
    for (let i = 0; i < player1Deck.length; i++) {
        player1Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${player1Deck[i].level}${player1Deck[i].suit}.png" 
                    alt="${player1Deck[i].level}${player1Deck[i].suit}"/>`);
        console.log('wat')
        let pl1CardImgElem = player1Elem.querySelectorAll('img')[i];

        pl1CardImgElem.addEventListener('click', () => {
            let player1AttackCard = player1Deck.splice(i, 1)[0];
            console.log('this is Player1Deck', player1Deck);
            console.log('this is attacking card', player1AttackCard);
            console.log('wa')
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