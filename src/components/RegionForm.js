import React, {Component, PropTypes } from 'react';
import {
    Form,
    Button,
    Modal,
    Input
} from 'antd';
const FormItem = Form.Item;

class addRegionForm extends Component {
    constructor(props){
      super(props);
    }  
    render() {
        let {visible, onCancel, onCreate, region,title } = this.props;
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
                        initialValue: region.id?region.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem label="Name">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'Please input Region description!' }, 
                            ],
                            initialValue: region.name?region.name:""
                    })(
                        <Input  placeholder="Region description" />
                    )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

addRegionForm.propTypes = {
    region: PropTypes.object,
    isSaving: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const addRegion = Form.create()(addRegionForm);

export default addRegion;