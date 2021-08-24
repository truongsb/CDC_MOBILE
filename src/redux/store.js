import { combineReducers } from 'redux';
import { login,infoLogin } from './reducers/infoUser';

const rootReducer = combineReducers({
    login,
    infoLogin
    // alert,
    // common,
    // setinfohuman,
});

export default rootReducer;
