import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Exercise() {
    const [formData, setFormData] = useState({ exname: '', excategory: '', days: '', count: '' });

    const navigate = useNavigate();

    const handleChange = (e) => {
        console.log('e.target.name: ', e.target.name);
        console.log('e.target.value: ', e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const check = () => {
        const { exname, excategory, days, count } = formData;
        if (!exname.trim() || !excategory.trim() || !days.trim() || !count.trim()) {
            alert('양식에 맞게 모두 입력해주세요');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        //submit하려는 기본동작을 막자. 왜? 비동기요청을 위해서
        e.preventDefault();
        const b = check();
        if (!b) return;
        //alert('ajax요청');
        try {
            const url = `http://localhost:5000/api/exercise`;
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(JSON.stringify(response));
            if (response.status === 200) {
                alert('저장완료');
                navigate('/');
            }
        } catch (error) {
            alert('서버 오류: ' + error.message);
        }
    };

    const handleReset = () => {
        setFormData({ exname: '', excategory: '', days: '', count: '' });
    };

    return (
        <div>
            <div className="container py-4">
                <h1 className="text-center my-4">운동 관리</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            운동이름
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="text"
                                name="exname"
                                value={formData.exname}
                                onChange={handleChange}
                                placeholder="운동 이름을 입력하세요"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            운동종류
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select name="excategory" value={formData.excategory} onChange={handleChange}>
                                <option value="">::운동부위::</option>
                                <option value="가슴">가슴</option>
                                <option value="등">등</option>
                                <option value="어깨">어깨</option>
                                <option value="하체">하체</option>
                                <option value="팔">팔</option>
                                <option value="기타">기타</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            운동요일
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Select name="days" value={formData.days} onChange={handleChange}>
                                <option value=""> ::운동요일:: </option>
                                <option value="월요일"> 월요일 </option>
                                <option value="화요일"> 화요일 </option>
                                <option value="수요일"> 수요일 </option>
                                <option value="목요일"> 목요일 </option>
                                <option value="금요일"> 금요일 </option>
                                <option value="토요일"> 토요일 </option>
                                <option value="일요일"> 일요일 </option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            횟수
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="number"
                                min="1"
                                name="count"
                                value={formData.count}
                                onChange={handleChange}
                                placeholder="횟수를 입력하세요"
                            />
                        </Col>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Button variant="primary" type="submit">
                                저장
                            </Button>
                            <Button variant="secondary" type="button" onClick={handleReset}>
                                다시쓰기
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default Exercise;
