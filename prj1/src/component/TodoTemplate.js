import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoInput from './TodoInput'
import '../scss/TodoTemplate.scss'

const TodoTemplate = () => {
    const API_BASE_URL = 'http://localhost:8080/api/todos';

    const [todos,setTodos] = useState([
        {
            id:1,
            title: '머시깽',
            done:false,
        },
        {
            id:2,
            title: '머시깽',
            done:true,
        }
    ])

    const makeNewId=()=>{
        if(todos.length === 0 ) return 1;
        return todos[todos.length-1].id+1;
    };

    const addTodo = (todoText) => {
        const newTodo = {
            title:todoText,
        };
        fetch(API_BASE_URL,{
            method:'POST',
            headers : {'content-type' : 'application/json'},
            body : JSON.stringify(newTodo),
        })
        .then((res)=>res.json())
        .then((data) => {
            setTodos((prevTodos) => [...prevTodos, data]); // 기존 할 일 목록 + 새 할 일 추가
          })
    };

    //삭제 처리
    const removeTodo = (id) =>{
        setTodos(todos.filter((todos)=>todos.id!==id));
    } 

    //할일 체크
    const checkTodo = (id)=>{
        setTodos(
            todos.map((todo)=>
                todo.id === id 
                ? {...todo, done : !todo.done} 
                : todo,
            ),
        );
    }

    
    
    const countRestTodo=()=>{
        const filteredTodos = todos.filter((todo)=> !todo.done);
        return filteredTodos.length;
    };
  return (
    <div className='TodoTemplate'>
        <TodoHeader count={countRestTodo}/>
        <TodoMain  
            todoList={todos} 
            remove={removeTodo}   
            check={checkTodo}/>
        <TodoInput addTodo={addTodo}/>
    </div>
  );
};

export default TodoTemplate 