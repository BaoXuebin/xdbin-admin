import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
import { validateReq } from '../../api/ManaReq';
import { initUser } from '../../redux/actions/CommonAction';
import Loader from './Loader';

class AuthRoute extends Component {
    constructor(props) {
        super(props);
        this.state = { user: this.props.user };
    }

    req() {
        validateReq()
            .then((user) => {
                this.setState({ user }, () => {
                    this.props.initUser(user);
                });
            })
            .catch((error) => { console.log(error); });
    }

    componentWillMount() {
        if (!this.user) {
            this.req();
        }
    }

    render() {
        const { component: Component, ...rest } = this.props;
        console.log(this.user);
        return (
            <Route
                {...rest}
                render={props =>
                    this.state.user ? (
                        <Component {...props} />
                    ) : (
                        <Loader />
                    )
                }
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.common.user
});

const mapDispatchToProps = dispatch => ({
    initUser: bindActionCreators(initUser, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
