import { HIDE_LOADING, SHOW_LOADING } from "./actionTypes"

export const actShowLoading = () => {
    return {
        type: SHOW_LOADING
    }
}

export const actHideLoading = () => {
    return {
        type: HIDE_LOADING
    }
}