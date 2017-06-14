import React, {Component, PropTypes } from 'react';
import Moment from 'react-moment';
import Mayre from 'mayre';
import {
    Form,
    Button,
    Modal,
    Input,
    Icon,
    Table,
    Col,
    Select,
    Row
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

Array.prototype.first = function () {
    if(this.length<=0) return;
    return this[0];
};

Number.prototype.padZero= function(len, c){
    var s= this.toString(), c= c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class AddCostSheetMaterialForm extends Component {
    selectMaterialToBeAdd(id) {
        // let {materials} = this.props;
        // this.material = materials.filter(function(item){return item.id == id})[0];
        // console.log("material",this.material);
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            isSaving,
            materials
        } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={"Add Material"}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key = "submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Submit </Button >
                    ]}>
                
                
                <Form>
                  <FormItem label="Material">
                        {getFieldDecorator('materialId', {
                            rules: [
                                { required: true, message: 'Please select a material' }, 
                                ]
                        })(
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="search material"
                                optionFilterProp="children"
                                onChange={this.selectMaterialToBeAdd}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                            >
                                {materials.map(o => <Option key={o.id.toString()}>{`${o.code.padZero(10)} - ${o.description}`}</Option>)}
                            </Select>
                        )}
                </FormItem>
                </Form>
            </Modal>
        );
    }
}

AddCostSheetMaterialForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    materials: PropTypes.array.isRequired,
};

const AddCostSheetMaterial = Form.create()(AddCostSheetMaterialForm);

export default AddCostSheetMaterial;