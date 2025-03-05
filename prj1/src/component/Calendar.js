import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarModal = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 날짜 클릭 시 호출됨: 선택한 날짜를 저장하고 모달을 연다.
  const handleDateClick = (date) => {
    console.log("Clicked date:", date); // 디버깅용 로그
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Calendar onClickDay={handleDateClick} value={selectedDate} />

      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={closeModal}  // 오버레이를 클릭하면 모달 닫기
        >
          <div 
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              position: 'relative',
              width: '400px'
            }}
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
          >
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              닫기
            </button>
            <h2>선택한 날짜: {selectedDate.toDateString()}</h2>
            {/* 추가로 해당 날짜의 TodoTemplate 또는 다른 콘텐츠를 여기서 렌더링할 수 있습니다. */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarModal;
