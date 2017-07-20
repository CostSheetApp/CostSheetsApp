import React, {Component, PropTypes } from 'react';
//import Moment from 'react-moment';
//import Mayre from 'mayre';
import {
    Form,
    Button,
    Modal,
    Input,
    //Icon,
    //Table,
    //Col,
    Select
    //Row
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

Array.prototype.first = function () {
    if(this.length<=0) return;
    return this[0];
};

Number.prototype.padZero= function(len, c){
    var s= this.toString();
     c= c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class AddCostSheetMaterialForm extends Component {
    selectMaterialToBeAdd= (id) =>  {
        let {materials, SelectMaterialToBeAddToCostSheet} = this.props;
        this.material = materials.filter((item) => item.id == id);

        if(this.material)
            SelectMaterialToBeAddToCostSheet(this.material[0]);
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            isSaving,
            materials,
            materialToBeAddToCostSheet,
            costSheetId
        } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={"Agregar Material"}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancelar </Button>, 
                    <Button key = "submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Aceptar </Button >
                    ]}>
                
                
                <Form>
                    {getFieldDecorator('costSheetId', {
                            initialValue: costSheetId?costSheetId:0
                        })(
                            <Input type="hidden" />
                        )}
                  <FormItem label="Material">
                        {getFieldDecorator('materialId', {
                            rules: [
                                { required: true, message: 'Por favor selecciona un material' }, 
                                ]
                        })(
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Busca un material"
                                optionFilterProp="children"
                                onChange={this.selectMaterialToBeAdd}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                            >
                                {materials.map(o => <Option key={o.id.toString()}>{`${o.code.padZero(10)} - ${o.description}`}</Option>)}
                            </Select>
                        )}
                </FormItem>
                <FormItem label="Desperdicio">
                    {getFieldDecorator('waste', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese el desperdicio del material!' }, 
                            ],
                            initialValue: materialToBeAddToCostSheet?materialToBeAddToCostSheet.waste:0
                    })(
                        <Input type="number" placeholder="Desperdicio del material" />
                    )}
                </FormItem>
                <FormItem label="Rendimiento">
                    {getFieldDecorator('performance', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese el rendimiento del material!' }, 
                            ],
                            initialValue: 0
                    })(
                        <Input type="number" placeholder="Rendimiento del material" />
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
    materialToBeAddToCostSheet: PropTypes.object,
    costSheetId: PropTypes.string.isRequired,
    isSaving: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    SelectMaterialToBeAddToCostSheet: PropTypes.func.isRequired
};

const AddCostSheetMaterial = Form.create()(AddCostSheetMaterialForm);

export default AddCostSheetMaterial;