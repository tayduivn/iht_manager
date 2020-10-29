const { SHOW_LOADING, HIDE_LOADING } = require("../actions/actionTypes");

var initailState = false

const isLoading = (state = initailState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            state = true
            return state
        case HIDE_LOADING:
            state = false
            return state
        default:
            return state;
    }
}

export default isLoading