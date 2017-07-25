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

class AddCostSheetToolsEquipmentForm extends Component {
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            isSaving,
            toolsAndEquipments,
            costSheetId
        } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={"Agregar Herramienta y Equipo"}
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
                  <FormItem label="Herramienta y Equipo">
                        {getFieldDecorator('toolsAndEquipmentId', {
                            rules: [
                                { required: true, message: 'Por favor selecciona una Herramienta y Equipo' }, 
                                ]
                        })(
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Busca una Herramienta y Equipo"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
                            >
                                {toolsAndEquipments.map(o => <Option key={o.id.toString()}>{`${o.code.padZero(10)} - ${o.description}`}</Option>)}
                            </Select>
                        )}
                </FormItem>
                <FormItem label="Rendimiento">
                    {getFieldDecorator('performance', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese el rendimiento de la mano de obra!' }, 
                            ],
                            initialValue: 0
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

AddCostSheetToolsEquipmentForm.propTypes = {
    visible: PropTypes.bool.isRequired,
    toolsAndEquipments: PropTypes.array.isRequired,
    costSheetId: PropTypes.string.isRequired,
    isSaving: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const AddCostSheetToolsEquipment = Form.create()(AddCostSheetToolsEquipmentForm);

export default AddCostSheetToolsEquipment;