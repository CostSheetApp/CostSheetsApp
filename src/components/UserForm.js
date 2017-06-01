import React, {Component, PropTypes } from 'react';
import {
    Form,
    Button,
    Modal,
    Input
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
                    <FormItem>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'Please input User name!' }, 
                            ],
                            initialValue: user.name?user.name:""
                    })(
                        <Input  placeholder="User name" />
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
};

const addUser = Form.create()(addUserForm);

export default addUser;