import {Card} from "../types/Card";
import {cardsSlug} from "../constants/cards";

export function getCardsStack () {
    const cardStack: Card[] = [];
    const allCards = [...cardsSlug];
    const selectedCards = [];
    // prmeière passe pour servir 14 cartes
    for(let i=1; i < 15; i++) {
        //au hasard
        const randomIndex = Math.floor(Math.random() * allCards.length);
        cardStack.push({
            id: i, slug:allCards[randomIndex], found: false, selected: false
        })
        // on mémorise le slug de la carte servie
        selectedCards.push(allCards[randomIndex]);
        //on retire cette acrte pour ne pas la servir 2 fois
        allCards.splice(randomIndex, 1);
    }
    // le jeu contient 14 cartes uniques il faut maintenant les dupliquer pour obtenir 14 paires
    for(let i=15; i < 29; i++) {
        const randomIndex = Math.floor(Math.random() * selectedCards.length);
        cardStack.push({
            id: i, slug:selectedCards[randomIndex], found: false, selected: false
        })
        //on retire cette acrte pour ne pas la servir 2 fois
        selectedCards.splice(randomIndex, 1);
    }
    return cardStack
}

