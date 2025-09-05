const db = require('./db');

// 운동 데이터 저장
const createExercise = (exerciseData) => {
    return new Promise((resolve, reject) => {
        const { exname, excategory, days, count } = exerciseData;

        // 입력 데이터 검증
        if (!exname || !excategory || !days || !count) {
            return reject(new Error('모든 필드를 입력해주세요.'));
        }

        const sql = 'INSERT INTO exercise (exname, excategory, days, count) VALUES (?, ?, ?, ?)';
        const values = [exname, excategory, days, parseInt(count)];

        console.log('실행할 SQL:', sql);
        console.log('SQL 값:', values);

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('데이터베이스 저장 오류:', err);
                reject(err);
            } else {
                console.log('운동 데이터 저장 성공:', result);
                resolve({
                    id: result.insertId,
                    exname,
                    excategory,
                    days,
                    count: parseInt(count),
                });
            }
        });
    });
};

// 모든 운동 데이터 조회
const getAllExercises = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM exercise 
                     ORDER BY CASE days 
                         WHEN '월요일' THEN 1
                         WHEN '화요일' THEN 2
                         WHEN '수요일' THEN 3
                         WHEN '목요일' THEN 4
                         WHEN '금요일' THEN 5
                         WHEN '토요일' THEN 6
                         WHEN '일요일' THEN 7
                         ELSE 8
                     END`;

        db.query(sql, (err, result) => {
            if (err) {
                console.error('데이터 조회 오류:', err);
                reject(err);
            } else {
                console.log('저장된 운동 데이터:', result);
                resolve(result);
            }
        });
    });
};

// 운동 데이터 수정
const updateExercise = (id, exerciseData) => {
    return new Promise((resolve, reject) => {
        const { exname, excategory, days, count } = exerciseData;

        const sql = 'UPDATE exercise SET exname = ?, excategory = ?, days = ?, count = ? WHERE id = ?';
        const values = [exname, excategory, days, parseInt(count), id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('데이터 수정 오류:', err);
                reject(err);
            } else {
                console.log('운동 데이터 수정 성공:', result);
                resolve(result);
            }
        });
    });
};

// 운동 데이터 삭제
const deleteExercise = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM exercise WHERE id = ?';
        const values = [id];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('데이터 삭제 오류:', err);
                reject(err);
            } else {
                console.log('운동 데이터 삭제 성공:', result);
                resolve(result);
            }
        });
    });
};

// 오늘의 운동 데이터 조회
const getTodayExercises = () => {
    return new Promise((resolve, reject) => {
        // 한국 시간 기준으로 오늘 요일 구하기
        const today = new Date();
        const koreanTime = new Date(today.getTime() + 9 * 60 * 60 * 1000); // UTC+9
        const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const todayDay = dayNames[koreanTime.getDay()];

        console.log('오늘 요일:', todayDay);

        const sql = 'SELECT * FROM exercise WHERE days = ? ORDER BY created_at DESC';
        const values = [todayDay];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('오늘의 운동 조회 오류:', err);
                reject(err);
            } else {
                console.log('오늘의 운동 데이터:', result);
                resolve({
                    today: todayDay,
                    exercises: result,
                });
            }
        });
    });
};

module.exports = {
    createExercise,
    getAllExercises,
    updateExercise,
    deleteExercise,
    getTodayExercises,
};
