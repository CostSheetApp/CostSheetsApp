import React, { Component, PropTypes } from 'react';
import {Table,Row,Button, Icon,Popconfirm} from 'antd';
import '../styles/projects.css';
import ProjectForm from './ProjectForm';

class Projects extends Component {
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Name',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: 'Budget',
          dataIndex: 'budget',
          key: 'budget'
        }, {
          title: 'Profit Percentage',
          dataIndex: 'profitPercentage',
          key: 'profitPercentage'
        }, {
          title: 'Start Date',
          dataIndex: 'startDate',
          key: 'startDate'
        }, {
          title: 'Action',
          key: 'action',
          width: 120,
          render: (text, project, index) => (
            <span>
              <a href="#" onClick={() => this.onEdit(index,project) } > <Icon type="edit" /> Edit</a>
              <span className="ant-divider" />
              <Popconfirm title="Are you sure delete this project?" okText="Yes" cancelText="No" onConfirm={() => this.onDelete(index,region)}>
                  <a href="#"> <Icon type="delete" /> Delete</a>
              </Popconfirm>
            </span>
          ),
        }];
        this.handle = this.handleCreate;
        this.title = "Add Project";
        this.region={};
    }  
    componentWillMount() {
        let { FetchProjects,entityId } = this.props
        FetchProjects(entityId);
    }
    onDelete(index,region){
      console.log(region);
      alert(index);

    }
    onEdit(index,region){
        this.handle = this.handleEdit;
        this.title = "Edit Project";
        this.region = region;
        this.setState({ visible: true });
        console.log(region);      
    }
    onCreate(){
        this.handle = this.handleCreate;
        this.title = "Add Project";
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
        let { AddProject,entityId } = this.props;
        delete values.id;
        AddProject(entityId,values);
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
        let { EditProject } = this.props;
        var id = values.id;
        delete values.id;
        EditProject(id, values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        let {projects,loading,isSaving} = this.props;
        return (
            <Row>
                <ProjectForm 
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handle}
                project={this.project}
                isSaving={isSaving}
                title={this.title}
                />

                <Row><Button type="primary" icon="plus" className="add-project-button" onClick={()=>this.onCreate()}>Add</Button></Row>
                <Table rowKey={item => item.id} size="middle" bordered={true} loading={loading} dataSource={projects} columns={this.columns} pagination={{pageSize:20}} />
            </Row>
        );
    }
}

Projects.propTypes = {
    FetchRegions: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    entityId: PropTypes.number.isRequired
};


export default Projects;