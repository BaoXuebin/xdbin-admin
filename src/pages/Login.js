import React, { Component, Fragment } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './styles/Login.less';
import { initUser } from '../redux/actions/CommonAction';
import { loginReq, defaultHandleError } from '../api/ManaReq';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { userName, password } = values;
                loginReq({ username: userName, password })
                    .then((res) => {
                        const { code, error } = res;
                        if (code && code !== 200) {
                            message.error(error);
                            return;
                        }
                        this.props.initUser(res);
                        this.props.history.push('/');
                    })
                    .catch(defaultHandleError);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                <div key="login-bg" className="bg">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem className="title">
                            陆止于此，海始于斯。
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" autoComplete="username" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" autoComplete="current-password" />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </FormItem>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    initUser: bindActionCreators(initUser, dispatch)
});

const mapStateToProps = state => ({
    user: state.common.user
});

const WrappedNormalLoginForm = Form.create()(connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm));

export default WrappedNormalLoginForm;
