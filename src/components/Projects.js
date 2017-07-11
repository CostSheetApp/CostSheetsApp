import React, { Component, PropTypes } from 'react';
import {Table,Row,Button, Icon,Popconfirm} from 'antd';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import '../styles/projects.css';
import ProjectForm from './ProjectForm';

class Projects extends Component {
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name'
        }, {
          title: 'Presupuesto',
          dataIndex: 'budget',
          render: (text, record) => (
            <NumberFormat value={record.budget} 
                displayType={'text'}
                thousandSeparator={true} 
                prefix={'L.'} 
                decimalPrecision={2}
            />
          ),
          key: 'budget'
        }, {
          title: 'Porcentaje ganancia',
          dataIndex: 'profitPercentage',
          render: (text, record) => (
            <NumberFormat 
                value={record.profitPercentage}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'%'}
                decimalPrecision={2}
            />
          ),
          key: 'profitPercentage'
        }, {
          title: 'Fecha inicio',
          render: (text, record) => (
            <span>
	            <Moment format="DD/MM/YYYY">{record.createdAt}</Moment>
            </span>
          ),
          key: 'startDate'
        }, {
          title: 'Acción',
          key: 'action',
          width: 190,
          render: (text, project, index) => (
            <span>
              <a href="#" onClick={() => this.ViewProject(project.id)} > <Icon type="search" /> Ver</a>
              <span className="ant-divider" />
              <a href="#" onClick={() => this.onEdit(index,project)} > <Icon type="edit" /> Editar</a>
              <span className="ant-divider" />
              <Popconfirm title="¿Esta seguro de borrar este proyecto?" okText="Yes" cancelText="No" onConfirm={() => this.onDelete(index,project)}>
                  <a href="#"> <Icon type="delete" /> Borrar</a>
              </Popconfirm>
            </span>
          ),
        }];
        this.handle = this.handleCreate;
        this.title = "Agregar Proyecto";
        this.project={};
    }  
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    componentWillMount() {
        let { FetchProjects,entityId } = this.props;
        FetchProjects(entityId);
    }
    onDelete(index,project){
        let { DeleteProject } = this.props;
        DeleteProject(project.id);

    }
    onEdit(index,project){
        this.handle = this.handleEdit;
        this.title = "Editar Proyecto";
        this.project = project;
        this.setState({ visible: true });
        //console.log(project);      
    }
    onCreate(){
        this.handle = this.handleCreate;
        this.title = "Agregar Proyecto";
        this.project = {};
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
        EditProject(values.id, values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    ViewProject(id){
        let { ViewProject } = this.props;
        ViewProject(id);
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

                <Row><Button type="primary" icon="plus" className="add-project-button" onClick={()=>this.onCreate()}>Agregar</Button></Row>
                <Table rowKey={item => item.id} size="middle" bordered={true} loading={loading} dataSource={projects} columns={this.columns} pagination={{pageSize:20}} />
            </Row>
        );
    }
}

Projects.propTypes = {
    FetchProjects: PropTypes.func.isRequired,
    AddProject: PropTypes.func.isRequired,
    EditProject: PropTypes.func.isRequired,
    DeleteProject: PropTypes.func.isRequired,
    ViewProject: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    entityId: PropTypes.number.isRequired
};


export default Projects;