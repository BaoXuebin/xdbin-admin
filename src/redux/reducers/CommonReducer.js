import { CommonActionTypes } from '../actions/CommonAction';
import { get, put } from '../../utils/Storage';

const initState = {
    user: null,
    path: '',
    query: '',
    breadcrumbName: '海边的卡夫卡',
    collapsed: get('_collapsed') || false
};

const CommonReducer = (state = initState, action) => {
    switch (action.type) {
        case CommonActionTypes.INIT_MATCH_PATH: {
            let path = action.location.pathname;
            if (path === '/') {
                path = '/blog';
            }
            return { ...state, path, query: action.location.search };
        }
        case CommonActionTypes.TOGGLE_SLIDER_STATUS: {
            put('_collapsed', !state.collapsed);
            return { ...state, collapsed: !state.collapsed };
        }
        case CommonActionTypes.LOGIN: {
            return { ...state, user: action.user };
        }
        case CommonActionTypes.LOGOUT: {
            return { ...state, user: null };
        }
        case CommonActionTypes.SET_BREADCRUME: {
            return { ...state, breadcrumbName: action.breadcrumbName };
        }
        default:
            return state;
    }
};

export default CommonReducer;