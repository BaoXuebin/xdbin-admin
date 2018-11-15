import { CommonActionTypes } from '../actions/CommonAction';
import { get, put } from '../../utils/Storage';

const initState = {
    user: null,
    path: '',
    query: '',
    collapsed: get('_collapsed') || false
};

const CommonReducer = (state = initState, action) => {
    switch (action.type) {
        case CommonActionTypes.INIT_MATCH_PATH:
            return { ...state, path: action.location.pathname, query: action.location.search };
        case CommonActionTypes.TOGGLE_SLIDER_STATUS: {
            put('_collapsed', !state.collapsed);
            return { ...state, collapsed: !state.collapsed };
        }
        case CommonActionTypes.LOGIN: {
            return { ...state, user: action.user };
        }
        default:
            return state;
    }
};

export default CommonReducer;