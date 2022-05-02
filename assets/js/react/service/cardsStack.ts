import {Card} from "../types/Card";
import {CardImg} from "react-bootstrap";

export function getCountSelectedCards(cardsStack:Card[]) {
    const selectedCards = cardsStack.filter((card) => card.selected);
    return selectedCards.length;
}

export function areIdenticalSelectedCards(cardStack:Card[]) {
    const selectCards = cardStack.filter((card:Card) => card.selected);
    if(selectCards.length === 2 && (selectCards[0].slug === selectCards[1].slug)){
        return true;
    }
    return false;
}
export function areAllCardsFounded(cardStack: Card[]) {
    const foundedCards = cardStack.filter((card: Card) => card.found);
    return foundedCards.length === 28;
}
