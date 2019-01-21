import React, { Component } from 'react';
import { Layout, Icon, Col, Row, Menu, Dropdown, Button, Avatar } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import '../styles/LayoutWrapper.css';
import LayoutMenu from './LayoutMenu';
import Breadcrumb from '../../components/common/Breadcrumb';
import { toggleSliderStatus, logout } from '../../redux/actions/CommonAction';
import Config from '../../config/Config';
import { logoutReq } from '../../api/ManaReq';

const { Header, Sider, Content, Footer } = Layout;
  
class LayoutWrapper extends Component {
    toggle = () => {
        this.props.toggleSliderStatus();
    }

    handleLogout = () => {
        logoutReq()
            .then(() => {
                this.props.logout();
            })
            .catch((e) => { console.error(e); });
    };

    handleNavigateAddBlog = () => {
        this.props.history.push('/blog/add');
    };

    render() {
        const { user, collapsed } = this.props;
        return (
            <Layout id="layout-container">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, zIndex: 100 }}
                >
                    <div className="logo" />
                    <LayoutMenu collapsed={collapsed} />
                </Sider>
                <Layout style={{ marginLeft: collapsed ? 80 : 200, minHeight: '100vh' }}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Row>
                            <Col span={12}>
                                <Icon
                                    className="trigger"
                                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                                <span style={{ fontSize: '16px', fontWeight: 'bolder' }}>{Config.title}</span>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right', paddingRight: '2rem' }}>
                                <Link to={`/blog/add`}>
                                    <Button type="primary" icon="plus" style={{ marginRight: '1rem' }}>博客</Button>
                                </Link>
                                { user &&
                                    <Dropdown overlay={
                                        <Menu>
                                            <Menu.Item key="1" disabled>
                                                @{user.userName}
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item key="logout" onClick={this.handleLogout}>
                                                退出登录
                                            </Menu.Item>
                                        </Menu>
                                    }>
                                        <span style={{ cursor: "pointer" }}>
                                            <Avatar icon="user" src="http://cdn.xdbin.com/pics/20181120000045" /> <Icon type="down" color="#aaa" />
                                        </span>
                                    </Dropdown>
                                }
                            </Col>
                        </Row>
                        
                    </Header>
                    <div style={{ margin: '12px 16px', padding: 8 }}>
                        <Breadcrumb />
                    </div>
                    <Content style={{ margin: '0 16px 24px 16px', padding: '0 24px', minHeight: 280 }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        {Config.copyright}
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    collapsed: state.common.collapsed,
    user: state.common.user
});

const mapDispatchToProps = dispatch => ({
    toggleSliderStatus: bindActionCreators(toggleSliderStatus, dispatch),
    logout: bindActionCreators(logout, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(LayoutWrapper);