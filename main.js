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


const defenceStepOfPlayer2 = (player1AttackCard, player2Deck, playField, masterSuit) => {
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

const actionOfPlayer1andPlayer2 = (pl1CardImgElem, playField, player2Deck, index, player1Deck, masterSuit) => {
    let player1AttackCard = getPlayer1AttackCard(player1Deck, index);
    if (canPutCardOnPlayField(playField, player1AttackCard)) {
        getUpdatedPlayer1Deck(player1Deck, index);
        removeCardImage(pl1CardImgElem);
        addCardToPlayField(playField, player1AttackCard);
        addCardImageToPlayField(player1AttackCard, playField);
        disableBitoButton(true);
        defenceStepOfPlayer2(player1AttackCard, player2Deck, playField, masterSuit);
    } else {
        pl1CardImgElem.style.border = '2px solid red';
    }
}

const player1Attack = (pl1CardImgElem, playField, player2Deck, index, player1Deck, masterSuit) => {
    let pl1CardImages = getPlayer1CardImages();
    //console.log(pl1CardImgElem === pl1CardImages.item(i));

    if (pl1CardImgElem === pl1CardImages.item(index)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index, player1Deck, masterSuit);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 1)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 1, player1Deck, masterSuit);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 2)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 2, player1Deck, masterSuit);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 3)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 3, player1Deck, masterSuit);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 4)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 4, player1Deck, masterSuit);
    } else if (pl1CardImgElem === pl1CardImages.item(index - 5)) {
        actionOfPlayer1andPlayer2(pl1CardImgElem, playField, player2Deck, index - 5, player1Deck, masterSuit);
    }
}

const dealMoreCardsForPlayers = (player1Deck, playField, player2Deck, masterSuitCard, masterSuit) => {
    if (masterSuitCard.deck.length === 0) {
        getMoreCardsButtonElement.innerHTML = 'Cards finished';
        getMoreCardsButtonElement.disabled = true;
        return;
    }
    for (let i = player1Deck.length; i < 6; i++) {

        let topCard = masterSuitCard.takeOneCard();
        masterSuitCard.putOneCard(topCard, player1Deck);

        player1Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${topCard.level}${topCard.suit}.png"
                    alt="${topCard.level}${topCard.suit}"/>`);

        let pl1NewCardImgElem = player1Elem.querySelectorAll('img')[i];

        pl1NewCardImgElem.addEventListener('click', () => {
            player1Attack(pl1NewCardImgElem, playField, player2Deck, i, player1Deck, masterSuit);
        })
    }
    for (let i = player2Deck.length; i < 6; i++) {

        let topCard = masterSuitCard.takeOneCard();
        masterSuitCard.putOneCard(topCard, player2Deck);

        player2Elem.insertAdjacentHTML('beforeend',
            `<img src="./assets/${topCard.level}${topCard.suit}.png"
                    alt="${topCard.level}${topCard.suit}"/>`);
    }
}

export const dealRealCards = (player1Deck, player2Deck, masterSuit, playField, finishedCards, masterSuitCard) => {

    for (let i = 0; i < player1Deck.length; i++) {
        addCardImageToElement(player1Elem, player1Deck[i]);
        let pl1CardImgElem = player1Elem.querySelectorAll('img')[i];

        pl1CardImgElem.addEventListener('click', () => {
            player1Attack(pl1CardImgElem, playField, player2Deck, i, player1Deck, masterSuit);
        });
        addCardImageToElement(player2Elem, player2Deck[i]);
    }

    mainDeckElem.insertAdjacentHTML('afterbegin',`<img src="./assets/${masterSuit
        .level}${masterSuit.suit}.png" alt="${masterSuit.level}${masterSuit.suit}"/>`);

    beatenButtonElem.addEventListener('click', () => {
        let fieldCardsImgElements = playFieldElem.querySelectorAll('img');

        if (finishedCards.length === 0) {
            finishedCardsElem.insertAdjacentHTML('beforeend',
                `<img src="assets/CardBack.png" alt="CardBack"/>`);
        }
        for (let i = 0; i < playField.length; i++) {
            finishedCards.push(playField[i]);
            fieldCardsImgElements[i].remove();
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
        dealMoreCardsForPlayers(player1Deck, playField, player2Deck, masterSuitCard, masterSuit);
    })
}