import React, {Component,PropTypes} from 'react';
//import '../styles/empty-layout.css';
import { Layout } from 'antd';
const { Content,Footer } = Layout;


class EmptyLayout extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout style={{ height: '100%'}}>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
           <Footer>footer</Footer>
      </Layout>
    );
  }
}

EmptyLayout.propTypes = {
    children: PropTypes.object,
};

export default EmptyLayout;