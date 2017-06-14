import React, {Component, PropTypes } from 'react';
import {
    Form,
    Button,
    Modal,
    Input,
    Icon
} from 'antd';
const FormItem = Form.Item;

class addUserForm extends Component {
    constructor(props){
      super(props);
    }  
    render() {
        let {visible, onCancel, onCreate, user,title } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate}> Submit </Button >
                    ]}>
                <Form>
                    {getFieldDecorator('id', {
                        initialValue: user.id?user.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem label="Name">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'Please input name!' }, 
                            ],
                            initialValue: user.name?user.name:""
                    })(
                        <Input  placeholder="name" />
                    )}
                    </FormItem>
                    <FormItem label="Username">
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: 'Please input username!' }, 
                            ],
                            initialValue: user.username?user.username:""
                    })(
                        <Input  placeholder="username" />
                    )}
                    </FormItem>
                    <FormItem label ="Email">
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: 'Please input email!' }, 
                            ],
                            initialValue: user.email?user.email:""
                    })(
                        <Input  placeholder="email" />
                    )}
                    </FormItem>
                    <FormItem label="Password">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input password!' }],
                            initialValue: user.password?user.password:""
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}


addUserForm.propTypes = {
    user: PropTypes.object,
    isSaving: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const addUser = Form.create()(addUserForm);

export default addUser;