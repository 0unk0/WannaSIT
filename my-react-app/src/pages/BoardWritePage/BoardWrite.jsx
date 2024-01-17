import React, { useState } from 'react';
import './BoardWrite.css';
import BoardWriteModal from '../../components/Modal/BoardWriteModal';
import api from '../../services/api';

function BoardWrite() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [ModalOpen, setModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 등록 전에 사용자 확인 모달 열기
        setModalOpen(true);
    };

    // handleConfirmRegistration 함수 수정
    const handleConfirmRegistration = async () => {
        try {
            const formData = { title, content };
            console.log('전송할 데이터:', { title, content });
            // axios를 사용하여 api.post 호출
            const response = await api.post('/boards', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.data.success) {
                throw new Error('글쓰기에 실패했습니다.');
            }

            setTitle('');
            setContent('');
            setModalOpen(false); // 등록 후 모달 닫기
        } catch (error) {
            console.error('글쓰기 오류:', error.message);
        }
    };

    const handleCancelRegistration = () => {
        // 사용자가 등록 취소를 선택한 경우 모달 닫기
        setModalOpen(false);
    };


    return (
        <div className='BoardWrite'>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='제목을 입력해주세요'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder='내용을 입력해주세요'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit">등록</button>
            </form>
            <BoardWriteModal isOpen={ModalOpen} onConfirm={handleConfirmRegistration} onCancel={handleCancelRegistration} />
        </div>
    );
};

export default BoardWrite;