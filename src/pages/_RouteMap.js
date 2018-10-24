import React from 'react';
import { Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';

import Loader from '../components/common/Loader';
import LayoutWrapper from '../containers/base/LayoutWrapper';
import AuthRoute from '../components/common/AuthRoute';

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
const NoFound = Loadable({
    loader: () => import('./404'),
    loading: Loader
});

const RouteMap = () => (
    <React.Fragment>
        <Switch>
            <Route path="/login" component={Login} />   
            <AuthRoute exact path="/" component={Home} />
            <AuthRoute path="/home" component={Home} />
            <Route path="/article" component={Article} />
            <Route path="/tag" component={Tag} />
            <Route path="/comment" component={Comment} />
            <Route component={NoFound} />
        </Switch>
    </React.Fragment>
);

export default RouteMap;

