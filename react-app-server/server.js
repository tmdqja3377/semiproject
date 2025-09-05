const express = require('express');
const db = require('./lib/db');
const exerciseService = require('./lib/exerciseService');
const app = express();
const cors = require('cors');

const port = 5000;

// JSON 파싱을 위한 미들웨어 추가
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Express');
    console.log(req, res);
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// 운동 데이터 저장 API
app.post('/api/exercise', async (req, res) => {
    try {
        console.log('API 호출됨 - 요청 데이터:', req.body);

        const result = await exerciseService.createExercise(req.body);

        res.status(200).json({
            success: true,
            message: '운동 데이터가 성공적으로 저장되었습니다.',
            data: result,
        });
    } catch (error) {
        console.error('운동 데이터 저장 오류:', error);
        res.status(500).json({
            success: false,
            message: error.message || '데이터베이스 저장 중 오류가 발생했습니다.',
            error: error.message,
        });
    }
});

// 모든 운동 데이터 조회 API
app.get('/api/exercises', async (req, res) => {
    try {
        const result = await exerciseService.getAllExercises();

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('운동 데이터 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '데이터 조회 중 오류가 발생했습니다.',
            error: error.message,
        });
    }
});

// 특정 운동 데이터 조회 API
app.get('/api/exercise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await exerciseService.getExerciseById(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: '해당 운동 데이터를 찾을 수 없습니다.',
            });
        }

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('운동 데이터 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '데이터 조회 중 오류가 발생했습니다.',
            error: error.message,
        });
    }
});

// 운동 데이터 수정 API
app.put('/api/exercise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await exerciseService.updateExercise(id, req.body);

        res.status(200).json({
            success: true,
            message: '운동 데이터가 성공적으로 수정되었습니다.',
            data: result,
        });
    } catch (error) {
        console.error('운동 데이터 수정 오류:', error);
        res.status(500).json({
            success: false,
            message: error.message || '데이터 수정 중 오류가 발생했습니다.',
            error: error.message,
        });
    }
});

// 운동 데이터 삭제 API
app.delete('/api/exercise/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await exerciseService.deleteExercise(id);

        res.status(200).json({
            success: true,
            message: '운동 데이터가 성공적으로 삭제되었습니다.',
            data: result,
        });
    } catch (error) {
        console.error('운동 데이터 삭제 오류:', error);
        res.status(500).json({
            success: false,
            message: error.message || '데이터 삭제 중 오류가 발생했습니다.',
            error: error.message,
        });
    }
});

// 오늘의 운동 조회 API
app.get('/api/today-exercises', async (req, res) => {
    try {
        const result = await exerciseService.getTodayExercises();

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('오늘의 운동 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '오늘의 운동 조회 중 오류가 발생했습니다.',
            error: error.message,
        });
    }
});

db.getConnection((err) => {
    if (err) {
        console.error('mysql 연결실패: ', err);
        return;
    }
    console.log('mysql 연결성공');

    // exercises 테이블 생성 확인 및 생성
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS exercise (
            id INT AUTO_INCREMENT PRIMARY KEY,
            exname VARCHAR(255) NOT NULL,
            excategory VARCHAR(255) NOT NULL,
            days VARCHAR(5) NOT NULL,
            count INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.query(createTableSQL, (err, result) => {
        if (err) {
            console.error('테이블 생성 오류:', err);
        } else {
            console.log('exercises 테이블 확인/생성 완료');
        }
    });
});
