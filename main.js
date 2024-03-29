'use strict';
import { dummyPlay } from "./comparison";
import { player1Elem, player2Elem, playFieldElem, mainDeckElem, finishedCardsElem,
    beatenButtonElem, getMoreCardsButtonElement, pl1OuterElem, pl1TurnElem } from "./DOM_elements";

const getCardImagesOfBlock = (blockElem) => {
    return blockElem.querySelectorAll('img');
}

const getAttackingOrDefendingCard = (playerDeck, index) => {
    let playerAttackingOrDefendingCard = playerDeck.filter(card => card === playerDeck[index])[0];
    console.log('this is attacking or defending card', playerAttackingOrDefendingCard);
    return playerAttackingOrDefendingCard;
}

const getUpdatedDeckOfBlock = (blockDeck, index) => {
    blockDeck.splice(index, 1);
}

const checkPlayFieldCardsLevels = (playField, attackCard) => {
    return !!playField.find(playFieldCard => playFieldCard.level === attackCard.level);
}
const canPutCardOnPlayField = (playField, attackCard) => {
    return playField.length === 0 || checkPlayFieldCardsLevels(playField, attackCard);
}

const addCardToBlock = (block, card) => {
    block.push(card);
}
const deleteAllCardsFromBlock = (block) => {
    block.splice(0);
}

const removeCardImage = (cardImgElem) => {
    cardImgElem.remove();
}
const addCardImageToElement = (element, cardImage) => {
    element.insertAdjacentHTML('beforeend',
        `<img src="./assets/${cardImage.level}${cardImage.suit}.png" 
                    alt="${cardImage.level}${cardImage.suit}"/>`);
}

const putCardBackImageToBeatenDeck = () => {
    finishedCardsElem.insertAdjacentHTML('beforeend',
        `<img src="assets/CardBack.png" alt="CardBack"/>`)
}

const disableButton = (buttonElem, trueOrFalse) => {
    buttonElem.disabled = trueOrFalse;
}

const takeAllCardsFromFieldToPlayer = (playField, playerDeck) => {
    for (let i = 0; i < playField.length; i++) {
        addCardToBlock(playerDeck, playField[i]);
    }
    deleteAllCardsFromBlock(playField);
    console.log('========');
    console.log('========');
}

const takeAllCardImagesFromFieldToPlayer = (playField, playerElem) => {
    let playFieldImagesElements = getCardImagesOfBlock(playFieldElem);
    for (let i = 0; i < playField.length; i++) {
        removeCardImage(playFieldImagesElements[i]);
        addCardImageToElement(playerElem, playField[i]);
    }
}

const hasDefendingCards = (defendingPlayerDeck, opponentsAttackCard, masterSuit) => {
    let defendingCards = [];
    for (let j = 0; j < defendingPlayerDeck.length; j++) {
        let defenceSuccess = dummyPlay(opponentsAttackCard.level, opponentsAttackCard.suit,
            defendingPlayerDeck[j].level, defendingPlayerDeck[j].suit, masterSuit.suit);
        console.log('defence successful?', defenceSuccess);
        console.log('====', j);
        if (defenceSuccess) {
            defendingCards.push(defendingPlayerDeck[j]);
            console.log('this is defending cards', defendingCards);
        }
    }
    return defendingCards;
}
const getSmallestDefenceCard = (defendingCards, masterSuit) => {
    let smallestDefenceCard = defendingCards.reduce((previousCard, currentCard) => {
        if (dummyPlay(previousCard.level, previousCard.suit, currentCard.level, currentCard.suit, masterSuit.suit)) {
            return previousCard;
        }
        return currentCard;
    }, defendingCards[0]);
    console.log('smallest defence card', smallestDefenceCard);
    return smallestDefenceCard;
}

const successfulDefence = (defenceCard, defendingPlayerDeck, playerElem, playField) => {
    let playerDefenceCard = defenceCard;
    let index = defendingPlayerDeck.indexOf(playerDefenceCard)
    getUpdatedDeckOfBlock(defendingPlayerDeck, index);
    let playerCardImgElems = getCardImagesOfBlock(playerElem);
    removeCardImage(playerCardImgElems[index]);
    addCardToBlock(playField, playerDefenceCard);
    addCardImageToElement(playFieldElem, playerDefenceCard);
    disableButton(beatenButtonElem, false);
}
const unsuccessfulDefence = (playField, playerElem, defendingPlayerDeck) => {
    takeAllCardImagesFromFieldToPlayer(playField, playerElem)
    takeAllCardsFromFieldToPlayer(playField, defendingPlayerDeck);

    disableButton(beatenButtonElem, true);
    disableButton(getMoreCardsButtonElement, false);
    pl1OuterElem.className = 'player1BackgroundFlashing';
    pl1TurnElem.innerHTML = 'Ваш ход!!!'
    pl1TurnElem.className = 'yourTurn';
}

const playerDefence = (playerElem, defendingPlayerDeck, opponentsAttackCard, playField, masterSuit) => {
    setTimeout(() => {
        let defendingCards = hasDefendingCards(defendingPlayerDeck, opponentsAttackCard, masterSuit);

        if (defendingCards.length === 1) {
            successfulDefence(defendingCards[0], defendingPlayerDeck, playerElem, playField);
        } else if (defendingCards.length > 1) {
            let smallestDefenceCard = getSmallestDefenceCard(defendingCards, masterSuit);
            successfulDefence(smallestDefenceCard, defendingPlayerDeck, playerElem, playField);
        } else {
            unsuccessfulDefence(playField, player2Elem, defendingPlayerDeck);
        }
    }, 500);
}

const attack = (playerCardImg, playField, index, playerDeck, defendingPlayerDeck, masterSuit) => {
    let playerAttackCard = getAttackingOrDefendingCard(playerDeck, index);
    if (canPutCardOnPlayField(playField, playerAttackCard)) {
        getUpdatedDeckOfBlock(playerDeck, index);
        removeCardImage(playerCardImg);
        addCardToBlock(playField, playerAttackCard);
        addCardImageToElement(playFieldElem, playerAttackCard);
        disableButton(beatenButtonElem, true);
        playerDefence(player2Elem, defendingPlayerDeck, playerAttackCard, playField, masterSuit);
    } else {
        playerCardImg.style.border = '2px solid red';
    }
}

const attacks = (playerCardImg, playerElem, playField, index, playerDeck, opponentPlayerDeck, masterSuit) => {
    let playerCardImages = getCardImagesOfBlock(playerElem);
    //console.log(playerCardImg === playerCardImages.item(i));

    if (playerCardImg === playerCardImages.item(index)) {
        attack(playerCardImg, playField, index, playerDeck, opponentPlayerDeck, masterSuit);

    } else if (playerCardImg === playerCardImages.item(index - 1)) {
        attack(playerCardImg, playField, index - 1, playerDeck, opponentPlayerDeck, masterSuit);

    } else if (playerCardImg === playerCardImages.item(index - 2)) {
        attack(playerCardImg, playField, index - 2, playerDeck, opponentPlayerDeck, masterSuit);

    } else if (playerCardImg === playerCardImages.item(index - 3)) {
        attack(playerCardImg, playField, index - 3, playerDeck, opponentPlayerDeck, masterSuit);

    } else if (playerCardImg === playerCardImages.item(index - 4)) {
        attack(playerCardImg, playField, index - 4, playerDeck, opponentPlayerDeck, masterSuit);

    } else if (playerCardImg === playerCardImages.item(index - 5)) {
        attack(playerCardImg, playField, index - 5, playerDeck, opponentPlayerDeck, masterSuit);
    }
}

const bito = (finishedCards, playField) => {
    beatenButtonElem.addEventListener('click', () => {

        if (finishedCards.length === 0) {
            putCardBackImageToBeatenDeck();
        }

        let fieldCardsImgElements = getCardImagesOfBlock(playFieldElem);
        for (let i = 0; i < playField.length; i++) {
            addCardToBlock(finishedCards, playField[i]);
            removeCardImage(fieldCardsImgElements[i]);
        }
        deleteAllCardsFromBlock(playField);

        beatenButtonElem.disabled = true;
        getMoreCardsButtonElement.disabled = false;
    })
}

const dealMoreCardsForPlayer = (playerDeck, playerElem, masterSuitCard) => {
    for (let i = playerDeck.length; i < 6; i++) {
        let topCard = masterSuitCard.takeOneCard();
        masterSuitCard.putOneCard(topCard, playerDeck);
        addCardImageToElement(playerElem, topCard);
    }
    if (playerDeck.length >= 6) {
        return playerDeck;
    }
}

const dealMoreCardsForPlayers = (player1Deck, playField, player2Deck, masterSuitCard, masterSuit) => {
    getMoreCardsButtonElement.addEventListener('click', () => {
        pl1OuterElem.className = 'player1_Outer';
        if (masterSuitCard.deck.length === 0) {
            getMoreCardsButtonElement.innerHTML = 'Карты закончены';
            getMoreCardsButtonElement.disabled = true;
            return;
        }
        if (masterSuitCard.deck.length === 1) {
            getMoreCardsButtonElement.innerHTML = 'Карты закончены';
            getMoreCardsButtonElement.disabled = true;
            dealMoreCardsForPlayer(player1Deck, player1Elem, masterSuitCard);
            playerAttackAndOpponentDefence(player1Deck, player1Elem, playField, player2Deck, masterSuit);
            return;
        }
        dealMoreCardsForPlayer(player1Deck, player1Elem, masterSuitCard);

        player2Deck = dealMoreCardsForPlayer(player2Deck, player2Elem, masterSuitCard);

        playerAttackAndOpponentDefence(player1Deck, player1Elem, playField, player2Deck, masterSuit);
    })
}

const dealPlayerDeck = (playerDeck, playerElem) => {
    for (let i = 0; i < playerDeck.length; i++) {
        addCardImageToElement(playerElem, playerDeck[i]);
    }
}

const playerAttackAndOpponentDefence = (playerDeck, playerElem, playField, opponentPlayerDeck, masterSuit) => {
    let playerCardImgElems = getCardImagesOfBlock(playerElem);

    for (let i = 0; i < playerDeck.length; i++) {

        playerCardImgElems[i].addEventListener('click', () => {
            pl1TurnElem.innerHTML = '';
            pl1TurnElem.className = 'yourTurn1';
            attacks(playerCardImgElems[i], playerElem, playField, i, playerDeck, opponentPlayerDeck, masterSuit);
        });
    }
}

export const dealRealCards = (player1Deck, player2Deck, masterSuit, playField, finishedCards, masterSuitCard) => {

    dealPlayerDeck(player1Deck, player1Elem);
    dealPlayerDeck(player2Deck, player2Elem);

    addCardImageToElement(mainDeckElem, masterSuit);

    playerAttackAndOpponentDefence(player1Deck, player1Elem, playField, player2Deck, masterSuit);

    bito(finishedCards, playField);

    dealMoreCardsForPlayers(player1Deck, playField, player2Deck, masterSuitCard, masterSuit);
}