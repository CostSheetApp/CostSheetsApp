import React,{Component,PropTypes} from 'react';
import '../styles/main-layout.css';
import { Layout, Menu, Icon } from 'antd';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
const { Header, Sider, Content } = Layout;


class MainLayout extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    let {changeLocationTo}=this.props;
    return (
      <Layout style={{ height: '100%'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} onClick={({ key }) => changeLocationTo(key)}>
            <Menu.Item key="/">
              <Icon type="pie-chart" />
              <span className="nav-text">dashboard</span>
            </Menu.Item>
            <Menu.Item key="/appoitments">
              <Icon type="calendar" />
              <span className="nav-text">Appoitments</span>
            </Menu.Item>
            <Menu.Item key="/patients" >
              <Icon type="usergroup-add" />
              <span className="nav-text">Patients</span>
            </Menu.Item>
            <Menu.Item key="/reports">
              <Icon type="copy" />
              <span className="nav-text">Reports</span>
            </Menu.Item>
            <Menu.Item key="/finances">
              <Icon type="credit-card" />
              <span className="nav-text">Finances</span>
            </Menu.Item>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
    children: PropTypes.object,
    changeLocationTo:PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLocationTo: (location) => {
      dispatch(push(location));
    }
  };
};

export default connect(null,mapDispatchToProps)(MainLayout);