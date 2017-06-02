import React, { Component, PropTypes } from 'react';
import {Table,Row,Button, Icon,Popconfirm} from 'antd';
import '../styles/users.css';
import UserForm from './UserForm';

class Users extends Component {
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        },{
          title: 'User Name',
          dataIndex: 'username',
          key: 'username'
        },{
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        }, {
          title: 'Action',
          key: 'action',
          width: 120,
          render: (text, user, index) => (
            <span>
              <a href="#" onClick={() => this.onEdit(index,user) } > <Icon type="edit" /> Edit</a>
              <span className="ant-divider" />
              <Popconfirm title="Are you sure delete this user?" okText="Yes" cancelText="No" onConfirm={() => this.onDelete(index,user)}>
                  <a href="#"> <Icon type="delete" /> Delete</a>
              </Popconfirm>
            </span>
          ),
        }];
        this.handle = this.handleCreate;
        this.title = "Add Usuario";
        this.user={};
    }  
    componentWillMount() {
        let { FetchUsers } = this.props
        FetchUsers();
    }
    onDelete(index,user){
      console.log(user);
      alert(index);

    }
    onEdit(index,user){
        this.handle = this.handleEdit;
        this.title = "Edit User";
        this.user = user;
        this.setState({ visible: true });
        console.log(user);      
    }
    onCreate(){
        this.handle = this.handleCreate;
        this.title = "Add Users";
        this.user = {};
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }
        let { AddUser } = this.props;
        delete values.id;
        AddUser(values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    handleEdit = () => {
        
        const form = this.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }
        let { EditUser } = this.props;
        var id = values.id;
        delete values.id;
        EditUser(id, values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        let {users,loading,isSaving} = this.props;
        return (
            <Row>
                <UserForm 
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handle}
                user={this.user}
                isSaving={isSaving}
                title={this.title}
                />

                <Row><Button type="primary" icon="plus" className="add-user-button" onClick={()=>this.onCreate()}>Add</Button></Row>
                <Table rowKey={item => item.id} size="middle" bordered={true} loading={loading} dataSource={users} columns={this.columns} pagination={{pageSize:20}} />
            </Row>
        );
    }
}

Users.propTypes = {
    FetchUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired
};


export default Users;