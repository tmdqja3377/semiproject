import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function Home() {
    const [todayData, setTodayData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 오늘의 운동 데이터 조회
    const fetchTodayExercises = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/today-exercises');

            if (response.data.success) {
                setTodayData(response.data.data);
                setError(null);
            } else {
                setError('데이터를 불러오는데 실패했습니다.');
            }
        } catch (err) {
            console.error('오늘의 운동 조회 오류:', err);
            setError('서버 오류: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 데이터 조회
    useEffect(() => {
        fetchTodayExercises();
    }, []);

    // 운동 부위 한글 변환
    const getCategoryName = (category) => {
        const categoryMap = {
            chest: '가슴',
            row: '등',
            sholder: '어깨',
            leg: '하체',
            arm: '팔',
            etc: '기타',
        };
        return categoryMap[category] || category;
    };

    // 요일별 색상
    const getDayColor = (day) => {
        const colors = {
            월요일: 'primary',
            화요일: 'success',
            수요일: 'info',
            목요일: 'warning',
            금요일: 'danger',
            토요일: 'secondary',
            일요일: 'dark',
        };
        return colors[day] || 'primary';
    };

    if (loading) {
        return (
            <Container className="py-4">
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">로딩 중...</span>
                    </Spinner>
                    <p className="mt-2">오늘의 운동을 불러오는 중...</p>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <div className="text-center text-danger">
                    <h3>오류가 발생했습니다</h3>
                    <p>{error}</p>
                    <Button onClick={fetchTodayExercises} variant="primary">
                        다시 시도
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="text-center">
                        <h1 className="display-4 mb-3">
                            오늘의 운동
                            <Badge bg={getDayColor(todayData?.today)} className="ms-3 fs-6">
                                {todayData?.today}
                            </Badge>
                        </h1>
                        <p className="lead text-muted">{todayData?.today}에 해야 할 운동 목록입니다</p>
                    </div>
                </Col>
            </Row>

            {todayData?.exercises.length === 0 ? (
                <Row>
                    <Col md={8} className="mx-auto">
                        <Card className="text-center">
                            <Card.Body className="py-5">
                                <h4 className="text-muted">오늘은 운동이 없습니다! 🎉</h4>
                                <p className="text-muted mb-4">휴식을 취하거나 다른 요일에 운동을 추가해보세요.</p>
                                <Button variant="outline-primary" href="/exercise">
                                    운동 추가하기
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Row>
                    {todayData?.exercises.map((exercise, index) => (
                        <Col md={6} lg={4} key={exercise.id} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Header className={`bg-${getDayColor(todayData.today)} text-white`}>
                                    <h5 className="mb-0">
                                        {index + 1}. {exercise.exname}
                                    </h5>
                                </Card.Header>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <Badge bg="secondary" className="fs-6">
                                            {getCategoryName(exercise.excategory)}
                                        </Badge>
                                        <Badge bg="info" className="fs-6">
                                            {exercise.count}회
                                        </Badge>
                                    </div>
                                    <div className="text-center">
                                        <Button variant="outline-success" size="sm" className="me-2">
                                            완료
                                        </Button>
                                        <Button variant="outline-primary" size="sm" href="/exercise-list">
                                            전체보기
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <Row className="mt-4">
                <Col className="text-center">
                    <Button variant="outline-primary" onClick={fetchTodayExercises} className="me-2">
                        새로고침
                    </Button>
                    <Button variant="primary" href="/exercise">
                        운동 추가하기
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
