import {compineReducers} from 'redux';
import {user} from './user';

const Reducers=compineReducers({
    useState:user
})

export default Reducers