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

class addMaterialForm extends Component {
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Region',
          dataIndex: 'region.name',
          key: 'region.name'
        }, {
          title: 'Created At',
          key: 'createdAt',
           render: (text, record, index) => (
            <span>
                <Moment fromNow>{record.createdAt}</Moment>
            </span>
          ),
        }, {
          title: 'Cost',
          dataIndex: 'cost',
          key: 'cost',
        }
        ];
    }  
    componentWillMount() {
        let {FetchUnitsOfMeasurement} = this.props;
        FetchUnitsOfMeasurement();
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            material,
            costHistory,
            isSaving,
            title,
            UnitsOfMeasurement,
            isEditing
        } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Submit </Button >
                    ]}>
                <Form>
                    {getFieldDecorator('id', {
                        initialValue: material.id?material.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem style={{marginBottom:"10px"}}>
                    {getFieldDecorator('description', {
                        rules: [
                            { required: true, message: 'Please input material description!' }, 
                            ],
                            initialValue: material.description?material.description:""
                    })(
                        <Input  placeholder="Material description" />
                    )}
                    </FormItem>
                    <FormItem >
                    <Col span="12">
                    <FormItem>
                        {getFieldDecorator('waste', {
                            rules: [
                                { required: true, message: 'Please input material waste!' }, 
                                ],
                                initialValue: material.waste?material.waste:0
                        })(
                            <Input type="number" placeholder="Material waste" />
                        )}
                         </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem>
                        {getFieldDecorator('unitsOfMeasurementId', {
                            rules: [
                                { required: true, message: 'Please input material description!' }, 
                                ],
                                initialValue: material.unitsOfMeasurementId?material.unitsOfMeasurementId.toString():null
                        })(
                            <Select
                                showSearch
                                placeholder="Select a person"
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
                    <Mayre
                        of={<Row><Button type="primary" icon="plus" className="add-material-button">Add New Price</Button></Row>}
                        or={
                            <FormItem style={{paddingTop:"10px"}}>
                                <Col span="12">
                                    <FormItem>
                                        {getFieldDecorator('cost', {
                                rules: [
                                    { required: true, message: 'Please input initial price!' }, 
                                    ],
                                    initialValue: 0
                            })(
                                <Input type="number" placeholder="Initial price" />
                            )}
                                </FormItem>
                            </Col>
                            <Col span="12">
                                    <FormItem>
                                        {getFieldDecorator('regionId', {
                                rules: [
                                    { required: true, message: 'Please select a region' }, 
                                    ],
                                    initialValue: 0
                            })(
                                <Select />
                            )}
                                </FormItem>
                            </Col>
                        </FormItem>
                        }
                        when={isEditing}
                    />
                    
                    <Mayre
                        of={
                            <FormItem>
                                <Table rowKey={item => item.id} size="small" bordered={true} loading={costHistory.loading} dataSource={costHistory.list} columns={this.columns} pagination={{pageSize:5}} ></Table>
                            </FormItem>
                        }
                        when={isEditing}
                    />
                    
                    
                </Form>
            </Modal>
        );
    }
}

addMaterialForm.propTypes = {
    FetchUnitsOfMeasurement: PropTypes.func.isRequired,
    material: PropTypes.object,
    costHistory: PropTypes.object.isRequired,
    UnitsOfMeasurement: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
};

const addMaterial = Form.create()(addMaterialForm);

export default addMaterial;