import React, { useState } from 'react';
import Sidebar from './component/Sidebar';
import TodoTemplate from './component/TodoTemplate';
import './App.css';

function App() {
  // 상태를 초기화할 때 null 또는 빈 배열이 아닌 초기값을 명시적으로 제공
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="app-container">
      <Sidebar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TodoTemplate selectedDate={selectedDate} />
    </div>
  );
}

export default App;