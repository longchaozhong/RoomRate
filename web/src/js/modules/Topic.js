import React from 'react';
import AddTodo from './Todo/containers/AddTodo';
import Footer from './Todo/Footer';
import VisibleTodoList from './Todo/containers/VisibleTodoList';

export default ({match}) => (
    <div>
        <VisibleTodoList/>
        <AddTodo/>
        <Footer/>
    </div>
)