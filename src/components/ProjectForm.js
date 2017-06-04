import React, {Component, PropTypes } from 'react';
import {
    Form,
    Button,
    Modal,
    Input,
    InputNumber,
    Icon
} from 'antd';
const FormItem = Form.Item;

class addProjectForm extends Component {
    constructor(props){
      super(props);
    }  
    render() {
        let {visible, onCancel, onCreate, project,title } = this.props;
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
                        initialValue: project.id?project.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'Please input name!' }, 
                            ],
                            initialValue: project.name?project.name:""
                    })(
                        <Input  placeholder="name" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('profitPercentage', {
                        rules: [
                            { required: true, message: 'Please input Profit Percentage!' }, 
                            ],
                            initialValue: project.profitPercentage?project.profitPercentage:""
                    })(
                        <InputNumber placeholder="Profit Percentage" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: 'Please input email!' }, 
                            ],
                            initialValue: user.email?user.email:""
                    })(
                        <Input type="number" placeholder="email" />
                    )}
                    </FormItem>
                    <FormItem>
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


addProjectForm.propTypes = {
    project: PropTypes.object,
    isSaving: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

const addProject = Form.create()(addProjectForm);

export default addProject;