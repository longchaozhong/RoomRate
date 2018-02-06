/**
 * Created by lcz on 2018/1/5.
 */
import types from './actionType';
const addTodo = text => {
    return {
        type: types.ADD_TODO,
        param: {
            id: `ID_${new Date().getTime()}`,
            text
        }
    }
};

const setVisibilityFilter = filter => {
    return {
        type: types.SET_VISIBILITY_FILTER,
        filter
    }
};

const toggleTodo = id => {
    return {
        type: types.TOGGLE_TODO,
        id
    }
};

export {
    addTodo, setVisibilityFilter, toggleTodo
}
