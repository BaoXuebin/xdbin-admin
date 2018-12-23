import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initMatchPath, setBreadcrumbName } from '../redux/actions/CommonAction';

const mapDispatchToProps = dispatch => ({
    initMatchPath: bindActionCreators(initMatchPath, dispatch),
    setBreadcrumbName: bindActionCreators(setBreadcrumbName, dispatch)
});

export default ChildComponent => connect(null, mapDispatchToProps)(
    class extends Component {
        componentWillMount() {
            this.props.setBreadcrumbName(ChildComponent.breadcrumbName);
            const{ location } = this.props;
            this.props.initMatchPath(location);
        }

        render() {
            return (
                <ChildComponent params={this.props.match.params} { ...this.props } />
            );
        }
    }
);