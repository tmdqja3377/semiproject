import React from 'react';
import { Button } from 'react-bootstrap';
function AdminMenu() {
    return (
        <div>
            <h1>관리자메뉴</h1>
            <div>
                <Button>메뉴추가</Button>
            </div>
            <Button>메뉴수정</Button>
            <Button>메뉴삭제</Button>
            <Button>품절</Button>
        </div>
    );
}

export default AdminMenu;
