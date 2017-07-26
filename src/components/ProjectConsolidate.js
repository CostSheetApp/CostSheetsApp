import React, { Component, PropTypes } from 'react';
import {Table
        ,Row
        ,Form
        ,Select
        ,Tabs
        ,Col
    } from 'antd';
import NumberFormat from 'react-number-format';
import '../styles/projects.css';
import IndirectCosts from './IndirectCosts';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

Number.prototype.padZero= function(len, c){
    let s= this.toString();
    c = c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class Consolidate extends Component {
    constructor(props){
      super(props);
      this.columnsMaterial = [{
          title: 'Código',
          key: 'code',
          render: (text, material) => {
              return (<span>{material.code.padZero(10)}</span>);
          }
        },{
          title: 'Material',
          dataIndex: 'description',
          key: 'description'
        },{
          title: 'Unidad de Medida',
          dataIndex: 'unitsOfMeasurement',
          key: 'unitsOfMeasurement'
        }, {
          title: 'Unidades Totales',
          dataIndex: 'totalUnit',
          render: (text, record) => (
            <NumberFormat value={record.totalUnit} 
                displayType={'text'}
                thousandSeparator={true} 
                decimalPrecision={2}
            />
          ),
          key: 'totalUnit'
        }, {
          title: 'Total',
          dataIndex: 'Total',
          render: (text, record) => (
            <NumberFormat value={record.Total} 
                displayType={'text'}
                thousandSeparator={true} 
                prefix={'L.'} 
                decimalPrecision={2}
            />
          ),
          key: 'Total'
        }];

        this.columnsManPower = [{
          title: 'Código',
          key: 'code',
          render: (text, manPower) => {
              return (<span>{manPower.code.padZero(10)}</span>);
          }
        },{
          title: 'Mano de Obra',
          dataIndex: 'description',
          key: 'description'
        },{
          title: 'Unidades Totales',
          dataIndex: 'totalUnit',
          render: (text, record) => (
            <NumberFormat value={record.totalUnit} 
                displayType={'text'}
                thousandSeparator={true} 
                decimalPrecision={2}
            />
          ),
          key: 'totalUnit'
        }, {
          title: 'Total',
          dataIndex: 'Total',
          render: (text, record) => (
            <NumberFormat value={record.Total} 
                displayType={'text'}
                thousandSeparator={true} 
                prefix={'L.'} 
                decimalPrecision={2}
            />
          ),
          key: 'Total'
        }];

        this.columnsToolEquipment = [{
          title: 'Código',
          key: 'code',
          render: (text, tool) => {
              return (<span>{tool.code.padZero(10)}</span>);
          }
        },{
          title: 'Mano de Obra',
          dataIndex: 'description',
          key: 'description'
        },{
          title: 'Unidades Totales',
          dataIndex: 'totalUnit',
          render: (text, record) => (
            <NumberFormat value={record.totalUnit} 
                displayType={'text'}
                thousandSeparator={true} 
                decimalPrecision={2}
            />
          ),
          key: 'totalUnit'
        }, {
          title: 'Total',
          dataIndex: 'Total',
          render: (text, record) => (
            <NumberFormat value={record.Total} 
                displayType={'text'}
                thousandSeparator={true} 
                prefix={'L.'} 
                decimalPrecision={2}
            />
          ),
          key: 'Total'
        }];

        this.handle = this.handleCreate;
        this.title = "Consolidado de Proyecto";
    }  
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    componentWillMount() {
        let { FetchProjects,entityId } = this.props;
        let {id} = this.props.params;
        FetchProjects(entityId,id);
    }
    onChangeProject= (id) => {
        let { Projects, FetchConsolidateMaterial,FetchConsolidateManPower,FetchConsolidateToolsAndEquipment,SelectProject,FetchConsolidateIndirectCost } = this.props;
        FetchConsolidateMaterial(id);
        FetchConsolidateManPower(id);
        FetchConsolidateToolsAndEquipment(id);
        FetchConsolidateIndirectCost(id);
        
        if( (Projects) && (Projects.length > 0) && (id) ) {
                let project = Projects.filter((item) => item.id == id);
                if((project) && (project.length > 0)){
                    SelectProject(project[0]);
                }
            }
    }
    render(){
        let {Projects
             ,Materials
             ,ManPowers
             ,ToolEquipments
             ,IndrectCost
             ,project
            } = this.props;
        let {id} = this.props.params;
        let materialTotal = Materials.map(o => o.Total).reduce((b,a) => b+a,0.0);
        let manPowersTotal = ManPowers.map(o => o.Total).reduce((b,a) => b+a,0.0);
        let toolEquipmentsTotal = ToolEquipments.map(o => o.Total).reduce((b,a) => b+a,0.0);
        let indrectCostTotal = IndrectCost.map(o => o.amount).reduce((b,a) => b+a,0.0);
        return (
            <Row>
                <Form>
                    <Row>
                        <Col span={15} >
                            <FormItem label="Proyecto">
                                    {(
                                        <Select
                                        showSearch
                                        placeholder="Seleccione un proyecto"
                                        optionFilterProp="children"
                                        defaultValue={id}
                                        onChange={this.onChangeProject}
                                        filterOption={(input, option) => {
                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    >
                                        {Projects.map(o => <Option key={o.id} >{`${o.name}`}</Option>)}
                                    </Select>
                                    )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>

                        <Col span={3}>
                            <FormItem label="Presupuesto">
                                <strong><NumberFormat value={(project)?project.budget:0} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} /></strong>
                            </FormItem>
                        </Col>

                        <Col span={3}>
                            <FormItem label="Total Material">
                                <NumberFormat value={materialTotal} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} />
                            </FormItem>
                        </Col>

                        <Col span={3}>
                            <FormItem label="Total Mano de Obra">
                                <NumberFormat value={manPowersTotal} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} />
                            </FormItem>
                        </Col>

                        <Col span={4}>
                            <FormItem label="Total Herramientas y Equipo">
                                <NumberFormat value={toolEquipmentsTotal} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} />
                            </FormItem>
                        </Col>

                        <Col span={4}>
                            <FormItem label="Total Costos Indirectos">
                                <NumberFormat value={indrectCostTotal} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} />
                            </FormItem>
                        </Col>

                        <Col span={3}>
                            <FormItem label="Costo Total">
                                <strong><NumberFormat value={materialTotal+manPowersTotal+toolEquipmentsTotal+indrectCostTotal} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} /></strong>
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Consolidado Materiales" key="1">
                                <Table rowKey={item => item.code} size="small" bordered={true} dataSource={Materials} columns={this.columnsMaterial} footer={() => <Row>Total: <NumberFormat value={materialTotal} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} /></Row>}   pagination={{pageSize:15}} />
                            </TabPane>
                            <TabPane tab="Consolidado Mano de Obra" key="2">
                                <Table rowKey={item => item.code} size="small" bordered={true}  dataSource={ManPowers} columns={this.columnsManPower} footer={() => <Row>Total: <NumberFormat value={manPowersTotal} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} /></Row>}  pagination={{pageSize:15}} />
                            </TabPane>
                            <TabPane tab="Consolidado Herramientas y Equipo" key="3">
                                <Table rowKey={item => item.code} size="small" bordered={true} dataSource={ToolEquipments} columns={this.columnsToolEquipment} footer={() => <Row>Total: <NumberFormat value={toolEquipmentsTotal} displayType={'text'} thousandSeparator={true} prefix={'L. '} decimalPrecision={2} /></Row>} pagination={{pageSize:15}} />
                            </TabPane>
                            <TabPane tab="Consolidado Costos Indrectos" key="4">
                                <Row>
                                    <IndirectCosts
                                        projectId={(project)?project.id:0}
                                        isEditing = {false}
                                    />
                                </Row>
                            </TabPane>
                        </Tabs>                    
                    </Row>
                </Form>
            </Row>
        );
    }
}

Consolidate.propTypes = {
    FetchProjects: PropTypes.func.isRequired,
    FetchConsolidateMaterial: PropTypes.func.isRequired,
    FetchConsolidateManPower: PropTypes.func.isRequired,
    FetchConsolidateToolsAndEquipment: PropTypes.func.isRequired,
    SelectProject: PropTypes.func.isRequired,
    FetchConsolidateIndirectCost: PropTypes.func.isRequired,
    
    Projects: PropTypes.array,
    Materials: PropTypes.array,
    ManPowers: PropTypes.array,
    ToolEquipments: PropTypes.array,
    IndrectCost: PropTypes.array,

    loadingProject: PropTypes.bool.isRequired,
    loadingMaterial: PropTypes.bool.isRequired,
    loadingManPower: PropTypes.bool.isRequired,
    loadingToolEquipment: PropTypes.bool.isRequired,
    loadingIndirectCost: PropTypes.bool.isRequired,

    project: PropTypes.object,

    entityId: PropTypes.number.isRequired
};


export default Consolidate;