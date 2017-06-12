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
                title={"Add Material"}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Submit </Button >
                    ]}>
                <Form>
                   <FormItem label="Description" style={{marginBottom:"10px"}}>
                    {getFieldDecorator('description', {
                        rules: [
                            { required: true, message: 'Please input material description!' }, 
                            ]
                    })(
                        <Input  placeholder="Material description" />
                    )}
                    </FormItem>
                    <FormItem >
                    <Col span="12">
                    <FormItem label="Waste">
                        {getFieldDecorator('waste', {
                            rules: [
                                { required: true, message: 'Please input material waste!' }, 
                                ],
                                initialValue: 0
                        })(
                            <Input type="number" placeholder="Material waste" />
                        )}
                         </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="Unit of Measurement">
                        {getFieldDecorator('unitsOfMeasurementId', {
                            rules: [
                                { required: true, message: 'Please input Unit of Measurement!' }, 
                                ],
                                
                        })(
                            <Select
                                showSearch
                                placeholder="Select a unit of measurement"
                                optionFilterProp="children"
                                //onChange={handleChange}
                                filterOption={(input, option) => {
                                    console.log(input,option);
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
                                    <FormItem label="Cost">
                                        {getFieldDecorator('cost', {
                                rules: [
                                    { required: true, message: 'Please input initial cost!' }, 
                                    ],
                                    initialValue: 0
                            })(
                                <Input type="number" placeholder="Initial cost" />
                            )}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                    <FormItem label="Region">
                                        {getFieldDecorator('regionId', {
                                rules: [
                                    { required: true, message: 'Please select a region' }, 
                                    ],
                                    
                            })(
                                <Select
                                showSearch
                                placeholder="Select a region"
                                optionFilterProp="children"
                                //onChange={handleChange}
                                filterOption={(input, option) => {
                                    console.log(input,option);
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
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired
};

const addMaterial = Form.create()(addMaterialForm);

export default addMaterial;