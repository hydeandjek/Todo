// import React from 'react'
// import '../scss/TodoMain.scss'
// import TodoItem from './TodoItem'

// const TodoMain = ({ todoList = [], remove, check }) => {
//   console.log(todoList);
//   return (
//     <ul className="todo-list">
//       {todoList?.map((todo) =>
//         todo ? ( 
//           <TodoItem key={todo.id} item={todo} remove={remove} check={check} />
//         ) : null
//       )}
//     </ul>
//   );
// };

// export default TodoMain

import React from 'react';
import '../scss/TodoMain.scss';
import TodoItem from './TodoItem';

const TodoMain = ({ todoList = [], remove, check }) => {
  const handleCheck = (id) => {
    check(id);
  };

  const handleRemove = (id) => {
    remove(id);
  };

  return (
    <ul className="todo-list">
      {todoList?.map((todo) => {
        return todo ? (
          <TodoItem
            key={todo.todoId}
            item={todo}
            onCheck={() => handleCheck(todo.todoId)}
            onRemove={() => handleRemove(todo.todoId)}
          />
        ) : null;
      })}
    </ul>
  );
};

export default TodoMain;

// import React from 'react'
// import '../scss/TodoMain.scss'
// import TodoItem from './TodoItem'

// const TodoMain = ({ todoList = [], remove, check }) => {
//   return (
//     <ul className="todo-list">
//       {todoList?.map((todo, index) => {
//         if (!todo) {
//           console.warn(`todoList[${index}]가 undefined입니다.`);
//           return null;
//         }

//         console.log(`Todo ID: ${todo?.id}, Title: ${todo.title}`);

//         return (
//           <TodoItem key={todo.id} item={todo} remove={remove} check={check} />
//         );
//       })}
//     </ul>
//   );
// };

// export default TodoMain;