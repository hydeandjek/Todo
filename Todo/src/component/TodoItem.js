import React from 'react';
import '../scss/TodoItem.scss';
import { MdDelete, MdDone } from 'react-icons/md';
import cn from 'classnames';

const TodoItem = ({ item, onCheck, onRemove }) => {
  if (!item) return null;

  const { todoId, title, done } = item;

  return (
    <li className="todo-list-item">
      <div className={cn("check-circle", { active: done })} onClick={onCheck}>
        <MdDone />
      </div>
      <span className={cn("text", { finish: done })}>{title}</span>
      <div className="remove" onClick={onRemove}>
        <MdDelete />
      </div>
    </li>
  );
};

export default React.memo(TodoItem);