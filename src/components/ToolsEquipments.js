import React, {Component, PropTypes} from 'react';
import {
    Table,
    Row,
    Col,
    Button,
    Icon,
    Tooltip,
    Popconfirm
} from 'antd';
import '../styles/toolsEquipments.css';
import ToolsEquipmentsForm from './ToolsEquipmentsForm';

Number.prototype.padZero= function(len, c){
    var s= this.toString(), c= c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class ToolsEquipments extends Component {
    state = {
        isCreateFormVisible: false,
        isEditFormVisible: false
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Code',
                key: 'code',
                render: (text, toolsEquipment) => {
                    return (<span>{toolsEquipment.code.padZero(10)}</span>);
                }
            }, {
                title: 'Description',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: 'Action',
                key: 'action',
                width: 120,
                render: (text, toolsEquipment, index) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(index, toolsEquipment)}>
                            <Icon type="edit"/>
                            Edit</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="Are you sure delete this tools and equipment?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDelete(index, toolsEquipment)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        this.handle = this.handleCreate;
        this.title = "Add Tool and Equipment";
        this.toolsEquipment = {};
    }
    componentWillMount() {
        let {FetchTools, entityId} = this.props;

        FetchTools(entityId);
    }
    onDelete(index, toolsEquipment) {
        console.log(toolsEquipment);
        alert(index);

    }
    onEdit(index, toolsEquipment) {
        this.handle = this.handleEdit;
        this.title = "Edit Tool and Equipment";
        this.toolsEquipment = toolsEquipment;
        this.setState({visible: true});
        let {FetchToolCostHistory} = this.props;
        FetchToolCostHistory(toolsEquipment.id);
        console.log(toolsEquipment);
    }
    onCreate() {
        this.handle = this.handleCreate;
        this.title = "Add Tool and Equipment";
        this.toolsEquipment = {};
        this.setState({visible: true});
    }
    handleCancel = () => {
        this.setState({visible: false});
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddTool,entityId} = this.props;
            delete values.id;
            AddTool(entityId,values);
            form.resetFields();
            this.setState({visible: false});
        });
    }
    handleEdit = () => {

        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {UpdateTool} = this.props;
            UpdateTool(values.id, values);
            form.resetFields();
            this.setState({visible: false});
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        let {
            toolsEquipments,
            loading,
            costHistory,
            isSaving
        } = this.props;
        return (
            <Row>
                <ToolsEquipmentsForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handle}
                    toolsEquipment={this.toolsEquipment}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    title={this.title}
                />

                <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-toolsEquipments-button"
                        onClick={() => this.onCreate()}>Add</Button>
                </Row>
                <Table
                    rowKey={item => item.id}
                    size="middle"
                    bordered={true}
                    loading={loading}
                    dataSource={toolsEquipments}
                    columns={this.columns}
                    pagination={{
                    pageSize: 20
                }}/>
            </Row>
        );
    }
}


ToolsEquipments.propTypes = {
    FetchTools: PropTypes.func.isRequired,
    toolsEquipments: PropTypes.array,
    FetchToolCostHistory: PropTypes.func.isRequired,
    costHistory: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    AddTool: PropTypes.func.isRequired,
    UpdateTool: PropTypes.func.isRequired,
    entityId: PropTypes.number.isRequired
};

export default ToolsEquipments;