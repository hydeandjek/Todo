import React, { useState } from 'react'
import '../scss/TodoInput.scss';
import { MdAdd } from 'react-icons/md';
import cn from 'classnames'

const TodoInput = ({addTodo}) => {

    //입력창 open 상태변수
    const [open, setOpen] =useState(false);

    //입력창 내용 상태값
    const [todoText, setTodoText] = useState('');
    // MdAdd 클릭시
    const onToggle = ()=>{
        setOpen(!open);
    };

    const todoChangeHandler= (e) =>{
        setTodoText(e.target.value);
    }

    const submitHandler= (e) => {
        e.preventDefault(); // submit 막기
        addTodo(todoText);
        // 입력이 끝나면 입력창 비우기
        setTodoText('');
    }

  return (
    <>
        {open && (
            <div className='form-wrapper'>
                <form  
                    className='insert-form'
                    onSubmit={submitHandler}
                >
                    <input 
                        type='text' placeholder='할 일을 입력 후, 엔터를 누르세요.' 
                        onChange={todoChangeHandler}
                        value={todoText}
                    />
                </form>
            </div>
        )}

        <button className={cn('insert-btn',{ open })} onClick={onToggle}>
            <MdAdd />
        </button>
    </>
  )
}

export default TodoInput