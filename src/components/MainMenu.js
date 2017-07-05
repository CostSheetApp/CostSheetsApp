import React, { Component, PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import CubesIcon from 'react-icons/lib/fa/cubes';
class MainMenu extends Component {
    render() {
        let {changeLocationTo}=this.props;
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} onClick={({ key }) => changeLocationTo(key)}>
            <Menu.Item key="/">
              <Icon type="home" />
              <span className="nav-text">Inicio</span>
            </Menu.Item>
            <Menu.Item key="/projects">
              <Icon type="wallet" />
              <span className="nav-text">Proyectos</span>
            </Menu.Item>
            <Menu.Item key="/cost-sheets">
              <Icon type="file" />
              <span className="nav-text">Fichas de Costos</span>
            </Menu.Item>
            <Menu.Item key="/regions" >
              <Icon type="folder" />
              <span className="nav-text">Regiones</span>
            </Menu.Item>
            <Menu.Item key="/materials">
              <CubesIcon className="anticon"/>
              <span className="nav-text">Materiales</span>
            </Menu.Item>
            <Menu.Item key="/tools-equipments" >
              <Icon type="tool" />
              <span className="nav-text">Herramientas y Equipo</span>
            </Menu.Item>
            <Menu.Item key="/man-powers" >
              <Icon type="line-chart" />
              <span className="nav-text">Mano de Obra</span>
            </Menu.Item>
            <Menu.Item key="/jobs" >
              <Icon type="idcard" />
              <span className="nav-text">Puestos de Trabajo</span>
            </Menu.Item>
            
            {/*
            <Menu.Item key="/users" >
              <Icon type="usergroup-add" />
              <span className="nav-text">Users</span>
            </Menu.Item>
            */}
            {/*<Menu.Item key="/reports">
              <Icon type="copy" />
              <span className="nav-text">Reports</span>
            </Menu.Item>
            <Menu.Item key="/finances">
              <Icon type="credit-card" />
              <span className="nav-text">Finances</span>
            </Menu.Item>*/}
            
          </Menu>
        );
    }
}

MainMenu.propTypes = {
    changeLocationTo: PropTypes.func.isRequired,
};

export default MainMenu;