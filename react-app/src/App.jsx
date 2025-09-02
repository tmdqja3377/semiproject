import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import { Row, Col } from 'react-bootstrap';
import Navbar from './components/navbar';
import Food from './page/food';
import Drinks from './page/drinks';
import Dessert from './page/dessert';

function App() {
    return (
        <div className="container fluid py-5">
            <BrowserRouter>
                <Row>
                    <Col className="mb-10">
                        <Navbar />
                    </Col>
                </Row>
                <Row className="main">
                    <Col xs={12} md={8}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/food" element={<Food />} />
                            <Route path="/drinks" element={<Drinks />} />
                            <Route path="/dessert" element={<Dessert />} />
                        </Routes>
                    </Col>
                </Row>
            </BrowserRouter>
        </div>
    );
}

export default App;
