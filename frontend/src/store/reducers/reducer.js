import  * as actionTypes from '../actions/types'
import { updateObject } from '../../utils/utils'


const initialState = {
    profileFile: {},
}

const postProfileRequest = (state, action) => {
    return updateObject( state, {
        profileFile: { r: true, payload: state.profileFile }
    })
}

const postProfileSuccess = (state, action) => {
    return updateObject( state, {
        profileFile: { s: true, payload: action.res }
    })
}

const postProfileFail = (state, action) => {
    return updateObject( state, {
        profileFile: { f: true }
    })
}


const profileReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.POST_PROFILE_REQUEST: return postProfileRequest( state, action )
        case actionTypes.POST_PROFILE_SUCCESS: return postProfileSuccess( state, action )
        case actionTypes.POST_PROFILE_FAIL: return postProfileFail( state, action )
        default: return state
    }
}

export default profileReducer