import * as React from 'react';
import {useState, useEffect} from "react";
import {ProgressBar} from "react-bootstrap";

interface TimeProps  {
    setTimer: (val: number) => void,
    timer: number
}

export const Timer = ({setTimer, timer}: TimeProps) => {

    //définit le temps maximum de la partie en secondes
    const maxTime = 300;
    let interval:NodeJS.Timer | null =null;

    useEffect(() => {
        interval = setInterval(() => {
            const newTime = timer  + 1;
            setTimer(newTime);
        },1000)

        return () => {
            interval &&
            clearInterval(interval);
        };
    }, [timer]);




    return (
        <>
            <div className="text-white text-center mb-3">Temps écoulé : { Math.floor(timer / 60)} minute(s) : {timer % 60} seconde(s)</div>
            <ProgressBar animated now={timer} min={0} max={maxTime} />
        </>
    );
};
