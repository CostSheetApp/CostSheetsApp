import React, { Component, PropTypes } from 'react';
import {Table,Row,Button, Icon,Popconfirm} from 'antd';
//import Moment from 'react-moment';
import '../styles/projects.css';
import JobForm from './JobForm';

Number.prototype.padZero= function(len, c){
    let s= this.toString();
    c = c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class Jobs extends Component {
    constructor(props){
      super(props);
      this.columns = [
         {
            title: 'Code',
            key: 'code',
            render: (text, job) => {
                return (<span>{job.code.padZero(10)}</span>);
            }
        }, {
          title: 'Description',
          dataIndex: 'description',
          key: 'description'
        }, {
          title: 'Action',
          key: 'action',
          width: 220,
          render: (text, job, index) => (
            <span>
              <a href="#" onClick={() => this.onEdit(index,job)} > <Icon type="edit" /> Edit</a>
              <span className="ant-divider" />
              <Popconfirm title="Are you sure delete this job?" okText="Yes" cancelText="No" onConfirm={() => this.onDelete(index,job)}>
                  <a href="#"> <Icon type="delete" /> Delete</a>
              </Popconfirm>
            </span>
          ),
        }];
        this.handle = this.handleCreate;
        this.title = "Add Job";
        this.job={};
    }  
    state = { 
      isCreateFormVisible: false,
      isEditFormVisible: false 
    };
    componentWillMount() {
        let { FetchJobs } = this.props;
        FetchJobs();
    }
    onDelete(index,job){
        let { DeleteJob } = this.props;
        DeleteJob(job.id);

    }
    onEdit(index,job){
        this.handle = this.handleEdit;
        this.title = "Edit Job";
        this.job = job;
        this.setState({ visible: true });
        //console.log(project);      
    }
    onCreate(){
        this.handle = this.handleCreate;
        this.title = "Add Job";
        this.job = {};
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
        let { AddJob } = this.props;
        delete values.id;
        AddJob(values);
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
        let { EditJob } = this.props;
        EditJob(values.id, values);
        form.resetFields();
        this.setState({ visible: false });
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        let {jobs,loading,isSaving} = this.props;
        return (
            <Row>
                <JobForm 
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handle}
                job={this.job}
                isSaving={isSaving}
                title={this.title}
                />

                <Row><Button type="primary" icon="plus" className="add-job-button" onClick={()=>this.onCreate()}>Add</Button></Row>
                <Table rowKey={item => item.id} size="middle" bordered={true} loading={loading} dataSource={jobs} columns={this.columns} pagination={{pageSize:20}} />
            </Row>
        );
    }
}

Jobs.propTypes = {
    FetchJobs: PropTypes.func.isRequired,
    AddJob: PropTypes.func.isRequired,
    EditJob: PropTypes.func.isRequired,
    DeleteJob: PropTypes.func.isRequired,
    jobs: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    entityId: PropTypes.number.isRequired
};


export default Jobs;