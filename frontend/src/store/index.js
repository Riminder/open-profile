import { combineReducers } from 'redux'
import profileReducer from './reducers/reducer'

export default combineReducers({ 
    profile: profileReducer,
})