import { TEST } from '../actions/actionTypes';
//global state
const initialState  = {
    email: '',
    password: '',
    token: undefined
};
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case '?':
            return {
                ...state,
                token: action.t,
            };
    }
    return state
};
export default reducer;