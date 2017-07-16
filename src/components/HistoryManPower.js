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

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

Number.prototype.padZero= function(len, c){
    let s= this.toString();
    c = c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class HistoryManPower extends Component {
    constructor(props){
      super(props);
      this.columnsManPower = [{
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
        this.title = "Historico de Costos por Mano de Obra";
    }  
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    componentWillMount() {
        let { FetchManPowers,entityId } = this.props;
        FetchManPowers(entityId);
    }
    onChangeManPower= (id) => {
        let { ReportCostHistoryManPower } = this.props;
        ReportCostHistoryManPower(id);
    }
    render(){
        let {ManPowers
             ,ManPowersHistory
            } = this.props;

        return (
            <Row>
                <Form>
                    <Row>
                        <Col span={15} >
                            <FormItem label="Mano de Obra">
                                    {(
                                        <Select
                                        showSearch
                                        placeholder="Seleccione una Mano de Obra"
                                        optionFilterProp="children"
                                        onChange={this.onChangeManPower}
                                        filterOption={(input, option) => {
                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    >
                                        {ManPowers.map(o => <Option key={o.id} >{`${o.code.padZero(10)} - ${o.description}`}</Option>)}
                                    </Select>
                                    )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Datos Históricos de la Mano de Obra" key="1">
                                <Table rowKey={item => item.id} size="small" bordered={true} dataSource={ManPowersHistory} columns={this.columnsManPower} pagination={{pageSize:15}} />
                            </TabPane>
                            <TabPane tab="Gráfico Histórico de la Mano de Obra" key="2">
                                <Table rowKey={item => item.id} size="small" bordered={true}  dataSource={ManPowersHistory} columns={this.columnsManPower} pagination={{pageSize:15}} />
                            </TabPane>
                        </Tabs>                    
                    </Row>
                </Form>
            </Row>
        );
    }
}

HistoryManPower.propTypes = {
    FetchManPowers: PropTypes.func.isRequired,
    ReportCostHistoryManPower: PropTypes.func.isRequired,
    
    ManPowers: PropTypes.array,
    ManPowersHistory: PropTypes.array,

    loadingManPower: PropTypes.bool.isRequired,
    loadingManPowerCostHistory: PropTypes.bool.isRequired,

    entityId: PropTypes.number.isRequired
};


export default HistoryManPower;