import React, {Component, PropTypes } from 'react';
//import Moment from 'react-moment';
//import Mayre from 'mayre';
import {
    Form,
    Button,
    Modal
    //Input,
    //Icon,
    //Table,
    //Col,
    //Select
    //Row
} from 'antd';
//const FormItem = Form.Item;
//const Option = Select.Option;

Array.prototype.first = function () {
    if(this.length<=0) return;
    return this[0];
};

class AddCostSheetMaterialForm extends Component {
    componentWillMount() {
 
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            isSaving
        } = this.props;
        //let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={"Add Material"}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Submit </Button >
                    ]}>
                <Form>
                  
                </Form>
            </Modal>
        );
    }
}

AddCostSheetMaterialForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const AddCostSheetMaterial = Form.create()(AddCostSheetMaterialForm);

export default AddCostSheetMaterial;