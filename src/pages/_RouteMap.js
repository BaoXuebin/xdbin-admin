import React from 'react';
import { Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';

import Loader from '../components/common/Loader';
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
const Video = Loadable({
    loader: () => import('./ext/Video'),
    loading: Loader
});
const Mood = Loadable({
    loader: () => import('./ext/Mood'),
    loading: Loader
});
const Book = Loadable({
    loader: () => import('./ext/Book'),
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
            <AuthRoute path="/article" component={Article} />
            <AuthRoute path="/tag" component={Tag} />
            <AuthRoute path="/comment" component={Comment} />
            <AuthRoute path="/ext/video" component={Video} />
            <AuthRoute path="/ext/mood" component={Mood} />
            <AuthRoute path="/ext/book" component={Book} />
            <AuthRoute component={NoFound} />
        </Switch>
    </React.Fragment>
);

export default RouteMap;

