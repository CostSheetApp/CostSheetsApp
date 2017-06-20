import React, {Component, PropTypes } from 'react';
import {
    Form,
    Button,
    Modal,
    Input
} from 'antd';
const FormItem = Form.Item;

class addJobForm extends Component {
    constructor(props){
      super(props);
    }  
    render() {
        let {visible, onCancel, onCreate, job,title } = this.props;
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
                        initialValue: job.id?job.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem label="Description">
                    {getFieldDecorator('description', {
                        rules: [
                            { required: true, message: 'Please input Region description!' }, 
                            ],
                            initialValue: job.description?job.description:""
                    })(
                        <Input  placeholder="Job description" />
                    )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

addJobForm.propTypes = {
    job: PropTypes.object,
    isSaving: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const addJob = Form.create()(addJobForm);

export default addJob;