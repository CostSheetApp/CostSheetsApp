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

class HistoryTools extends Component {
    constructor(props){
      super(props);
      this.columnsTool = [{
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
        let { FetchTools,entityId } = this.props;
        FetchTools(entityId);
    }
    onChangeTool= (id) => {
        let { ReportCostHistorToolsAndEquipment,ReportCostHistorToolsAndEquipmentData } = this.props;
        ReportCostHistorToolsAndEquipment(id);
        ReportCostHistorToolsAndEquipmentData(id);
    }
    render(){
        let {Tools
             ,CharData
             ,ToolsHistoryData
            } = this.props;

        return (
            <Row>
                <Form>
                    <Row>
                        <Col span={15} >
                            <FormItem label="Herramienta y Equipo">
                                    {(
                                        <Select
                                        showSearch
                                        placeholder="Seleccione una Herramienta y Equipo"
                                        optionFilterProp="children"
                                        onChange={this.onChangeTool}
                                        filterOption={(input, option) => {
                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    >
                                        {Tools.map(o => <Option key={o.id} >{`${o.code.padZero(10)} - ${o.description}`}</Option>)}
                                    </Select>
                                    )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Gráfico Histórico de la Herramienta y Equipo" key="1">
                                <ReactHighstock config = {CharData}/>
                            </TabPane>
                            <TabPane tab="Datos Históricos de la Herramienta y Equipo" key="2">
                                <Table rowKey={item => item.id} size="small" bordered={true} dataSource={ToolsHistoryData} columns={this.columnsTool} pagination={{pageSize:15}} />
                            </TabPane>
                        </Tabs>                    
                    </Row>
                </Form>
            </Row>
        );
    }
}

HistoryTools.propTypes = {
    FetchTools: PropTypes.func.isRequired,
    ReportCostHistorToolsAndEquipment: PropTypes.func.isRequired,
    ReportCostHistorToolsAndEquipmentData: PropTypes.func.isRequired,
    
    Tools: PropTypes.array,
    CharData: PropTypes.object,
    ToolsHistoryData: PropTypes.array,

    loadingToolEquipment: PropTypes.bool.isRequired,
    loadingToolEquipmentCostHistory: PropTypes.bool.isRequired,

    entityId: PropTypes.number.isRequired
};


export default HistoryTools;