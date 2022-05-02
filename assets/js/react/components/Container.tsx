import * as React from 'react';
import {Col, Row} from "react-bootstrap";
import {NavBar} from "./NavBar/NavBar";
import {useEffect, useState} from "react";
import {Game} from "./Game/Game";
import {Home} from "./Home/Home";
import {Time} from "../types/Time";

export const Container = () => {
    //state permettant de gérer la demande de nouvelle partie
    const [newParty, setNewParty] = useState(false);
    const [times, setTimes] = useState<Time[]>([]);

    useEffect(() => {
        const route = document.getElementById('route-list-time') as HTMLInputElement;
        route &&
        fetch(route.value)
            .then(response => {
                return response.json()
            }).then(data => {
                setTimes(data)
        })
    }, []);

    useEffect(() => {


    }, [newParty]);


    return (
        <>
            <Row className="justify-content-center">
                <h1 className="text-center text-white">Bienvenue sur le jeu de memory</h1>
            </Row>
            <NavBar handleNewParty={setNewParty}/>
            {
                newParty
                ? <Game setTimes={setTimes} times={times}/>
                : <Home times={times} handleNewParty={setNewParty}/>
            }
        </>
    );
};
