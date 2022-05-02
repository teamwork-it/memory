import * as React from 'react';
import {Col, ProgressBar, Row} from "react-bootstrap";
import {NavBar} from "../NavBar/NavBar";
import {useState, useEffect} from "react";
import {getCardsStack} from "../../service/cardDispenser";
import {Card} from "../../types/Card";
import {GameCard} from "./GameCard";
import {areAllCardsFounded, areIdenticalSelectedCards, getCountSelectedCards} from "../../service/cardsStack";
import {Timer} from "./Timer";
import {Time} from "../../types/Time";
import dayjs from "dayjs";
import {Home} from "../Home/Home";

interface GameProps {
    setTimes: (val: Time[]) => void
    times: Time[]
}

export const Game = ({setTimes, times}: GameProps) => {
    const [cardsStack, setCardsStack] = useState<Card[]>([]);
    const [grid, setGrid] = useState<any[]>([]);
    const [timer, setTimer] = useState(0);
    //définit le temps maximum de la partie en secondes
    const maxTime = 300;

    useEffect(() => {
        const stack = getCardsStack();
        setCardsStack(stack)
        return () => {
            setCardsStack([])
        };
    }, []);

    //surveille le timer
    useEffect(() => {
        if(timer === maxTime + 1) {
            //le maxtime est atteint on cherche à récupérer les interval existant et on les tue
            const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
            // Clear any timeout/interval up to that id
            for (let i = 1; i < interval_id; i++) {
                window.clearInterval(i);
            }
            alert('Désolé , Vous avez perdu !!!!')
        }
    }, [timer]);

    //Gestion du click sur une carte
    const handleCardClick = (selectedCard: Card) => {
        const cards = [...cardsStack]

        //on vérifier le nbre de cartes déjà sélectionénes
        const countSelectedCards = getCountSelectedCards(cardsStack);
        //si on en avait déjà 2 alors on replace toutes les cartes faces cachée
        if(countSelectedCards > 1) {
            cards.map((card:Card) => {
                card.selected = false;
                return card;
            })
        }

        //on cherche la carte en question dans le state pile de carte
        cards.map((card:Card) => {
            //une fois trouvée on met à jour son statut car elle est sélectionnée
            if(card.id === selectedCard.id){
                card.selected = true;
                return card
            }
            return card;
        });

        //on vérifie si les cartes retournées sont identiques
        //Si c'est le cas on les marsuent comme trouvées
        areIdenticalSelectedCards(cards) &&
            cards.map((card:Card) => {
                if(card.selected) {
                    card.found = true;
                }
            })

        //on met à jour le state global
        setCardsStack(cards);

        if(areAllCardsFounded(cards)) {
            const route = document.getElementById('route-add-time') as HTMLInputElement;
            //le maxtime est atteint on cherche à récupérer les interval existant et on les tue
            const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
            // Clear any timeout/interval up to that id
            for (let i = 1; i < interval_id; i++) {
                window.clearInterval(i);
            }

            route &&
            fetch(route.value, {
                method: 'POST',
                body: JSON.stringify({duration:timer })
            })
            const currentTimes = [...times];
            let today = new Date();
            currentTimes.push({partyDate: dayjs(new Date()).format('DD/MM/YYYY'), duration: timer});
            setTimes(currentTimes);
            alert('bravo ! Vous avez gagné, votre temps a été mémorisé')
        }
    }


    useEffect(() => {
        //on construit une grille
        if(cardsStack.length) {
            const buildGrid = [];
            for (let i = 0; i < 4; i++) {
                const row = [];
                for (let x = 1; x < 8; x++) {
                    //on calcul l'id de la card puis on la selectionne
                    let currentCard: Card[] | null = cardsStack.filter((card) => card.id === (x + (i * 7)))
                    currentCard &&
                    row.push(<GameCard card={currentCard[0]} handlCardClick={handleCardClick} key={currentCard[0].id}/>)
                }
                buildGrid.push(row);
            }
            setGrid(buildGrid);
        }
    }, [cardsStack]);


    return (
        <>
            <Row className="justify-content-md-center mt-4">
                <Col md={8} className="border-1 border-white">
                    {
                        grid.length && grid.map((row,index) => (
                            <Row key={index}>
                                {
                                    row
                                }
                            </Row>
                        ))
                    }
                </Col>
            </Row>
            <Row className="mt-4">
                <Timer setTimer={setTimer} timer={timer}/>
            </Row>
        </>
    );
};
