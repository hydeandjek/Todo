import React, { useState } from 'react';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';
import '../scss/TodoTemplate.scss'; // 기존 TodoTemplate 스타일 (필요 시 모달용 CSS도 추가)
import '../scss/Modal.scss'; // 모달용 스타일 파일 (아래 예시 참고)

const TodoTemplateModal = () => {
  const API_BASE_URL = 'http://localhost:8080/api/todos';

  const [todos, setTodos] = useState([]);

  // 모달 열림 상태 관리
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const makeNewId = () => {
    if (todos.length === 0) return 1;
    return todos[todos.length - 1].id + 1;
  };

  const addTodo = (todoText) => {
    const newTodo = {
      title: todoText,
    };
    
    fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data]); // 기존 할 일 목록 + 새 할 일 추가
      })
  };

  // 삭제 처리
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 할일 체크
  const checkTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, done: !todo.done }
          : todo
      )
    );
  };

  const countRestTodo = () => {
    const filteredTodos = todos.filter((todo) => !todo.done);
    return filteredTodos.length;
  };

  return (
    <>
      <button className="open-modal-btn" onClick={openModal}>
        Todo 보기
      </button>
      
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>
            
            </button>
            <div className="TodoTemplate">
              <TodoHeader count={countRestTodo} />
              <TodoMain 
                todoList={todos} 
                remove={removeTodo} 
                check={checkTodo}
              />
              <TodoInput addTodo={addTodo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoTemplateModal;
