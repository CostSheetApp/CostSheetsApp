import React, { Component, PropTypes } from 'react';
import Moment from 'react-moment';
import {Table
        ,Row
        ,Form
        ,Select
        ,Tabs
        ,Col
    } from 'antd';
import NumberFormat from 'react-number-format';
import '../styles/projects.css';

const ReactHighstock = require('react-highcharts/ReactHighstock');

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

Number.prototype.padZero= function(len, c){
    let s= this.toString();
    c = c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class HistoryMaterial extends Component {
    constructor(props){
      super(props);
      this.columnsMaterial = [{
          title: 'Región',
          dataIndex: 'region',
          key: 'region'
        },{
          title: 'Costo',
          dataIndex: 'cost',
          render: (text, record) => (
            <NumberFormat value={record.cost} 
                displayType={'text'}
                thousandSeparator={true} 
                prefix={'L.'} 
                decimalPrecision={2}
            />
          ),
          key: 'cost'
        }, {
          title: 'Fecha',
          key: 'createdAt',
          render: (text, record) => (
            <span>
                <Moment format="DD/MM/YYYY">{record.createdAt}</Moment>
            </span>
          ),
        }];

        this.handle = this.handleCreate;
        this.title = "Historico de Costos por Material";
    }  
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    componentWillMount() {
        let { FetchMaterials,entityId } = this.props;
        FetchMaterials(entityId);
    }
    onChangeMaterial= (id) => {
        let { ReportCostHistoryMaterial,ReportCostHistoryMaterialData } = this.props;
        ReportCostHistoryMaterial(id);
        ReportCostHistoryMaterialData(id);
    }
    render(){
        let {Materials
             ,MaterialsHistoryData
             ,CharData
            } = this.props;

        return (
            <Row>
                <Form>
                    <Row>
                        <Col span={15} >
                            <FormItem label="Material">
                                    {(
                                        <Select
                                        showSearch
                                        placeholder="Seleccione un material"
                                        optionFilterProp="children"
                                        onChange={this.onChangeMaterial}
                                        filterOption={(input, option) => {
                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    >
                                        {Materials.map(o => <Option key={o.id} >{`${o.code.padZero(10)} - ${o.description}`}</Option>)}
                                    </Select>
                                    )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Gráfico Histórico del Material" key="1">
                                
                                <ReactHighstock config = {CharData} ref = "chart" />
                            </TabPane>
                            <TabPane tab="Datos Históricos del Material" key="2">
                                <Table rowKey={item => item.id} size="small" bordered={true} dataSource={MaterialsHistoryData} columns={this.columnsMaterial} pagination={{pageSize:15}} />
                            </TabPane>
                            
                        </Tabs>                    
                    </Row>
                </Form>
            </Row>
        );
    }
}

HistoryMaterial.propTypes = {
    FetchMaterials: PropTypes.func.isRequired,
    ReportCostHistoryMaterial: PropTypes.func.isRequired,
    ReportCostHistoryMaterialData: PropTypes.func.isRequired,
    
    Materials: PropTypes.array,
    CharData: PropTypes.object,
    MaterialsHistoryData: PropTypes.array,

    loadingMaterial: PropTypes.bool.isRequired,
    loadingMaterialCostHistory: PropTypes.bool.isRequired,

    entityId: PropTypes.number.isRequired
};


export default HistoryMaterial;