import React, { Component, PropTypes } from 'react';
import {Table,Row,Button, Icon,Popconfirm} from 'antd';
import '../styles/regions.css';
import RegionForm from './RegionForm';

class Regions extends Component {
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: 'Action',
          key: 'action',
          width: 120,
          render: (text, region, index) => (
            <span>
              <a href="#" onClick={() => this.onEdit(index,region)} > <Icon type="edit" /> Edit</a>
              <span className="ant-divider" />
              <Popconfirm title="Are you sure delete this region?" okText="Yes" cancelText="No" onConfirm={() => this.onDelete(index,region)}>
                  <a href="#"> <Icon type="delete" /> Delete</a>
              </Popconfirm>
            </span>
          ),
        }];
        this.handle = this.handleCreate;
        this.title = "Add Region";
        this.region={};
    } 
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    componentWillMount() {
        let { FetchRegions,entityId } = this.props;
        FetchRegions(entityId);
    }
    onDelete(index,region){
        let {DeleteRegion} = this.props;
        DeleteRegion(region.id);
    }
    onEdit(index,region){
        this.handle = this.handleEdit;
        this.title = "Edit Region";
        this.region = region;
        this.setState({ visible: true });
        //console.log(region);      
    }
    onCreate(){
        this.handle = this.handleCreate;
        this.title = "Add Region";
        this.region = {};
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }
        let { AddRegion,entityId } = this.props;
        delete values.id;
        AddRegion(entityId,values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    handleEdit = () => {
        
        const form = this.form;
        form.validateFields((err, values) => {
        if (err) {
            return;
        }
        let { EditRegion } = this.props;
        EditRegion(values.id, values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        let {regions,loading,isSaving} = this.props;
        return (
            <Row>
                <RegionForm 
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handle}
                region={this.region}
                isSaving={isSaving}
                title={this.title}
                />

                <Row><Button type="primary" icon="plus" className="add-region-button" onClick={()=>this.onCreate()}>Add</Button></Row>
                <Table rowKey={item => item.id} size="middle" bordered={true} loading={loading} dataSource={regions} columns={this.columns} pagination={{pageSize:20}} />
            </Row>
        );
    }
}

Regions.propTypes = {
    FetchRegions: PropTypes.func.isRequired,
    AddRegion: PropTypes.func.isRequired,
    EditRegion: PropTypes.func.isRequired,
    DeleteRegion: PropTypes.func.isRequired,
    regions: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    entityId: PropTypes.number.isRequired
};


export default Regions;