import React from 'react';
import { Route } from "react-router-dom";
import Loadable from 'react-loadable';

import Loader from '../components/common/Loader';

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loader
});
const Home = Loadable({
    loader: () => import('./Home'),
    loading: Loader
});
const Article = Loadable({
    loader: () => import('./Article'),
    loading: Loader
});
const Tag = Loadable({
    loader: () => import('./Tag'),
    loading: Loader
});
const Comment = Loadable({
    loader: () => import('./Comment'),
    loading: Loader
});

const RouteMap = () => (
    <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/article" component={Article} />
        <Route path="/tag" component={Tag} />
        <Route path="/comment" component={Comment} />
    </React.Fragment>
);
const SimpleRouteMap = () => (
    <React.Fragment>
        <Route path="/login" component={Login} />
    </React.Fragment>
);

export default { RouteMap, SimpleRouteMap };

