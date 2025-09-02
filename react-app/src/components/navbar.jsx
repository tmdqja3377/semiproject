import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function navbar() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" fixed="top" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    메인화면
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/food">
                            메인메뉴
                        </Nav.Link>
                        <Nav.Link as={Link} to="/drinks">
                            음료/주류
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dessert">
                            디저트
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#login">주문내역</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
