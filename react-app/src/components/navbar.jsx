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
                        <Nav.Link as={Link} to="/exercise">
                            운동기록
                        </Nav.Link>
                        <Nav.Link as={Link} to="/exercise-list">
                            운동목록
                        </Nav.Link>
                        <Nav.Link as={Link} to="/equipment">
                            기구관리
                        </Nav.Link>
                        <Nav.Link as={Link} to="/dailyexercise">
                            하루운동
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/temporarilymenu">
                            임시메뉴
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
