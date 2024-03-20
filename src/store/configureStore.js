import { createStore, combineReducers } from 'redux';
import reducer from '../store/reducers/root';

const configureStore = () => {
    return createStore(reducer);
};
export default configureStore;