import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
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

class addCostSheetForm extends Component {
    
    componentWillMount() {
        let {FetchCostSheet} = this.props;
        let {id} = this.props.params;
        console.log("id",id);
        FetchCostSheet(id);
    }
    
    render() {
        let {getFieldDecorator} = this.props.form;
        let {costSheet} = this.props;
        return (
            <Form>
                <Row gutter={8}>
                    <Col span={12} >
                        <FormItem  label="Description">
                        {getFieldDecorator('description', {
                            rules: [
                                { required: true, message: 'Please input material description!' }, 
                                ],
                                initialValue: costSheet.description?costSheet.description:""
                        })(
                            <Input placeholder="Material description" />
                        )}
                        </FormItem>
                    </Col>
                    <Col span={2}> 
                        <FormItem  label="Minimun Cost" >
                        {getFieldDecorator('minimunCost', {
                            rules: [
                                { required: true, message: 'Please input minimun cost!' }, 
                                ],
                                initialValue: costSheet.description?costSheet.description:""
                        })(
                            <Input placeholder="0.00" />
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={8}>
                    <Col span={3} >
                        <FormItem  label="Default Region">
                        {getFieldDecorator('regionId', {
                            rules: [
                                { required: true, message: 'Please input material description!' }, 
                                ],
                                initialValue: costSheet.regionId?costSheet.regionId:null
                        })(
                            <Input />
                        )}
                        </FormItem>
                    </Col>
                </Row>
                <Row><Button type="primary" icon="plus" className="add-material-button">Add Materials</Button></Row>
                <FormItem>
                    <Table rowKey={item => item.id} size="small" bordered={true} loading={costSheet.materials.isLoading} dataSource={costSheet.materials.list} columns={this.columns} pagination={{pageSize:5}} ></Table>
                </FormItem>

                <Row><Button type="primary" icon="plus" className="add-material-button">Add Manpower</Button></Row>
                <FormItem>
                    <Table rowKey={item => item.id} size="small" bordered={true} loading={costSheet.manpower.isLoading} dataSource={costSheet.manpower.list} columns={this.columns} pagination={{pageSize:5}} ></Table>
                </FormItem>

                <Row><Button type="primary" icon="plus" className="add-material-button">Add Tools and equipment</Button></Row>
                <FormItem>
                    <Table rowKey={item => item.id} size="small" bordered={true} loading={costSheet.toolsAndEquipment.isLoading} dataSource={costSheet.toolsAndEquipment.list} columns={this.columns} pagination={{pageSize:5}} ></Table>
                </FormItem>
            </Form>
        );
    }
}

addCostSheetForm.propTypes = {
    costSheet: PropTypes.object.isRequired,
    FetchCostSheet: PropTypes.func.isRequired,
};

const addCostSheet = Form.create()(addCostSheetForm);

export default addCostSheet;