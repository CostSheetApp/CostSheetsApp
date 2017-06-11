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

class editMaterialForm extends Component {
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
            UnitsOfMeasurement,
            Regions
        } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={"Edit Material"}
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
  
                    <FormItem label="Description" style={{marginBottom:"10px"}}>
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
                    <FormItem label="Waste">
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
                    <FormItem label="Unit of Measurement">
                        {getFieldDecorator('unitsOfMeasurementId', {
                            rules: [
                                { required: true, message: 'Please input Unit of Measurement!' }, 
                                ],
                                initialValue: material.unitsOfMeasurementId?material.unitsOfMeasurementId.toString():null
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
                    
                    <Row><Button type="primary" icon="plus" className="add-material-button">Add New Price</Button></Row>
                    
                    <FormItem>
                        <Table rowKey={item => item.id} size="small" bordered={true} loading={costHistory.loading} dataSource={costHistory.list} columns={this.columns} pagination={{pageSize:5}} ></Table>
                    </FormItem>
                    
                    
                </Form>
            </Modal>
        );
    }
}

editMaterialForm.propTypes = {
    FetchUnitsOfMeasurement: PropTypes.func.isRequired,
    material: PropTypes.object,
    costHistory: PropTypes.object.isRequired,
    UnitsOfMeasurement: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    Regions: PropTypes.array.isRequired,
};

const editMaterial = Form.create()(editMaterialForm);

export default editMaterial;