'use strict';
import { dummyPlay } from "./comparison";
import { player1Elem, player2Elem, playFieldElem, mainDeckElem, finishedCardsElem,
    beatenButtonElem, getMoreCardsButtonElement } from "./DOM_elements";

const dealPlayer1CardImages = (player1Deck, number) => {
    player1Elem.insertAdjacentHTML('beforeend',
        `<img src="./assets/${player1Deck[number].level}${player1Deck[number].suit}.png" 
                    alt="${player1Deck[number].level}${player1Deck[number].suit}"/>`);
    player1Elem.style.boxShadow = 'antiquewhite';
}
const dealPlayer2CardImages = (player2Deck, number) => {
    player2Elem.insertAdjacentHTML('beforeend',
        `<img src="./assets/${player2Deck[number].level}${player2Deck[number].suit}.png" 
                    alt="${player2Deck[number].level}${player2Deck[number].suit}"/>`);
}

const getPlayer1CardImages = () => {
    return player1Elem.querySelectorAll('img');
}

const getPlayer1AttackCard = (player1Deck, index) => {
    let player1AttackCard = player1Deck.filter(card => card === player1Deck[index])[0];
    console.log('this is attacking card', player1AttackCard);
    return player1AttackCard;
}
const checkPlayFieldCardsLevels = (playField, attackCard) => {
    return !!playField.find(playFieldCard => playFieldCard.level === attackCard.level);
}
const canPutCardOnPlayField = (playField, attackCard) => {
    return playField.length === 0 || checkPlayFieldCardsLevels(playField, attackCard);
}
const getUpdatedPlayer1Deck = (player1Deck, index) => {
    player1Deck.splice(index, 1);
    console.log('this is updated Player1Deck', player1Deck);
}

const removeCardImage = (cardImgElem) => {
    cardImgElem.remove();
}

const addCardToPlayField = (playField, attackOrDefenceCard) => {
    playField.push(attackOrDefenceCard);
    console.log('this is cards on playField', playField);
    console.log('playField =================');
}
const addCardImageToPlayField = (cardImage, playField) => {
    if (playField.length === 3) {
        playFieldElem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${cardImage.level}${cardImage.suit}.png" 
                    alt="${cardImage.level}${cardImage.suit}"/>`);

        let attackCardImgElem = playFieldElem.querySelectorAll('img')[2];

        attackCardImgElem.style.marginLeft = '10px';
    } else if (playField.length === 5) {
        playFieldElem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${cardImage.level}${cardImage.suit}.png" 
                    alt="${cardImage.level}${cardImage.suit}"/>`);

        let attackCardImgElem = playFieldElem.querySelectorAll('img')[4];

        attackCardImgElem.style.marginLeft = '10px';
    } else {
        playFieldElem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${cardImage.level}${cardImage.suit}.png" 
                    alt="${cardImage.level}${cardImage.suit}"/>`);
    }
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
    player2Deck.splice(index, 1);
    console.log('this is updated Player2Deck', player2Deck);
}

const player2TakesUnbeatenCardsFromPlayField = (playField, player2Deck) => {
    if (playField.length === 1) {
        player2Deck.push(playField[0]);
    } else if (playField.length === 3) {
        player2Deck.push(playField[0], playField[1], playField[2]);
    } else if (playField.length === 5) {
        player2Deck.push(playField[0], playField[1], playField[2], playField[3], playField[4]);
    }
    playField.splice(0);
    console.log('this is updated cards on playField', playField);
    console.log('========');
    console.log('========');
}
const player2TakesUnbeatenCardsImagesFromPlayField = (playField, playFieldImagesElements) => {
    if (playField.length === 1) {
        removeCardImage(playFieldImagesElements[0]);

        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${playField[0].level}${playField[0].suit}.png" 
                            alt="${playField[0].level}${playField[0].suit}"/>`);

    } else if (playField.length === 3) {
        removeCardImage(playFieldImagesElements[0]);
        removeCardImage(playFieldImagesElements[1]);
        removeCardImage(playFieldImagesElements[2]);

        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${playField[0].level}${playField[0].suit}.png" 
                            alt="${playField[0].level}${playField[0].suit}"/>, 
                            <img src="./assets/${playField[1].level}${playField[1].suit}.png" 
                            alt="${playField[1].level}${playField[1].suit}"/>, 
                            <img src="./assets/${playField[2].level}${playField[2].suit}.png" 
                            alt="${playField[2].level}${playField[2].suit}"/>`);

    } else if (playField.length === 5) {
        removeCardImage(playFieldImagesElements[0]);
        removeCardImage(playFieldImagesElements[1]);
        removeCardImage(playFieldImagesElements[2]);
        removeCardImage(playFieldImagesElements[3]);
        removeCardImage(playFieldImagesElements[4]);

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
}

const defenceStepOfPlayer2 = (player1AttackCard, player2Deck, playField) => {
    setTimeout(() => {
        for (let j = 0; j < player2Deck.length; j++) {
            let player2IsBigger = dummyPlay(player1AttackCard.level, player1AttackCard.suit,
                player2Deck[j].level, player2Deck[j].suit, masterSuit.suit);
            console.log('player2 wins?', player2IsBigger);
            console.log('====', j);

            if (player2IsBigger === true) {
                let player2DefenceCard = getPlayer2DefenceCard(player2Deck, j);
                getUpdatedPlayer2Deck(player2Deck, j);
                let pl2CardImgElem = player2Elem.querySelectorAll('img')[j];
                removeCardImage(pl2CardImgElem);
                addCardToPlayField(playField, player2DefenceCard);
                addCardImageToPlayField(player2DefenceCard, playField);
                disableBitoButton(false);
                return;
            }
        }
        let playFieldImagesElements = playFieldElem.querySelectorAll('img');
        player2TakesUnbeatenCardsImagesFromPlayField(playField, playFieldImagesElements);

        player2TakesUnbeatenCardsFromPlayField(playField, player2Deck);

        disableBitoButton(true);
        getMoreCardsButtonElement.disabled = false;
    }, 2000);
}

const actionOfPlayer1andPlayer2 = (pl1CardImgElem, playField, player2Deck, index, player1Deck) => {
    let player1AttackCard = getPlayer1AttackCard(player1Deck, index);
    if (canPutCardOnPlayField(playField, player1AttackCard)) {
        getUpdatedPlayer1Deck(player1Deck, index);
        removeCardImage(pl1CardImgElem);
        addCardToPlayField(playField, player1AttackCard);
        addCardImageToPlayField(player1AttackCard, playField);
        disableBitoButton(true);
        defenceStepOfPlayer2(player1AttackCard, player2Deck, playField);
    } else {
        pl1CardImgElem.style.border = '2px solid red';
    }
}

const player1Attack = (pl1CardImgElem, playField, player2Deck, index, player1Deck) => {
    let pl1CardImages = getPlayer1CardImages();
    //console.log(pl1CardImgElem === pl1CardImages.item(i));

    if (pl1CardImgElem === pl1CardImages.item(index)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index, player1Deck);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 1)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 1, player1Deck);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 2)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 2, player1Deck);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 3)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 3, player1Deck);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 4)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 4, player1Deck);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 5)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 5, player1Deck);
    }
}

const dealMoreCardsForPlayers = (player1Deck, playField, player2Deck, masterSuitCard) => {
    for (let i = player1Deck.length; i < 6; i++) {

        let topCard = masterSuitCard.takeOneCard();
        masterSuitCard.putOneCard(topCard, player1Deck);

        player1Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${topCard.level}${topCard.suit}.png"
                    alt="${topCard.level}${topCard.suit}"/>`);

        let pl1NewCardImgElem = player1Elem.querySelectorAll('img')[i];

        pl1NewCardImgElem.addEventListener('click', () => {
            player1Attack(pl1NewCardImgElem, playField, player2Deck, i, player1Deck);
        })
    }
    for (let i = player2Deck.length; i < 6; i++) {

        let topCard = masterSuitCard.takeOneCard();
        masterSuitCard.putOneCard(topCard, player2Deck);

        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${topCard.level}${topCard.suit}.png"
                    alt="${topCard.level}${topCard.suit}"/>`);
    }
    if (masterSuitCard.deck.length === 0) {
        getMoreCardsButtonElement.innerHTML = 'Cards finished';
        getMoreCardsButtonElement.disabled = true;
    }
}

export const dealRealCards = (player1Deck, player2Deck, masterSuit, playField, finishedCards, masterSuitCard) => {
    for (let i = 0; i < player1Deck.length; i++) {
        dealPlayer1CardImages(player1Deck, i);
        console.log('new updated.')
        let pl1CardImgElem = player1Elem.querySelectorAll('img')[i];

        pl1CardImgElem.addEventListener('click', () => {
            player1Attack(pl1CardImgElem, playField, player2Deck, i, player1Deck);
        });
        dealPlayer2CardImages(player2Deck, i);
    }

    mainDeckElem.insertAdjacentHTML('afterbegin',`<img src="./assets/${masterSuit
        .level}${masterSuit.suit}.png" alt="${masterSuit.level}${masterSuit.suit}"/>`);

    beatenButtonElem.addEventListener('click', () => {
        let fieldCardsImgElements = playFieldElem.querySelectorAll('img');

        if (finishedCards.length === 0) {
            finishedCardsElem.insertAdjacentHTML('beforeend',
                `<img src="assets/CardBack.png" alt="CardBack"/>`);
        }

        if (playField.length === 2) {
            finishedCards.push(playField[0], playField[1]);

            fieldCardsImgElements[0].remove();
            fieldCardsImgElements[1].remove();

        } else if (playField.length === 4) {
            finishedCards.push(playField[0], playField[1], playField[2], playField[3]);

            fieldCardsImgElements[0].remove();
            fieldCardsImgElements[1].remove();
            fieldCardsImgElements[2].remove();
            fieldCardsImgElements[3].remove();

        } else if (playField.length === 6) {
            finishedCards.push(playField[0], playField[1], playField[2], playField[3], playField[4], playField[5]);

            fieldCardsImgElements[0].remove();
            fieldCardsImgElements[1].remove();
            fieldCardsImgElements[2].remove();
            fieldCardsImgElements[3].remove();
            fieldCardsImgElements[4].remove();
            fieldCardsImgElements[5].remove();
        }
        playField.splice(0);
        console.log('=======================');
        console.log('this is playField', playField);
        console.log('this is beaten', finishedCards);
        console.log('=======================');

        beatenButtonElem.disabled = true;
        getMoreCardsButtonElement.disabled = false;
    });

    getMoreCardsButtonElement.addEventListener('click', () => {
        dealMoreCardsForPlayers(player1Deck, playField, player2Deck,masterSuitCard);
    })
}