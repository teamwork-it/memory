import * as React from 'react';
import {Time} from "../../types/Time";
import {Button, Carousel, Col, Row} from "react-bootstrap";

type Props = {
    times: Time[];
    handleNewParty: (val: boolean) => void;
};
export const Home = ({times, handleNewParty}: Props) => {
    times.sort(function(a,b) {
        return a.duration - b.duration;
    })

    const handleNewpartyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleNewParty(true);
    }

    return (
        <>
            <Row className="mt-4">
                <Col className="text-center">
                    <Button onClick={handleNewpartyClick}>Démarrer une partie</Button>
                </Col>
            </Row>
            <Row>
                <Carousel>
                    {
                        times.map((time: Time, index) => (
                            <Carousel.Item key={index}>
                                <Carousel.Caption>
                                    <div>
                                        <h3>Temps { Math.floor(time.duration / 60)} minute(s) : {time.duration % 60} seconde(s)</h3>
                                        <p>Le {time.partyDate}</p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            </Row>
        </>
    );
};
