import React, { Component, PropTypes } from 'react';
import {Table,Row,Col,Button, Icon,Tooltip,Popconfirm} from 'antd';
import '../styles/materials.css';
import MaterialForm from './MaterialForm';

class Materials extends Component {
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Code',
          dataIndex: 'code',
          key: 'code'
        }, {
          title: 'Description',
          dataIndex: 'description',
          key: 'description'
        }, {
          title: 'Waste',
          dataIndex: 'waste',
          key: 'waste',
        }, {
          title: 'Unit Of Measurement',
          key: 'unitsOfMeasurementId',
          render: (text,material) => (
            <Tooltip title={material.unitsOfMeasurement.description}>
                <span>{material.unitsOfMeasurement.abbreviation}</span>
            </Tooltip>
          ),
        }, {
          title: 'Action',
          key: 'action',
          width: 120,
          render: (text, material, index) => (
            <span>
              <a href="#" onClick={() => this.onEdit(index) } > <Icon type="edit" /> Edit</a>
              <span className="ant-divider" />
              <Popconfirm title="Are you sure delete this material?" okText="Yes" cancelText="No" onConfirm={() => this.onDelete(index)}>
                  <a href="#"> <Icon type="delete" /> Delete</a>
              </Popconfirm>
            </span>
          ),
        }];
    }  
    componentWillMount() {
        let {FetchMaterials} = this.props;

        FetchMaterials();
    }
    onDelete(index){
      alert(index);
    }
    onEdit(index){
      alert(index);
    }
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        let { AddAppoitment } = this.props;
        const form = this.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }
        
        AddAppoitment(values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        let {materials,loading,FetchMaterialCostHistory,material,costHistory,isSaving} = this.props;
        return (
            <Row>
                <MaterialForm 
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                FetchMaterialCostHistory={(id)=>FetchMaterialCostHistory(id)}
                material={material}
                costHistory={costHistory}
                isSaving={isSaving}
                />

                <Row><Button type="primary" icon="plus" className="add-material-button" onClick={this.showModal}>Add</Button></Row>
                <Table rowKey={item => item.id} size="middle" bordered={true} loading={loading} dataSource={materials} columns={this.columns} pagination={{pageSize:20}} />
            </Row>
        );
    }
}

Materials.propTypes = {
    FetchMaterials: PropTypes.func.isRequired,
    materials: PropTypes.array.isRequired,
    FetchMaterialCostHistory: PropTypes.func.isRequired,
    material: PropTypes.object,
    costHistory: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired
};

export default Materials;