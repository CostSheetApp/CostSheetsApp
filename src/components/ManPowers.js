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
import '../styles/manPowers.css';
import ManPowersForm from './ManPowersForm';

Number.prototype.padZero= function(len, c){
    var s= this.toString(), c= c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class ManPowers extends Component {
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
                render: (text, manPower) => {
                    return (<span>{manPower.code.padZero(10)}</span>);
                }
            }, {
                title: 'Description',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: 'Action',
                key: 'action',
                width: 120,
                render: (text, manPower, index) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(index, manPower)}>
                            <Icon type="edit"/>
                            Edit</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="Are you sure delete this man power?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDelete(index, manPower)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        this.handle = this.handleCreate;
        this.title = "Add man power";
        this.manPower = {};
    }
    componentWillMount() {
        let {FetchManPowers, entityId} = this.props;

        FetchManPowers(entityId);
    }
    onDelete(index, manPower) {
        console.log(manPower);
        alert(index);

    }
    onEdit(index, manPower) {
        this.handle = this.handleEdit;
        this.title = "Edit man power";
        this.manPower = manPower;
        this.setState({visible: true});
        let {FetchManPowerCostHistory} = this.props;
        FetchManPowerCostHistory(manPower.id);
        console.log(manPower);
    }
    onCreate() {
        this.handle = this.handleCreate;
        this.title = "Add man power";
        this.manPower = {};
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
            let {AddManPower,entityId} = this.props;
            delete values.id;
            AddManPower(entityId,values);
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
            let {UpdateManPower} = this.props;
            UpdateManPower(values.id, values);
            form.resetFields();
            this.setState({visible: false});
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        let {
            manPowers,
            loading,
            costHistory,
            isSaving
        } = this.props;
        return (
            <Row>
                <ManPowersForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handle}
                    manPower={this.manPower}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    title={this.title}
                />

                <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-manPowers-button"
                        onClick={() => this.onCreate()}>Add</Button>
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
    costHistory: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    AddManPower: PropTypes.func.isRequired,
    UpdateManPower: PropTypes.func.isRequired,
    entityId: PropTypes.number.isRequired
};

export default ManPowers;