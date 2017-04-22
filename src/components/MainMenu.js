import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
class MainMenu extends Component {
    render() {
        let {changeLocationTo}=this.props;
        return (
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
        );
    }
}

MainMenu.propTypes = {
    changeLocationTo: PropTypes.func.isRequired,
};

export default MainMenu;