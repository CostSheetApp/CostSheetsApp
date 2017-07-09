import React, {Component, PropTypes} from 'react';
import {
    Table,
    Row,
    //Col,
    Button,
    Icon,
    Tooltip,
    Popconfirm
} from 'antd';
import '../styles/manPowers.css';
import AddManPowersForm from './AddManPowersForm';
import EditManPowersForm from './EditManPowersForm';

Number.prototype.padZero= function(len, c){
    let s= this.toString(); 
    c = c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class ManPowers extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Código',
                key: 'code',
                render: (text, manPower) => {
                    return (<span>{manPower.code.padZero(10)}</span>);
                }
            }, {
                title: 'Descripción',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: 'Puesto de Trabajo',
                key: 'jobId',
                render: (text, manPower) => {
                    if (!manPower.job) {
                        return;
                    }
                    return (
                        <Tooltip title={manPower.job.description}>
                            <span>{manPower.job.description}</span>
                        </Tooltip>
                    );
                }
            }, {
                title: 'Acción',
                key: 'action',
                width: 120,
                render: (text, manPower, index) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(index, manPower)}>
                            <Icon type="edit"/>
                            Editar</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="¿Esta seguro de borrar esta mano de obra?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDelete(index, manPower)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Borrar</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        this.manPower = {};
    }
    state = {
        AddManPowersFormIsVisible:false,
        EditManPowersFormIsVisible:false
    };
    componentWillMount() {
        let {FetchManPowers,FetchRegions, entityId} = this.props;
        FetchRegions(entityId);
        FetchManPowers(entityId);
    }
    onDelete(index, manPower) {
        let {DeleteManPower} = this.props;
        DeleteManPower(manPower.id);

    }
    onEdit(index, manPower) {
        this.manPower = manPower;
        this.setState({EditManPowersFormIsVisible: true});
        let {FetchManPowerCostHistory} = this.props;
        FetchManPowerCostHistory(manPower.id);
        //console.log(manPower);
    }
    onCreateManPower() {
        this.manPower = {};
        this.setState({AddManPowersFormIsVisible: true});
    }
    CancelAdd = () => {
        this.setState({AddManPowersFormIsVisible: false});
    }
    CancelEdit = () => {
        this.setState({EditManPowersFormIsVisible: false});
    }
    Create = () => {
        const form = this.addForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddManPower,entityId} = this.props;
            delete values.id;
            AddManPower(entityId,values);
            form.resetFields();
            this.setState({AddManPowersFormIsVisible: false});
        });
    }
    Edit = () => {
        const form = this.editForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {UpdateManPower} = this.props;
            UpdateManPower(values.id, values);
            form.resetFields();
            this.setState({EditManPowersFormIsVisible: false});
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
            manPowers,
            loading,
            FetchJobs,
            costHistory,
            regions,
            AddCostManPower,
            Jobs,
            isSaving
        } = this.props;
        return (
            <Row>
                <EditManPowersForm
                    ref={this.saveEditFormRef}
                    visible={this.state.EditManPowersFormIsVisible}
                    onCancel={this.CancelEdit}
                    onCreate={this.Edit}
                    AddCostManPower={AddCostManPower}
                    FetchJobs={FetchJobs}
                    manPower={this.manPower}
                    Jobs={Jobs}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    Regions={regions}
                />

                <AddManPowersForm
                    ref={this.saveAddFormRef}
                    visible={this.state.AddManPowersFormIsVisible}
                    onCancel={this.CancelAdd}
                    onCreate={this.Create}
                    FetchJobs={FetchJobs}
                    manPower={this.manPower}
                    Jobs={Jobs}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    Regions={regions}
                />

                <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-manPowers-button"
                        onClick={() => this.onCreateManPower()}>Agregar</Button>
                </Row>
                <Table
                    rowKey={item => item.id}
                    size="middle"
                    bordered={true}
                    loading={loading}
                    dataSource={manPowers}
                    columns={this.columns}
                    pagination={{
                    pageSize: 20
                }}/>
            </Row>
        );
    }
}


ManPowers.propTypes = {
    FetchManPowers: PropTypes.func.isRequired,
    manPowers: PropTypes.array,
    FetchManPowerCostHistory: PropTypes.func.isRequired,
    FetchJobs: PropTypes.func.isRequired,
    costHistory: PropTypes.object.isRequired,
    Jobs: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    AddManPower: PropTypes.func.isRequired,
    UpdateManPower: PropTypes.func.isRequired,
    DeleteManPower: PropTypes.func.isRequired,
    AddCostManPower: PropTypes.func.isRequired,
    FetchRegions: PropTypes.func.isRequired,
    regions: PropTypes.array.isRequired,
    entityId: PropTypes.number.isRequired
    
};

export default ManPowers;