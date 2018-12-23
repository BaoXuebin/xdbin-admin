import React from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const pathMap = {
    'home': '首页',
    'tag': '标签管理',
    'article': '文章管理',
    'comment': '留言管理',
    'video': '短片管理',
    'ext': '扩展',
    'mood': '时间轴',
    'book': '我的书籍',
};

const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>;
};

const mapStateToProps = state => ({
    path: state.common.path,
    breadcrumbName: state.common.breadcrumbName
});

export default connect(mapStateToProps, null)(({ path, breadcrumbName }) => {
    const paths = path.split('/').filter(s => s);
    if (breadcrumbName) {
        paths[paths.length - 1] = breadcrumbName;
    }
    const routes = paths.map(p => ({ path: p, breadcrumbName: pathMap[p] || p }));
    return (
        <Breadcrumb itemRender={itemRender} routes={routes}/>
    );
}); 

