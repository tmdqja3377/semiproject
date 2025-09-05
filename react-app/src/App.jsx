import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import { Row, Col } from 'react-bootstrap';
import Navbar from './components/navbar';
import Exercise from './page/exercise';
import ExerciseList from './page/exerciseList';
import Equipment from './page/equipment';
import Dailyexercise from './page/dailyexercise';
import Temporarilymenu from './page/temporarilymenu';
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
                            <Route path="/exercise" element={<Exercise />} />
                            <Route path="/exercise-list" element={<ExerciseList />} />
                            <Route path="/equipment" element={<Equipment />} />
                            <Route path="/dailyexercise" element={<Dailyexercise />} />
                            <Route path="/temporarilymenu" element={<Temporarilymenu />} />
                        </Routes>
                    </Col>
                </Row>
            </BrowserRouter>
        </div>
    );
}

export default App;
