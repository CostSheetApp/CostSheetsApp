import React, {Component, PropTypes } from 'react';
import {
    Form,
    Button,
    Modal
} from 'antd';
const FormItem = Form.Item;

class addMaterialForm extends Component {
    componentDidMount() {
        let {FetchMaterialCostHistory} = this.props;
        
    }
    render() {
        let {visible, onCancel, onCreate, material, costHistory,isSaving } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title="Add Material"
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate}> Submit </Button >
                    ]}>
                <Form>
                </Form>
            </Modal>
        );
    }
}

addMaterialForm.propTypes = {
    FetchMaterialCostHistory: PropTypes.func.isRequired,
    material: PropTypes.object,
    costHistory: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired
};

const addMaterial = Form.create()(addMaterialForm);

export default addMaterial;