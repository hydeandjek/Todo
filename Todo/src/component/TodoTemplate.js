// import React, { useEffect, useState } from 'react';
// import TodoHeader from './TodoHeader';
// import TodoMain from './TodoMain';
// import TodoInput from './TodoInput';
// import '../scss/TodoTemplate.scss';

// const TodoTemplate = ({selectedDate}) => {
//     const API_BASE_URL = 'http://localhost:8080/api/todos';

//     const [todos, setTodos] = useState([{}]);
//     const formatDate = (date) => {
//         const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//         return date.toLocaleDateString('ko-KR', options);
//     };

//     // 새로운 할 일 추가
//     const addTodo = (todoText) => {
//         const newTodo = { title: todoText, done: false }; // done을 명시적으로 설정

//         fetch(API_BASE_URL, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(newTodo),
//         })
//         .then((res) => res.json())
//         .then((data) => {
//             // 서버에서 반환한 데이터 추가
//             setTodos((prevTodos) => {
//                 console.log(Array.isArray(prevTodos))
//                 if (!Array.isArray(prevTodos)) {
//                     return [data]; // prevTodos가 null이면 빈 배열에 data 추가
//                 }
//                 return [...prevTodos, data]; // prevTodos가 null이 아니면 기존 배열에 data 추가
//             });
//             console.log(data);
//         })
//         .catch((error) => {
//             console.error('할 일을 추가하는 중 오류 발생:', error);
//         });
//     };

//     // 삭제 처리 (API 연동)
//     const removeTodo = (id) => {
//         console.log(id);
//         if (!id) {
//             console.error("id가 전달되지 않았습니다.");
//             return;
//         }

//         fetch(`${API_BASE_URL}/${id}`, {
//             method: 'DELETE',
//         })
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error(`서버에서 삭제 처리 실패: ${res.statusText}`);
//             }
//             return res.text();
//         })
//         .then((data) => {
//             console.log(data); // 삭제 완료 메시지 확인
    
//             // 삭제 후, 다시 전체 할 일 목록을 불러오기 위한 GET 요청
//             fetch(API_BASE_URL)
//                 .then((res) => res.json())
//                 .then((data) => {
//                     // 데이터를 받아서 todos 상태를 갱신
//                     if (Array.isArray(data)) {
//                         setTodos(data);  // 새로 받은 데이터를 setTodos로 업데이트
//                     } else {
//                         setTodos([]);  // 오류 발생 시 빈 배열로 초기화
//                     }
//                 })
//                 .catch((error) => {
//                     console.error('할 일 목록을 불러오는 중 오류 발생:', error);
//                     setTodos([]); // 오류 발생 시 빈 배열로 초기화
//                 });
//         })
//         .catch((error) => {
//             console.error('할 일을 삭제하는 중 오류 발생:', error);
//         });
//     };

//     // 할 일 체크 (API 연동)
//     const checkTodo = (id) => {
//         console.log(id)
//         setTodos((prevTodos) =>
//             prevTodos.map((todo) =>
//                 todo.todoId === id ? { ...todo, done: !todo.done } : todo
//             )
//         );
//         // 기존의 todo 찾기
//         const targetTodo = todos.find((todo) => todo.todoId === id);  // 'id' -> 'todoId'
//         if (!targetTodo) return;
    
//         // 업데이트할 내용
//         const updatedTodo = { ...targetTodo, done: !targetTodo.done };  // done 값 반전
    
//         // PUT 요청으로 업데이트
//         fetch(`${API_BASE_URL}/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(updatedTodo),
//         })
//         .then((res) => res.json())
//         .then((data) => {
//             // 상태 업데이트
//             setTodos((prevTodos) =>
//                 prevTodos.map((todo) => (todo.id === id ? data : todo))  // 'todoId' 비교
//             );
//             console.log("업데이트 성공", data);  // 서버에서 받은 데이터 확인
//         })
//         .catch((error) => {
//             console.error('할 일을 체크하는 중 오류 발생:', error);
//         });
//     };

//     // 초기 데이터 로딩
//     useEffect(() => {
//         fetch(API_BASE_URL)
//             .then((res) => res.json())
//             .then((data) => {
//                 if (Array.isArray(data)) {
//                     setTodos(data); 
//                 } else {
//                     setTodos([]); // 데이터가 배열이 아니면 빈 배열로 초기화
//                 }
//             })
//             .catch((error) => {
//                 console.error('할 일 데이터를 불러오는 중 오류 발생:', error);
//                 setTodos([]); // 오류 발생 시 기본값 설정
//             });
//     }, []);

//     // 남은 할 일 개수 계산
//     const countRestTodo = () => {
//         return Array.isArray(todos) ? todos.filter((todo) => !todo.done).length : 0;
//     };
//     return (
//         <div className="TodoTemplate">
//             <TodoHeader count={countRestTodo()} selectedDate={formatDate(selectedDate)} />
//             <TodoMain todoList={todos} remove={removeTodo} check={checkTodo} />
//             <TodoInput addTodo={addTodo} />
//         </div>
//     );
// };

// export default TodoTemplate;
import React, { useEffect, useState } from 'react';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoInput from './TodoInput';
import '../scss/TodoTemplate.scss';

const TodoTemplate = ({ selectedDate }) => {
    const API_BASE_URL = 'http://localhost:8080/api/todos';

    const [todos, setTodos] = useState([]);
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('ko-KR', options);
    };

    const formattedSelectedDate = new Date(selectedDate.getTime() + (9 * 60 * 60 * 1000)).toISOString().slice(0, 10);
    console.log(formattedSelectedDate)
    // 새로운 할 일 추가
    const addTodo = (todoText) => {
        const newTodo = {
            title: todoText,
            done: false,
            todoDate: formattedSelectedDate  // 선택된 날짜를 할 일에 추가
        };

        fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        })
            .then((res) => res.json())
            .then((data) => {
                // 서버에서 반환한 데이터 추가
                setTodos((prevTodos) => {
                    console.log(Array.isArray(prevTodos))
                    if (!Array.isArray(prevTodos)) {
                        return [data]; // prevTodos가 null이면 빈 배열에 data 추가
                    }
                    return [...prevTodos, data]; // prevTodos가 null이 아니면 기존 배열에 data 추가
                });
                console.log(data);
            })
            .catch((error) => {
                console.error('할 일을 추가하는 중 오류 발생:', error);
            });
    };

    // 삭제 처리 (API 연동)
    const removeTodo = (id) => {
        console.log(id);
        if (!id) {
            console.error("id가 전달되지 않았습니다.");
            return;
        }

        fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`서버에서 삭제 처리 실패: ${res.statusText}`);
                }
                return res.text();
            })
            .then((data) => {
                console.log(data); // 삭제 완료 메시지 확인

                // 삭제 후, 다시 전체 할 일 목록을 불러오기 위한 GET 요청
                fetch(`${API_BASE_URL}/date/${formattedSelectedDate}`)
                    .then((res) => res.json())
                    .then((data) => {
                        // 데이터를 받아서 todos 상태를 갱신
                        if (Array.isArray(data)) {
                            setTodos(data);  // 새로 받은 데이터를 setTodos로 업데이트
                        } else {
                            setTodos([]);  // 오류 발생 시 빈 배열로 초기화
                        }
                    })
                    .catch((error) => {
                        console.error('할 일 목록을 불러오는 중 오류 발생:', error);
                        setTodos([]); // 오류 발생 시 빈 배열로 초기화
                    });
            })
            .catch((error) => {
                console.error('할 일을 삭제하는 중 오류 발생:', error);
            });
    };

    // 할 일 체크 (API 연동)
    const checkTodo = (id) => {
        console.log(id)
        // 상태 업데이트 먼저 수행
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.todoId === id ? { ...todo, done: !todo.done } : todo
            )
        );
    
        // 업데이트할 todo 찾기
        const targetTodo = todos.find((todo) => todo.todoId === id);
        if (!targetTodo) return;
    
        // PUT 요청으로 업데이트
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                done: !targetTodo.done,  // done 값 반전
                title: targetTodo.title,
                todoDate: targetTodo.todoDate
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // 상태 업데이트
                setTodos((prevTodos) =>
                    prevTodos.map((todo) => (todo.todoId === id ? data : todo))  // 'todoId' 비교
                );
                console.log("업데이트 성공", data);  // 서버에서 받은 데이터 확인
            })
            .catch((error) => {
                console.error('할 일을 체크하는 중 오류 발생:', error);
            })
            .finally(() => {
                // 데이터 다시 불러오기
                fetchData();
            });
    };
    const fetchData = () => {
        fetch(`${API_BASE_URL}/date/${formattedSelectedDate}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setTodos(data);
                } else {
                    setTodos([]); // 데이터가 배열이 아니면 빈 배열로 초기화
                }
            })
            .catch((error) => {
                console.error('할 일 데이터를 불러오는 중 오류 발생:', error);
                setTodos([]); // 오류 발생 시 기본값 설정
            });
    };
    // 초기 데이터 로딩
    useEffect(() => {
        fetch(`${API_BASE_URL}/date/${formattedSelectedDate}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setTodos(data);
                } else {
                    setTodos([]); // 데이터가 배열이 아니면 빈 배열로 초기화
                }
            })
            .catch((error) => {
                console.error('할 일 데이터를 불러오는 중 오류 발생:', error);
                setTodos([]); // 오류 발생 시 기본값 설정
            });
    }, [formattedSelectedDate]);

    // 남은 할 일 개수 계산
    const countRestTodo = () => {
        return Array.isArray(todos) ? todos.filter((todo) => !todo.done).length : 0;
    };
    return (
        <div className="TodoTemplate">
            <TodoHeader count={countRestTodo()} selectedDate={formatDate(selectedDate)} />
            <TodoMain todoList={todos} remove={removeTodo} check={checkTodo} />
            <TodoInput addTodo={addTodo} />
        </div>
    );
};

export default TodoTemplate;