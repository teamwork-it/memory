import * as React from 'react';
import {Col, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

type NavBarProps = {
    handleNewParty: (val: boolean) => void;
}

export const NavBar = ({handleNewParty} : NavBarProps) => {

    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        handleNewParty(false);
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Menu</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#" onClick={handleHomeClick}>Accueil / Meilleurs temps</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>

    );
};
