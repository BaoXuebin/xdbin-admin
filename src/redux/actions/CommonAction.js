export const CommonActionTypes = {
    INIT_MATCH_PATH: 'INIT_MATCH_PATH',
    SET_BREADCRUME: 'SET_BREADCRUME',
    INIT_SLIDER_STATUS: 'INIT_SLIDER_STATUS',
    TOGGLE_SLIDER_STATUS: 'TOGGLE_SLIDER_STATUS',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
};

// 初始化请求的路由信息
export const initMatchPath = location => ({
    type: CommonActionTypes.INIT_MATCH_PATH,
    location
});

// 初始化侧栏状态
export const initSliderStatus = collapsed => ({
    type: CommonActionTypes.INIT_SLIDER_STATUS,
    collapsed
});

// 收起/展开 侧栏
export const toggleSliderStatus = () => ({
    type: CommonActionTypes.TOGGLE_SLIDER_STATUS
});

// 登陆
export const initUser = user => ({
    type: CommonActionTypes.LOGIN,
    user
});

export const logout = () => ({
    type: CommonActionTypes.LOGOUT
});

// 更新面包屑
export const setBreadcrumbName = breadcrumbName => ({
    type: CommonActionTypes.SET_BREADCRUME,
    breadcrumbName
});