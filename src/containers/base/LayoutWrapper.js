import React, { Component } from 'react';
import { Layout, Icon, Col, Row, Menu, Dropdown } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
                                { user &&
                                    <Dropdown overlay={
                                        <Menu>
                                            <Menu.Item onClick={this.handleLogout}>
                                                退出登录
                                            </Menu.Item>
                                        </Menu>
                                    }>
                                        <span style={{ cursor: "pointer" }}>
                                            {user.userName} <Icon type="down" />
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