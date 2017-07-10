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

class addCostToolForm extends Component {
    render() {
        let {
            toolsAndEquipmentId,
            visible,
            onCancel,
            onCreate,
            isSaving,
            Regions
        } = this.props;
        let {getFieldDecorator} = this.props.form;

        return (
            <Modal
                visible={visible}
                title={"Agregar Costo"}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancelar </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Aceptar </Button >
                    ]}
            >
                <Form>
                    {getFieldDecorator('toolsAndEquipmentId', {
                            initialValue: toolsAndEquipmentId?toolsAndEquipmentId:0
                        })(
                            <Input type="hidden" />
                        )}
                    <FormItem style={{paddingTop:"10px"}}>
                        <Col span="12" >
                            <FormItem label="Costo">
                                {getFieldDecorator('cost', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese el nuevo costo!' }, 
                            ],
                            initialValue: 0
                        })(
                            <InputNumber
                                min={0}
                                max={2147483645.99}
                                formatter={value => `L. ${value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                parser={value => value.replace(/\L.\s?|(,*)/g, '')}
                            />
                        )}
                            </FormItem>
                        </Col>
                        <Col span="12">
                                <FormItem label="Región">
                                    {getFieldDecorator('regionId', {
                                        rules: [
                                            { required: true, message: '¡Por favor seleccione una región!' }, 
                                            ],
                                            
                                    })(
                                        <Select
                                        showSearch
                                        placeholder="Seleccione una región"
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

addCostToolForm.propTypes = {
    toolsEquipment: PropTypes.object,
    toolsAndEquipmentId:PropTypes.number,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    Regions: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const addCostTool = Form.create()(addCostToolForm);

export default addCostTool;