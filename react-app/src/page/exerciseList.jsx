import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Row, Col, Card, Badge, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function ExerciseList() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [groupedExercises, setGroupedExercises] = useState({});

    // 운동 데이터 조회
    const fetchExercises = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/exercises');

            if (response.data.success) {
                setExercises(response.data.data);
                setError(null);
            } else {
                setError('데이터를 불러오는데 실패했습니다.');
            }
        } catch (err) {
            console.error('운동 데이터 조회 오류:', err);
            setError('서버 오류: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // 요일별로 운동 데이터 그룹화
    const groupExercisesByDay = (exercises) => {
        const grouped = {};
        const dayOrder = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

        // 각 요일별로 빈 배열 초기화
        dayOrder.forEach((day) => {
            grouped[day] = [];
        });

        // 운동 데이터를 요일별로 분류
        exercises.forEach((exercise) => {
            if (grouped[exercise.days]) {
                grouped[exercise.days].push(exercise);
            }
        });

        return grouped;
    };

    // 컴포넌트 마운트 시 데이터 조회
    useEffect(() => {
        fetchExercises();
    }, []);

    // exercises가 변경될 때마다 그룹화
    useEffect(() => {
        if (exercises.length > 0) {
            setGroupedExercises(groupExercisesByDay(exercises));
        }
    }, [exercises]);

    // 운동 데이터 삭제
    const handleDelete = async (id) => {
        if (window.confirm('정말로 이 운동을 삭제하시겠습니까?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/exercise/${id}`);

                if (response.data.success) {
                    alert('운동이 삭제되었습니다.');
                    fetchExercises(); // 목록 새로고침
                } else {
                    alert('삭제에 실패했습니다.');
                }
            } catch (err) {
                console.error('삭제 오류:', err);
                alert('서버 오류: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    // 운동 데이터 수정
    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/exercise/${id}`, updatedData);

            if (response.data.success) {
                alert('수정완료');
                fetchExercises();
            } else {
                alert('수정 실패');
            }
        } catch (err) {
            console.error('수정 오류:', err);
            alert('서버오류: ' + (err.response?.data?.message || err.message));
        }
    };

    // 수정 모달 상태 관리
    const [editingExercise, setEditingExercise] = useState(null);
    const [editFormData, setEditFormData] = useState({
        exname: '',
        excategory: '',
        days: '',
        count: '',
    });

    // 수정 모달 열기
    const openEditModal = (exercise) => {
        setEditingExercise(exercise);
        setEditFormData({
            exname: exercise.exname,
            excategory: exercise.excategory,
            days: exercise.days,
            count: exercise.count,
        });
    };

    // 수정 모달 닫기
    const closeEditModal = () => {
        setEditingExercise(null);
        setEditFormData({
            exname: '',
            excategory: '',
            days: '',
            count: '',
        });
    };

    // 수정 폼 제출
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editingExercise) {
            handleUpdate(editingExercise.id, editFormData);
            closeEditModal();
        }
    };

    // 요일별 테이블 렌더링
    const renderDayTable = (day, exercises) => {
        if (exercises.length === 0) {
            return (
                <Col md={6} lg={4} className="mb-4">
                    <Card>
                        <Card.Header className="bg-light">
                            <h5 className="mb-0">{day}</h5>
                        </Card.Header>
                        <Card.Body className="text-center text-muted">
                            <p className="mb-0">운동 없음</p>
                        </Card.Body>
                    </Card>
                </Col>
            );
        }

        return (
            <Col md={6} lg={4} className="mb-4">
                <Card>
                    <Card.Header className="bg-primary text-white">
                        <h5 className="mb-0">
                            {day}
                            <Badge bg="light" text="dark" className="ms-2">
                                {exercises.length}개
                            </Badge>
                        </h5>
                    </Card.Header>
                    <Card.Body className="p-0">
                        <Table striped hover size="sm" className="mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>운동</th>
                                    <th>부위</th>
                                    <th>횟수</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exercises.map((exercise) => (
                                    <tr key={exercise.id}>
                                        <td className="fw-bold">{exercise.exname}</td>
                                        <td>
                                            <Badge bg="secondary" className="small">
                                                {exercise.excategory}
                                            </Badge>
                                        </td>
                                        <td>{exercise.count}회</td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => openEditModal(exercise)}
                                                className="btn-sm me-1"
                                            >
                                                수정
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(exercise.id)}
                                                className="btn-sm"
                                            >
                                                삭제
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">운동 목록</h1>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <Button onClick={fetchExercises} variant="outline-primary">
                        새로고침
                    </Button>
                </Col>
            </Row>

            {exercises.length === 0 ? (
                <Card>
                    <Card.Body className="text-center">
                        <h4>등록된 운동이 없습니다.</h4>
                        <p>새로운 운동을 추가해보세요!</p>
                    </Card.Body>
                </Card>
            ) : (
                <Row>
                    {Object.entries(groupedExercises).map(([day, dayExercises]) => renderDayTable(day, dayExercises))}
                </Row>
            )}

            <Row className="mt-4">
                <Col className="text-center">
                    <p className="text-muted">총 {exercises.length}개의 운동이 등록되어 있습니다.</p>
                </Col>
            </Row>

            {/* 수정 모달 */}
            <Modal show={editingExercise !== null} onHide={closeEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>운동 수정</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleEditSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>운동 이름</Form.Label>
                            <Form.Control
                                type="text"
                                value={editFormData.exname}
                                onChange={(e) => setEditFormData({ ...editFormData, exname: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>운동 부위</Form.Label>
                            <Form.Select
                                value={editFormData.excategory}
                                onChange={(e) => setEditFormData({ ...editFormData, excategory: e.target.value })}
                                required
                            >
                                <option value="">::운동부위::</option>
                                <option value="chest">가슴</option>
                                <option value="row">등</option>
                                <option value="sholder">어깨</option>
                                <option value="leg">하체</option>
                                <option value="arm">팔</option>
                                <option value="etc">기타</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>요일</Form.Label>
                            <Form.Select
                                value={editFormData.days}
                                onChange={(e) => setEditFormData({ ...editFormData, days: e.target.value })}
                                required
                            >
                                <option value="">::요일::</option>
                                <option value="월요일">월요일</option>
                                <option value="화요일">화요일</option>
                                <option value="수요일">수요일</option>
                                <option value="목요일">목요일</option>
                                <option value="금요일">금요일</option>
                                <option value="토요일">토요일</option>
                                <option value="일요일">일요일</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>횟수</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                value={editFormData.count}
                                onChange={(e) => setEditFormData({ ...editFormData, count: e.target.value })}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEditModal}>
                            취소
                        </Button>
                        <Button variant="primary" type="submit">
                            수정하기
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}

export default ExerciseList;
