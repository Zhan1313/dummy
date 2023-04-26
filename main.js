'use strict';
import { dummyPlay } from "./comparison";
import { player1Elem, player2Elem, playFieldElem, mainDeckElem, finishedCardsElem,
    beatenButtonElem, getMoreCardsButtonElement } from "./DOM_elements";
import {finishedCards} from "./deal_cards";

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
const getPlayer1AttackCard = (player1Deck, index) => {
    let player1AttackCard = player1Deck.filter(card => card === player1Deck[index])[0];
    console.log('this is attacking card', player1AttackCard);
    return player1AttackCard;
}
const checkPlayFieldCardsLevels = (playField, player1AttackCard) => {
    return !!playField.find(playFieldCard => playFieldCard.level === player1AttackCard.level);
}
const canPutCardOnPlayField = (playField, player1AttackCard) => {
    return playField.length === 0 || checkPlayFieldCardsLevels(playField, player1AttackCard);
}
const getUpdatedPlayer1Deck = (player1Deck, index) => {
    let player1DeckArray = player1Deck.filter(card => card !== player1Deck[index]);
    console.log('this is updated Player1Deck', player1DeckArray);
    return player1DeckArray;
}
const removeCardImage = (cardImgElem) => {
    cardImgElem.remove();
}
const addCardToPlayField = (playField, attackOrDefenceCard) => {
    playField.push(attackOrDefenceCard);
    console.log('this is cards on playField', playField);
    console.log('playField =================');
}
const addCardImageToPlayField = (cardImage) => {
    playFieldElem.insertAdjacentHTML('afterbegin',
        `<img src="./assets/${cardImage.level}${cardImage.suit}.png" 
                    alt="${cardImage.level}${cardImage.suit}"/>`);
}
const disableBitoButton = (trueOrFalse) => {
    beatenButtonElem.disabled = trueOrFalse;
}

const getPlayer2DefenceCard = (player2Deck, index) => {
    let player2DefenceCard = player2Deck.filter(card => card === player2Deck[index])[0];
    console.log('this is defendCard of player2', player2DefenceCard);
    return player2DefenceCard;
}
const getUpdatedPlayer2Deck = (player2Deck, index) => {
    let player2DeckArray = player2Deck.filter(card => card !== player2Deck[index]);
    console.log('this is updated Player2Deck', player2DeckArray);
    return player2DeckArray;
}
const addCardImageToPlayer2 = (playField, index) => {
    player2Elem.insertAdjacentHTML('beforeend',
        `<img src="./assets/${playField[index].level}${playField[index].suit}.png" 
                            alt="${playField[index].level}${playField[index].suit}"/>`);
}

const defenceStepOfComputer = (player1AttackCard, player2Deck, playField) => {
    setTimeout(() => {
        for (let j = 0; j < player2Deck.length; j++) {
            let player2IsBigger = dummyPlay(player1AttackCard.level, player1AttackCard.suit,
                player2Deck[j].level, player2Deck[j].suit, masterSuit.suit);
            console.log('player2 wins?', player2IsBigger);
            console.log('====', j);

            if (player2IsBigger === true) {
                let player2DefenceCard = getPlayer2DefenceCard(player2Deck, j);
                let updatedPlayer2Deck = getUpdatedPlayer2Deck(player2Deck, j);
                let pl2CardImgElem = player2Elem.querySelectorAll('img')[j];
                removeCardImage(pl2CardImgElem);
                addCardToPlayField(playField, player2DefenceCard);
                addCardImageToPlayField(player2DefenceCard);
                disableBitoButton(false);
                return updatedPlayer2Deck;
            }
        }
        let playFieldImagesElements = playFieldElem.querySelectorAll('img');

        if (playField.length === 1) {
            player2Deck.push(playField[0]);

            playFieldImagesElements[0].remove();
            addCardImageToPlayer2(playField, 0);

        } else if (playField.length === 3) {
            player2Deck.push(playField[0], playField[1], playField[2]);

            playFieldImagesElements[0].remove();
            playFieldImagesElements[1].remove();
            playFieldImagesElements[2].remove();

            player2Elem.insertAdjacentHTML('beforeend',
                `<img src="./assets/${playField[0].level}${playField[0].suit}.png" 
                            alt="${playField[0].level}${playField[0].suit}"/>, 
                            <img src="./assets/${playField[1].level}${playField[1].suit}.png" 
                            alt="${playField[1].level}${playField[1].suit}"/>, 
                            <img src="./assets/${playField[2].level}${playField[2].suit}.png" 
                            alt="${playField[2].level}${playField[2].suit}"/>`);

        } else if (playField.length === 5) {
            player2Deck.push(playField[0], playField[1], playField[2], playField[3], playField[4]);

            playFieldImagesElements[0].remove();
            playFieldImagesElements[1].remove();
            playFieldImagesElements[2].remove();
            playFieldImagesElements[3].remove();
            playFieldImagesElements[4].remove();

            player2Elem.insertAdjacentHTML('beforeend',
                `<img src="./assets/${playField[0].level}${playField[0].suit}.png" 
                            alt="${playField[0].level}${playField[0].suit}"/>, 
                            <img src="./assets/${playField[1].level}${playField[1].suit}.png" 
                            alt="${playField[1].level}${playField[1].suit}"/>, 
                            <img src="./assets/${playField[2].level}${playField[2].suit}.png" 
                            alt="${playField[2].level}${playField[2].suit}"/>, 
                            <img src="./assets/${playField[3].level}${playField[3].suit}.png" 
                            alt="${playField[3].level}${playField[3].suit}"/>, 
                            <img src="./assets/${playField[4].level}${playField[4].suit}.png" 
                            alt="${playField[4].level}${playField[4].suit}"/>`);
        }

        playField.splice(0);
        console.log('this is updated cards on playField', playField);

        console.log('this is updated player2 cards', player2Deck);
        console.log('========');
        console.log('========');
    }, 2000);
}

const actionOfPlayer1andPlayer2 = (pl1CardImgElem, playField, player2Deck, index, player1Deck) => {
    let player1AttackCard = getPlayer1AttackCard(player1Deck, index);
    if (canPutCardOnPlayField(playField, player1AttackCard)) {
        let updatedPlayer1Deck = getUpdatedPlayer1Deck(player1Deck, index);
        removeCardImage(pl1CardImgElem);
        addCardToPlayField(playField, player1AttackCard);
        addCardImageToPlayField(player1AttackCard);
        disableBitoButton(true);
        defenceStepOfComputer(player1AttackCard, player2Deck, playField);
        return updatedPlayer1Deck;
    } else {
        pl1CardImgElem.className = 'wrongCard';
        return player1Deck;
    }
}

export const dealRealCards = (player1Deck, player2Deck, masterSuit, playField, finishedCards) => {
    for (let i = 0; i < player1Deck.length; i++) {
        dealPlayer1CardImages(player1Deck, i);
        console.log('wats')
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