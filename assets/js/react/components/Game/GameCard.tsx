import * as React from 'react';
import {Card} from "../../types/Card";

type CardProps = {
    card: Card,
    handlCardClick: (card: Card) => void
};

export const GameCard = ({card, handlCardClick}: CardProps) => {
    const imagePath = document.location.origin + '/build/images/cards/';

    const handleCardSelect = (e: React.MouseEvent<HTMLElement>) => {
        //on ne prend pas en compte le click si la carte ets déjà selectionée (trouvée on juste retournée)
        !card.selected && !card.found &&
       handlCardClick(card);
    }

    //gérer les classes dynamique à taguer à la carte en fonction de son statut
    const getCardClass = () => {
        let cardClass = [];
        if(!card.found && !card.selected) {
            cardClass.push('bg-white border border-dark border-1')
        }else if(card.found) {
            cardClass.push('bg-info border border-info border-1')
        }
        return cardClass.join(' ');
    }

    return (
        <div className={`d-flex justify-content-center align-items-center game-card ${getCardClass()}`} onClick={handleCardSelect}>
            {
                (card.selected || card.found) &&
                <img src={imagePath + card.slug + '.png'} width={100} alt="image de fruit" />
            }
        </div>
    );
};
