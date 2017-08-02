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
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancelar </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate}> Aceptar </Button >
                    ]}>
                <Form>
                    {getFieldDecorator('id', {
                        initialValue: job.id?job.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem label="Descripción">
                    {getFieldDecorator('description', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese la descripción!' }, 
                            ],
                            initialValue: job.description?job.description:""
                    })(
                        <Input  placeholder="Descripción del puesto de trabajo" />
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
    onCreate: PropTypes.func.isRequired,
    form: PropTypes.objectOf({
        getFieldDecorator: PropTypes.object.isRequired,
        validateFields: PropTypes.object.isRequired,
    }).isRequired,
};

const addJob = Form.create()(addJobForm);

export default addJob;