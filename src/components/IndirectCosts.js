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
    Form,
    //Tooltip,
    Popconfirm,
    //Card,
    //Tag
} from 'antd';
import Mayre from 'mayre';
import {connect} from 'react-redux';
import {AddIndirectCost,DeleteIndirectCost} from '../actions/projectActions';
import '../styles/indirect-costs.css';
const FormItem = Form.Item;
class IndirectCostList extends Component {
    onAddItem(){
        const form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log("current Values",values)
            let {parentId,projectId,level,AddIndirectCostToList} = this.props;
            AddIndirectCostToList(projectId,parentId,values.description,values.amount,values.amount>0?1:level==1?1:0);
            form.resetFields();
            //FetchSumSheetMaterials(id);
            //this.setState({AddMaterialToCostSheetFormIsVisible: false});
        });
    }
    onDeleteIndirectCost(id){
        let {projectId,DeleteIndirectCostFromList } = this.props;
        DeleteIndirectCostFromList(projectId,id);
    }
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        let {isEditing,projectId,indirectCosts,parentId,level,parentIndex} = this.props;
        let filteredData = indirectCosts.filter(indirectCost => indirectCost.indirectCostId==parentId);
        let total = filteredData.map(o => o.amount).reduce((b,a) => b+a,0.0);
         let {getFieldDecorator} = this.props.form;
         let $this = this;
        return (
            <div>
                {filteredData.map( (indirectCost,index) =>  <Mayre
                    of={ <Row gutter={150}>
                        <Col offset={5-level}>{parentIndex!=null?parentIndex+(index+1):(index+1)}. {indirectCost.description} 
                        <Mayre
                            of={
                                <span>
                                    <a href="#" onClick={() => this.onEdit(index,region)} > <Icon type="edit" /></a>
                                    <span className="ant-divider" />
                                    <Popconfirm title="¿Esta seguro de borrar el costo indirecto?" okText="Si" cancelText="No" onConfirm={() => this.onDeleteIndirectCost(indirectCost.id)}>
                                        <a href="#"> <Icon type="delete" /></a>
                                    </Popconfirm>
                                </span>
                            }
                            
                            when={isEditing}
                        />

                        </Col>
                        <IndirectCosts isEditing={isEditing} projectId={projectId} level={level-1} parentId={indirectCost.id}  parentIndex={parentIndex!=null?parentIndex+(index+1)+".":(index+1)+"."}/>
                        
                        </Row> }
                    or={
                        <Row gutter={150}>
                        <Col offset={5-level}>
                            <Col span={4}>{parentIndex!=null?parentIndex+(index+1):(index+1)}. {indirectCost.description}</Col>
                            <Col>{indirectCost.amount} 
                            <Mayre
                                of={
                                    <span > <a href="#" onClick={() => this.onEdit(index, region)}>
                                            <Icon type="edit"/></a> < span className = "ant-divider" /> <Popconfirm
                                            title="¿Esta seguro de borrar esta región?"
                                            okText="Si"
                                            cancelText="No"
                                            onConfirm={() => this.onDelete(index, region)}>
                                            <a href="#">
                                                <Icon type="delete"/></a>
                                        </Popconfirm> 
                                    </span>
                                }
                                
                                when={isEditing}
                            />

                            
                            
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
                            <Row gutter={150}>
                                <Col offset={5-level}>
                               <Form layout="inline" ref="addTitleOrCost" >
                                    <FormItem>
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: 'la descripcion es obligatoria!' }],
                                    })(
                                        <Input  size="small" placeholder="example." />
                                    )}
                                    </FormItem>
                                    <FormItem>
                                    {getFieldDecorator('amount', {
                                        rules: [{ required: level==0, message: 'la cantidad es obligatoria!' }],
                                        initialValue: 0
                                    })(
                                        <InputNumber 
                                        size="small" 
                                        min={0} 
                                        precision={2} 
                                        step={1}  
                                        formatter={value => `L. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                                        parser={value => value.toString().replace(/\L\.\s?|(,*)/g, '')}
                                        />
                                    )}
                                    </FormItem>
                                    <FormItem>
                                        <Button size="small" type="primary" htmlType="submit" onClick={() => this.onAddItem()}><Icon type="plus" /></Button>
                                    </FormItem>
                                </Form>                                                                 
                            </Col>
                            </Row>
                        }
                        when={isEditing && level>0}
                        />
                    }
                    {<Row gutter={150}>
                        <Col offset={5-level} className="total">
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
  parentIndex: null,
  isEditing: true
};

IndirectCostList.propTypes = {
    projectId:PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        indirectCosts: state.projects.IndirectCosts
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        AddIndirectCostToList: (projectId,indirectCostId,description,amount,type) => {
            dispatch(AddIndirectCost(projectId,indirectCostId,description,amount,type))
        },
        DeleteIndirectCostFromList: (projectId,id) => {
            dispatch(DeleteIndirectCost(projectId,id));
        }
    }
}

let IndirectCosts = connect(mapStateToProps, mapDispatchToProps)(Form.create()(IndirectCostList));

export default IndirectCosts;

