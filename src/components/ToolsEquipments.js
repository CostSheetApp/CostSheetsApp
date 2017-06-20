import React, {Component, PropTypes} from 'react';
import {
    Table,
    Row,
    //Col,
    Button,
    Icon,
    //Tooltip,
    Popconfirm
} from 'antd';
import '../styles/toolsEquipments.css';
//import ToolsEquipmentsForm from './ToolsEquipmentsForm';
import AddToolsEquipmentsForm from './AddToolsEquipmentsForm';
import EditToolsEquipmentsForm from './EditToolsEquipmentsForm';

Number.prototype.padZero= function(len, c){
    let s= this.toString();
    c= c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class ToolsEquipments extends Component {
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
        this.toolsEquipment = {};
    }
    state = {
        AddToolsEquipmentsFormIsVisible:false,
        EditToolsEquipmentsFormIsVisible:false
    };
    componentWillMount() {
        let {FetchTools,FetchRegions, entityId} = this.props;
        FetchTools(entityId);
        FetchRegions(entityId);
    }
    onDelete(index, toolsEquipment) {
        let {DeleteTool} = this.props;
        DeleteTool(toolsEquipment.id);
    }
    onEdit(index, toolsEquipment) {
        this.toolsEquipment = toolsEquipment;
        this.setState({EditToolsEquipmentsFormIsVisible: true});
        let {FetchToolCostHistory} = this.props;
        FetchToolCostHistory(toolsEquipment.id);
    }
    onCreate() {
        this.toolsEquipment = {};
        this.setState({AddToolsEquipmentsFormIsVisible: true});
    }
    CancelAdd = () => {
        this.setState({AddToolsEquipmentsFormIsVisible: false});
    }
    CancelEdit = () => {
        this.setState({EditToolsEquipmentsFormIsVisible: false});
    }
    Create = () => {
        const form = this.addForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddTool,entityId} = this.props;
            delete values.id;
            AddTool(entityId,values);
            form.resetFields();
            this.setState({AddToolsEquipmentsFormIsVisible: false});
        });
    }
    Edit = () => {

        const form = this.editForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {UpdateTool} = this.props;
            UpdateTool(values.id, values);
            form.resetFields();
            this.setState({EditToolsEquipmentsFormIsVisible: false});
        });
    }
    saveEditFormRef = (form) => {
        this.editForm = form;
    }
    saveAddFormRef = (form) => {
        this.addForm = form;
    }
    render() {
        let {
            toolsEquipments,
            loading,
            costHistory,
            regions,
            AddCostTool,
            isSaving
        } = this.props;
        return (
            <Row>
                <AddToolsEquipmentsForm
                    ref={this.saveAddFormRef}
                    visible={this.state.AddToolsEquipmentsFormIsVisible}
                    onCancel={this.CancelAdd}
                    onCreate={this.Create}
                    toolsEquipment={this.toolsEquipment}
                    costHistory={costHistory}
                    isSaving={isSaving}
                />

                <EditToolsEquipmentsForm
                    ref={this.saveEditFormRef}
                    visible={this.state.EditToolsEquipmentsFormIsVisible}
                    onCancel={this.CancelEdit}
                    onCreate={this.Edit}
                    AddCostTool={AddCostTool}
                    toolsEquipment={this.toolsEquipment}
                    costHistory={costHistory}
                    Regions={regions}
                    isSaving={isSaving}
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
    loading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    AddTool: PropTypes.func.isRequired,
    UpdateTool: PropTypes.func.isRequired,
    DeleteTool: PropTypes.func.isRequired,
    AddCostTool: PropTypes.func.isRequired,
    FetchRegions: PropTypes.func.isRequired,
    entityId: PropTypes.number.isRequired,
    regions: PropTypes.array.isRequired
};

export default ToolsEquipments;