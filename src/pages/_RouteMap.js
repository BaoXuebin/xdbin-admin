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
const Blog = Loadable({
    loader: () => import('./Blog'),
    loading: Loader
});
const AddOrUpdateBlog = Loadable({
    loader: () => import('./blog/Add'),
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
const BookDetail = Loadable({
    loader: () => import('./ext/book/Detail'),
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
            <AuthRoute exact path="/" component={Blog} />
            <AuthRoute exact path="/home" component={Home} />
            <AuthRoute exact path="/blog" component={Blog} />
            <AuthRoute exact path="/blog/add" component={AddOrUpdateBlog} />
            <AuthRoute exact path="/blog/:blogId" component={AddOrUpdateBlog} />
            <AuthRoute exact path="/tag" component={Tag} />
            <AuthRoute exact path="/comment" component={Comment} />
            <AuthRoute exact path="/ext/video" component={Video} />
            <AuthRoute exact path="/ext/mood" component={Mood} />
            <AuthRoute exact path="/ext/book" component={Book} />
            <AuthRoute exact path="/ext/book/:bookId" component={BookDetail} />
            <AuthRoute component={NoFound} />
        </Switch>
    </React.Fragment>
);

export default RouteMap;

