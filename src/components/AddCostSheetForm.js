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

class addCostSheetForm extends Component {
    componentWillMount() {
        let {FetchCostSheets,FetchRegions,entityId} = this.props;
        FetchCostSheets(entityId);
        FetchRegions(entityId);
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            isSaving,
            UnitsOfMeasurement,
            Regions,
            costSheetList
        } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={"Agregar Ficha de Costo"}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancelar </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Aceptar </Button >
                    ]}>
                <Form>
                    <FormItem label="Fichas de Costos">
                        {getFieldDecorator('costSheetId', {
                            rules: [
                                { required: true, message: '¡Por favor seleccione una ficha de costo' }, 
                                ],
                                
                        })(
                            <Select
                            showSearch
                            placeholder="selecciona una ficha de costo"
                            optionFilterProp="children"
                            //onChange={handleChange}
                            filterOption={(input, option) => {
                                //console.log(input,option);
                                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                            }}
                        >
                            {costSheetList.map(o => <Option key={o.id} >{`${o.description}`}</Option>)}
                        </Select>
                        )}
                    </FormItem>
                    <FormItem >
                    <Col span="12">
                    <FormItem label="Total de Obra">
                        {getFieldDecorator('totalUnit', {
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
                                parser={value => value.toString().replace(/\s?|(,*)/g, '')}
                            />
                        )}
                         </FormItem>
                    </Col>
                    <Col span="12">
                   
                    </Col>
                    </FormItem>
                     <FormItem style={{paddingTop:"10px"}}>
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

addCostSheetForm.propTypes = {
    FetchCostSheets: PropTypes.func.isRequired,
    Regions: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    entityId: PropTypes.number.isRequired,
    costSheetList:PropTypes.array,
    FetchRegions:PropTypes.func.isRequired,
};

const addCostSheet = Form.create()(addCostSheetForm);

export default addCostSheet;