import React, {Component, PropTypes } from 'react';
//import Moment from 'react-moment';
//import Mayre from 'mayre';
import {
    Form,
    Button,
    Modal,
    Input,
    InputNumber,
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

class EditCostSheetMaterialForm extends Component {
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            isSaving,
            materials,
            costSheetMaterial,
            costSheetId
        } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={"Editar Material"}
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
                    {getFieldDecorator('id', {
                            initialValue: costSheetMaterial?costSheetMaterial.Id:0
                        })(
                            <Input type="hidden" />
                        )}
                  <FormItem label="Material">
                        {getFieldDecorator('materialId', {
                            rules: [
                                { required: true, message: 'Por favor selecciona un material' }, 
                                ],
                                initialValue:(costSheetMaterial)?costSheetMaterial.materialId.toString():undefined
                        })(
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Busca un material"
                                optionFilterProp="children"
                                disabled = {true}
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
                            initialValue: costSheetMaterial?costSheetMaterial.waste:0
                    })(
                        <InputNumber
                            min={0}
                            max={2147483645.99}
                            style={{ width: '100%' }}
                            formatter={value => (value) ? `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : ''}
                            parser={value => (value) ? value.toString().replace(/\L.\s?|(,*)/g, ''):0}
                        />
                    )}
                </FormItem>
                <FormItem label="Rendimiento">
                    {getFieldDecorator('performance', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese el rendimiento del material!' }, 
                            ],
                            initialValue: costSheetMaterial?costSheetMaterial.performance:0
                    })(
                        //<Input type="number" placeholder="Rendimiento del material" />
                        <InputNumber
                            min={0}
                            max={2147483645.99}
                            style={{ width: '100%' }}
                            formatter={value => (value) ? `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : ''}
                            parser={value => (value) ? value.toString().replace(/\L.\s?|(,*)/g, ''):0}
                        />
                    )}
                </FormItem>
                </Form>
            </Modal>
        );
    }
}

EditCostSheetMaterialForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    materials: PropTypes.array.isRequired,
    costSheetMaterial: PropTypes.object,
    costSheetId: PropTypes.string.isRequired,
    isSaving: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const EditCostSheetMaterial = Form.create()(EditCostSheetMaterialForm);

export default EditCostSheetMaterial;