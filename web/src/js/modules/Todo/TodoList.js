/**
 * Created by lcz on 2018/1/5.
 */
import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

const TodoList = ({todos, onTodoClick}) => {
    return <ul>
        {todos.map(todo => <Todo key={todo.id} {...todo} onClick={()=>onTodoClick(todo.id)}/>)}
    </ul>
};

TodoList.prototype = {
    todos: PropTypes.arrayOf({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    onTodoClick: PropTypes.func.isRequired
};

export default TodoList;