import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Button,
    Tabs,
    Icon,
    Input,
    InputNumber,
    //Tooltip,
    Popconfirm,
    //Card,
    //Tag
} from 'antd';
import Mayre from 'mayre';

import {connect} from 'react-redux';
class IndirectCostList extends Component {
    
    render() {
        let {indirectCosts,parentId,level,parentIndex} = this.props;
        let filteredData = indirectCosts.filter(indirectCost => indirectCost.indirectCostId==parentId);
        let total = filteredData.map(o => o.amount).reduce((b,a) => b+a,0.0);
        console.log(filteredData,total)
        return (
            <div>
                {filteredData.map( (indirectCost,index) =>  <Mayre
                    of={ <Row>
                        <Col offset={5-level}>{parentIndex!=null?parentIndex+(index+1):(index+1)}. {indirectCost.description} - 
                        <span>
                        <a href="#" onClick={() => this.onEdit(index,region)} > <Icon type="edit" /></a>
                        <span className="ant-divider" />
                        <Popconfirm title="¿Esta seguro de borrar esta región?" okText="Si" cancelText="No" onConfirm={() => this.onDelete(index,region)}>
                            <a href="#"> <Icon type="delete" /></a>
                        </Popconfirm>
                        </span>
                        </Col>
                        <IndirectCosts  level={level-1} parentId={indirectCost.id}  parentIndex={parentIndex!=null?parentIndex+(index+1)+".":(index+1)+"."}/>
                        
                        </Row> }
                    or={
                        <Row>
                        <Col offset={5-level}>
                            <Col span={4}>{parentIndex!=null?parentIndex+(index+1):(index+1)}. {indirectCost.description}</Col>
                            <Col>{indirectCost.amount} 

                            <span > <a href="#" onClick={() => this.onEdit(index, region)}>
                                <Icon type="edit"/></a> < span className = "ant-divider" /> <Popconfirm
                                title="¿Esta seguro de borrar esta región?"
                                okText="Si"
                                cancelText="No"
                                onConfirm={() => this.onDelete(index, region)}>
                                <a href="#">
                                    <Icon type="delete"/></a>
                            </Popconfirm> </span>
                            
                            </Col>
                            
                        </Col>
                        </Row>
                    }
                    when={indirectCost.type == 0 }
                    //with={{ some: 'thing' }}
                    />)}

                    {
                        <Mayre
                        of={
                            <Row >
                                <Col offset={5-level}>
                               <Col span={4}><Input placeholder="nueva " size="small" /></Col>
                               <Col span={2}><InputNumber size="small" /></Col>
                                <Col span={1} ><Button size="small" type="primary" onClick={() => this.onEdit(index,region)}><Icon type="plus" /></Button></Col>                                                                 
                            </Col>
                            </Row>
                        }
                        when={level>0}
                        />
                    }

                    {<Row>
                        <Col offset={5-level}>
                            <Col span={4}>Total</Col>
                            <Col span={2}>{total}</Col>
                        </Col>
                        </Row>
                    }

                    
            </div>
        );
    }
}

IndirectCostList.defaultProps = {
  level: 5,
  parentId: null,
  parentIndex: null
};

IndirectCostList.propTypes = {
    ProjectId:PropTypes.number,
};

const mapStateToProps = (state, ownProps) => {
    return {
        indirectCosts: state.projects.IndirectCosts
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

let IndirectCosts = connect(mapStateToProps, mapDispatchToProps)(IndirectCostList);

export default IndirectCosts;