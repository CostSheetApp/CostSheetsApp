import React, {Component, PropTypes } from 'react';
import moment from 'moment';

import {
    Form,
    Button,
    Modal,
    Input,
    InputNumber,
    DatePicker,
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
                    <FormItem label = "Name">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'Please input name!' }, 
                            ],
                            initialValue: project.name?project.name:""
                    })(
                        <Input  placeholder="name" />
                    )}
                    </FormItem>
                    <FormItem label="Budget">
                    {getFieldDecorator('budget', {
                        rules: [
                            { required: true, message: 'Please input Budget!' }, 
                            ],
                            initialValue: project.budget?project.budget:0
                    })(
                        <InputNumber 
                            min={0}
                            placeholder="Budget"
                        />
                    )}
                    </FormItem>
                    <FormItem label="Profit Percentage">
                    {getFieldDecorator('profitPercentage', {
                        rules: [
                            { required: true, message: 'Please input Profit Percentage!' }, 
                            ],
                            initialValue: project.profitPercentage?project.profitPercentage:0
                    })(
                        <InputNumber 
                            min={0}
                            max={100}
                            placeholder="Profit Percentage"
                        />
                    )}
                    </FormItem>
                    <FormItem label="Start Date">
                    {getFieldDecorator('startDate', {
                        rules: [
                            { required: true, message: 'Please input Start Date!' },  ],
                            initialValue: project.startDate?moment(project.startDate): moment()
                    })(
                        <DatePicker placeholder="Start Date" />
                    )}
                    </FormItem>
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