import React from 'react';
import { connect } from 'react-redux';
import {
    Route,
    Redirect
} from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest, user }) => (
    <Route
        {...rest}
        render={props =>
            user ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = state => ({
    user: state.common.user
});

export default connect(mapStateToProps, null)(AuthRoute);
