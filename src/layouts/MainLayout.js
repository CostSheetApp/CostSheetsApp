import React,{Component,PropTypes} from 'react';
import '../styles/main-layout.css';
import { Layout, Icon, Dropdown, Menu, Row, Col } from 'antd';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import MainMenu from '../components/MainMenu';
import {Logout} from '../actions/accountActions';
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
    let {changeLocationTo,username,logout}=this.props;
    const menu = (
  <Menu onClick={()=>logout()}>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">My account</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" ><Icon type="logout" /> Log Out</Menu.Item>
  </Menu>
);
    return (
      <Layout style={{ height: '100%'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <MainMenu changeLocationTo={(key) => changeLocationTo(key)} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Row type="flex" justify="space-between">
              <Col>
                <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
              </Col>
              <Col>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link user-menu" href="#" >
                 {username} <Icon type="user"/>
                </a>
             </Dropdown>
              </Col>
            </Row>
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
    changeLocationTo:PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    username: state.account.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLocationTo: (location) => {
      dispatch(push(location));
    },
    logout: ()=>{
      dispatch(Logout());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);