import fileDownload from 'js-file-download'
import * as actionTypes from './types'
import axiosApi from '../../utils/axiosApi'

export const postProfileRequest = () => {
    return {
        type: actionTypes.POST_PROFILE_REQUEST,
    };
};

export const postProfileSuccess = (res) => {
    return {
        type: actionTypes.POST_PROFILE_SUCCESS,
        res,
    };
};

export const postProfileFail = (error) => {
    return {
        type: actionTypes.POST_PROFILE_FAIL,
        error,
    };
};

export const postProfile = (payload, file) => {
    return dispatch => {
        dispatch(postProfileRequest())
        const fd = new FormData()
        fd.append('myImage', file)
        fd.append('name', payload.firstName +' '+ payload.lastName)
        fd.append('birthDate', payload.birthDate)
        fd.append('family_situation', payload.familySituation)
        fd.append('email', payload.email)
        fd.append('phone', payload.phone)
        fd.append('address', payload.address)
        fd.append('title', payload.title)
        fd.append('experiences', JSON.stringify(payload.experiences))
        fd.append('educations', JSON.stringify(payload.educations))
        fd.append('skills', JSON.stringify(payload.skills))
        fd.append('languages', JSON.stringify(payload.languages))
        axiosApi.post( '', fd)
            .then( response => {
               const file = new Blob([response.data])
               fileDownload(file, 'resume.pdf')
               dispatch(postProfileSuccess())
            } )
            .catch( err => {
                dispatch(postProfileFail(err))
            } )
    }
}
