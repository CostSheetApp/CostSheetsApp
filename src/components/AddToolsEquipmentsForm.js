import React, {Component, PropTypes } from 'react';
//import Moment from 'react-moment';
import {
    Form,
    Button,
    Modal,
    Input,
    InputNumber,
    //Icon,
    //Table,
    Col,
    Select
    //Row
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

Array.prototype.first = function () {
    if(this.length<=0) return;
    return this[0];
};

class addToolsEquipmentForm extends Component {
    componentWillMount() {
        //let {FetchUnitsOfMeasurement} = this.props;
        //FetchUnitsOfMeasurement();
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            isSaving,
            toolsEquipment,
            Regions
        } = this.props;
        let {getFieldDecorator} = this.props.form;

        return (
            <Modal
                visible={visible}
                title={"Agregar Herramientas y Equipo"}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancelar </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving} > Aceptar </Button >
                    ]}>
                <Form>
                    {getFieldDecorator('id', {
                        initialValue: toolsEquipment.id?toolsEquipment.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem label="Descripción">
                    {getFieldDecorator('description', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese la descripción!' }, 
                            ],
                            initialValue: toolsEquipment.description?toolsEquipment.description:""
                    })(
                        <Input  placeholder="Descripción de la herramienta y equipo" />
                    )}
                    </FormItem>
                    <FormItem style={{paddingTop:"10px"}}>
                                <Col span="12" >
                                    <FormItem label="Costo">
                                        {getFieldDecorator('cost', {
                                rules: [
                                    { required: true, message: '¡Por favor ingrese el costo inicial!' }, 
                                    ],
                                    initialValue: 0
                            })(
                                <InputNumber
                                    min={0}
                                    max={2147483645.99}
                                    style={{ width: '100%' }}
                                    formatter={value => `L. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                    parser={value => value.toString().replace(/\L.\s?|(,*)/g, '')}
                                />
                            )}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                    <FormItem label="Región">
                                        {getFieldDecorator('regionId', {
                                            rules: [
                                                { required: true, message: '¡Por favor seleccione una región' }, 
                                                ],
                                                
                                        })(
                                            <Select
                                            showSearch
                                            placeholder="selecciona una región"
                                            optionFilterProp="children"
                                            //onChange={handleChange}
                                            filterOption={(input, option) => {
                                                //console.log(input,option);
                                                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                            }}
                                        >
                                            {Regions.map(o => <Option key={o.id} >{`${o.name}`}</Option>)}
                                        </Select>
                                        )}
                                </FormItem>
                            </Col>
                     </FormItem>
                </Form>
            </Modal>
        );

    }
}

addToolsEquipmentForm.propTypes = {
    toolsEquipment: PropTypes.object,
    Regions: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const addToolsEquipment = Form.create()(addToolsEquipmentForm);

export default addToolsEquipment;