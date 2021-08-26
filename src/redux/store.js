import { combineReducers } from 'redux';
import { login,infoLogin,setUrlQRVanTai } from './reducers/infoUser';

const rootReducer = combineReducers({
    login,
    infoLogin,
    setUrlQRVanTai
    // alert,
    // common,
    // setinfohuman,
});

export default rootReducer;
