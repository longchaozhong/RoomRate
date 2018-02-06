/**
 * Created by lcz on 2018/1/5.
 */
import typs from '../actions/actionType';
const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case typs.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export default visibilityFilter