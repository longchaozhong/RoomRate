/**
 * Created by lcz on 2018/1/5.
 */
import actionTypes from '../actions/actionType';
const todos = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return [
                ...state,
                {
                    id: action.param.id,
                    text: action.param.text,
                    completed: false
                }
            ];
        case actionTypes.TOGGLE_TODO:
            return state.map(todo => (todo.id === action.id) ? {
                    id: todo.id,
                    text: todo.text,
                    completed: !todo.completed
                } : todo);
        default :
            return state;
    }
};

export default todos;