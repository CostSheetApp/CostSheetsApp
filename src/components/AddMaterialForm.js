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

class addMaterialForm extends Component {
    componentWillMount() {
        let {FetchUnitsOfMeasurement} = this.props;
        FetchUnitsOfMeasurement();
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            isSaving,
            UnitsOfMeasurement,
            Regions
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
                    <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Aceptar </Button >
                    ]}>
                <Form>
                   <FormItem label="Descripción" style={{marginBottom:"10px"}}>
                    {getFieldDecorator('description', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese la descripción!' }, 
                            ]
                    })(
                        <Input  placeholder="Descripción del material" />
                    )}
                    </FormItem>
                    <FormItem >
                    <Col span="12">
                    <FormItem label="Desperdicio">
                        {getFieldDecorator('waste', {
                            rules: [
                                { required: true, message: '¡Por favor ingrese el desperdicio!' }, 
                                ],
                                initialValue: 0
                        })(
                            //<Input type="number" placeholder="Desperdicio" />
                            <InputNumber
                                min={0}
                                max={2147483645.99}
                                style={{ width: '100%' }}
                                formatter={value => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                parser={value => value.toString().replace(/\L.\s?|(,*)/g, '')}
                            />
                        )}
                         </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="Unidad de medida">
                        {getFieldDecorator('unitsOfMeasurementId', {
                            rules: [
                                { required: true, message: '¡Por favor ingrese la unidad de medida!' }, 
                                ],
                                
                        })(
                            <Select
                                showSearch
                                placeholder="Seleccione una unidad de medida"
                                optionFilterProp="children"
                                //onChange={handleChange}
                                filterOption={(input, option) => {
                                    //console.log(input,option);
                                    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                }}
                            >
                                {UnitsOfMeasurement.map(o => <Option key={o.id} >{`${o.description} (${o.abbreviation})`}</Option>)}
                            </Select>
                        )}
                         </FormItem>
                    </Col>
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

addMaterialForm.propTypes = {
    FetchUnitsOfMeasurement: PropTypes.func.isRequired,
    UnitsOfMeasurement: PropTypes.array.isRequired,
    Regions: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const addMaterial = Form.create()(addMaterialForm);

export default addMaterial;