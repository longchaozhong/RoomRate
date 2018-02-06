import {createStore} from 'redux';

const reducers = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.param];
        case 'DELETE':
            return state.filter(item => {
                return item.id !== action.id;
            });
        case 'TOGGLE':
            return state.filter(item => {
                if (item.id === action.id) {
                    item.done = !item.done;
                }
                return item;
            });
        default:
            return state;
    }
};


let store = createStore(reducers);

store.subscribe(() => {

});

