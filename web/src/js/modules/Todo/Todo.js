/**
 * Created by lcz on 2018/1/5.
 */
import React from 'react';
import PropTypes from 'prop-types';

class Todo extends React.Component {
    render() {
        const {onClick, completed, text} = this.props;
        return <li onClick={onClick} style={{textDecoration:completed ? 'line-through' : 'none'}}>{text}</li>;
    }
}
Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};
export default Todo;