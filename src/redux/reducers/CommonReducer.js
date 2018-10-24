import { CommonActionTypes } from '../actions/CommonAction';
import { get, put } from '../../utils/Storage';

const initState = {
    user: {userId:"BaoXuebin",userName:"包学斌",token:"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCYW9YdWViaW4iLCJjcmVhdGVkIjoxNTQwMzkwMTg0NDIxLCJleHAiOjE1NDAzOTM3ODR9.-EcyTMW0K-Di_625LNKV7vdXuySLbQMc86FcfRxVMAw"},
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