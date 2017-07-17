import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import Moment from 'react-moment';

import AddCostSheetMaterial from './AddCostSheetMaterialForm';
import {
    Form,
    Button,
    //Modal,
    Input,
    Icon,
    Table,
    Col,
    Select,
    Row,
    Tabs,
    Popconfirm
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

Number.prototype.padZero= function(len, c){
    let s= this.toString()
    c= c || '0';
    while(s.length< len) s= c+ s;
    return s;
}

Array.prototype.FirstOrDefault = function(def){
    if(this.length==0) return def;

    return this[0];
}

class addCostSheetForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            AddMaterialToCostSheetFormIsVisible:false
        };
        this.materialColumns = [
            {
                title: 'Code',
                key: 'code',
                render: (text, item) => {
                    return (<span>{item.material.code.padZero(10)}</span>);
                }
            }, {
                title: 'Description',
                dataIndex: 'material.description',
                key: 'description'
            }, 
            {
                title: 'Performance %',
                dataIndex: 'performance',
                key: 'performance'
            },
            {
                title: 'Waste %',
                dataIndex: 'waste',
                key: 'waste'
            }, {
                title: 'Cost',
                key: 'cost',
                render: (text, item) => {
                    if (!item.material || !item.material.materialCostHistories) {
                        return;
                    }
                    return (
                        <span>
                            {item.material.materialCostHistories.FirstOrDefault({cost:0}).cost}
                        </span>
                        
                    );
                }
            },
            {
                title: 'Total',
                key: 'total',
                render: (text, item) => {
                    let total = 0;

                    total = item.performance * item.waste * item.material.materialCostHistories.FirstOrDefault({cost:0}).cost;
                    return (
                        <span>{total}</span>
                    );
                }
            }, {
                title: 'Action',
                key: 'action',
                width: 120,
                render: (text, material, index) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(index, material)}>
                            <Icon type="edit"/>
                            Edit</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="Are you sure delete this material?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDelete(index, material)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        this.manpowerColumns = [
            {
                title: 'Code',
                key: 'code',
                render: (text, item) => {
                    return (<span>{item.manpower.code.padZero(10)}</span>);
                }
            }, {
                title: 'Description',
                dataIndex: 'manpower.description',
                key: 'description'
            }, 
            {
                title: 'Performance %',
                dataIndex: 'performance',
                key: 'performance'
            }, {
                title: 'Cost',
                key: 'cost',
                render: (text, item) => {
                    if (!item.material || !item.material.materialCostHistories) {
                        return;
                    }
                    return (
                        <span>
                            {item.material.materialCostHistories.FirstOrDefault({cost:0}).cost}
                        </span>
                        
                    );
                }
            },
            {
                title: 'Total',
                key: 'total',
                render: (text, item) => {
                    let total = 0;

                    total = item.performance * item.manpower.manpowerCostHistories.FirstOrDefault({cost:0}).cost;
                    return (
                        <span>{total}</span>
                    );
                }
            }, {
                title: 'Action',
                key: 'action',
                width: 120,
                render: (text, material, index) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(index, material)}>
                            <Icon type="edit"/>
                            Edit</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="Are you sure delete this material?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDelete(index, material)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        this.toolAndEquipmentColumns = [
            {
                title: 'Code',
                key: 'code',
                render: (text, item) => {
                    return (<span>{item.toolsAndEquipment.code.padZero(10)}</span>);
                }
            }, {
                title: 'Description',
                dataIndex: 'toolsAndEquipment.description',
                key: 'description'
            }, 
            {
                title: 'Performance %',
                dataIndex: 'performance',
                key: 'performance'
            }, {
                title: 'Cost',
                key: 'cost',
                render: (text, material) => {
                    if (!material.unitsOfMeasurement) {
                        return;
                    }
                    return (
                        <span>
                            {/*{material.materialCostHistories[0].cost} <Tooltip title={material.unitsOfMeasurement.description}><span>{material.unitsOfMeasurement.abbreviation}</span></Tooltip>*/}
                        </span>
                        
                    );
                }
            },
            {
                title: 'Total',
                key: 'total',
                render: (text, item) => {
                    let total = 0;

                    total = item.performance  * item.material.materialCostHistories.FirstOrDefault({cost:0}).cost;
                    return (
                        <span>{total}</span>
                    );
                }
            }, {
                title: 'Action',
                key: 'action',
                width: 120,
                render: (text, material, index) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(index, material)}>
                            <Icon type="edit"/>
                            Edit</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="Are you sure delete this material?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDelete(index, material)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
    }
   
    componentWillMount() {
        let {FetchCostSheet,FetchCostSheetMaterials,FetchCostSheetManpower,FetchCostSheetToolsAndEquipment} = this.props;
        let {id} = this.props.params;
        console.log("id",id);
        FetchCostSheet(id);
        FetchCostSheetMaterials(id);
        FetchCostSheetManpower(id);
        FetchCostSheetToolsAndEquipment(id);
    }
    saveAddMaterialToCostSheetFormRef = (form) => {
        this.AddMaterialToCostSheetForm = form;
    }
    CancelAdd = () => {
        this.setState({AddMaterialToCostSheetFormIsVisible: false});
    }
    AddMaterialToCostSheet = () => {
        const form = this.AddMaterialToCostSheetForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddMaterial} = this.props;
            let {id} = this.props.params;
            AddMaterial(id, values);
            form.resetFields();
            this.setState({AddMaterialToCostSheetFormIsVisible: false});
        });
    }
    onAddMaterial(){
        this.setState({AddMaterialToCostSheetFormIsVisible: true});
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        let {costSheet,csmaterials,csmanpower,cstoolsAndEquipment,Regions,materials,SelectMaterialToBeAddToCostSheet} = this.props;
        return (
            <Row>
                <AddCostSheetMaterial
                    ref={this.saveAddMaterialToCostSheetFormRef}
                    visible={this.state.AddMaterialToCostSheetFormIsVisible}
                    onCancel={this.CancelAdd}
                    onCreate={this.AddMaterialToCostSheet}
                    materials={materials}
                    SelectMaterialToBeAddToCostSheet={SelectMaterialToBeAddToCostSheet}
                />
                {/*<EditCostSheetMaterial />*/}
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
                                    initialValue: costSheet.minimunCost?costSheet.minimunCost:""
                            })(
                                <Input placeholder="0.00" />
                            )}
                            </FormItem>
                        </Col>
                        <Col span={3} >
                            <FormItem label="Default Region">
                                    {getFieldDecorator('regionId', {
                                        rules: [
                                            { required: true, message: 'Please select a region' }, 
                                            ],
                                            initialValue: costSheet.regionId?costSheet.regionId.toString():undefined
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
                        <Col span={3} >
                        <FormItem style={{paddingTop:"30px"}}>
                                <Button type="primary" icon="save">Save</Button>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Materials" key="1">
                                <Row  type="flex" justify="end"><Button type="primary" icon="plus" className="add-material-button" onClick={() => this.onAddMaterial()}>Add</Button></Row>
                                <Table rowKey={item => item.id} size="small" bordered={true} dataSource={csmaterials} columns={this.materialColumns} pagination={{pageSize:5}} />
                            </TabPane>
                            <TabPane tab="Manpowers" key="2">
                                <Row type="flex" justify="end"><Button type="primary" icon="plus" className="add-manpower-button" onClick={() => this.onAddManpower()}>Add</Button></Row>
                                <Table rowKey={item => item.id} size="small" bordered={true}  dataSource={csmanpower} columns={this.manpowerColumns} pagination={{pageSize:5}} />
                            </TabPane>
                            <TabPane tab="Tools And Equipments" key="3">
                                <Row type="flex" justify="end"><Button type="primary" icon="plus" className="add-toolAndEquipment-button" onClick={() => this.onAddToolAndEquipment()}>Add</Button></Row>
                                <Table rowKey={item => item.id} size="small" bordered={true} dataSource={cstoolsAndEquipment} columns={this.toolAndEquipmentColumns} pagination={{pageSize:5}} />
                            </TabPane>
                        </Tabs>                    
                    </Row>
                </Form>
            </Row>            
        );
    }
}

addCostSheetForm.propTypes = {
    costSheet: PropTypes.object.isRequired,
    FetchCostSheet: PropTypes.func.isRequired,
    Regions: PropTypes.array.isRequired,
    materials: PropTypes.array.isRequired,
    manpowers: PropTypes.array.isRequired,
    toolsAndEquipments: PropTypes.array.isRequired,

    csmaterials: PropTypes.array,
    csmanpower: PropTypes.array,
    cstoolsAndEquipment: PropTypes.array,

    SelectMaterialToBeAddToCostSheet: PropTypes.func.isRequired,
    AddMaterial: PropTypes.func.isRequired,
    AddManPower: PropTypes.func.isRequired,
    AddToolsAndEquipment: PropTypes.func.isRequired,

    FetchCostSheetMaterials: PropTypes.func.isRequired,
    FetchCostSheetManpower: PropTypes.func.isRequired,
    FetchCostSheetToolsAndEquipment: PropTypes.func.isRequired
};

const addCostSheet = Form.create()(addCostSheetForm);

export default addCostSheet;