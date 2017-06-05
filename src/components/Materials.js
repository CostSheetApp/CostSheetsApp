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
import '../styles/materials.css';
import MaterialForm from './MaterialForm';

Number.prototype.padZero= function(len, c){
    var s= this.toString(), c= c || '0';
    while(s.length< len) s= c+ s;
    return s;
}

class Materials extends Component {
    state = {
        visible:false
    };
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Code',
                key: 'code',
                render: (text, material) => {
                    return (<span>{material.code.padZero(10)}</span>);
                }
            }, {
                title: 'Description',
                dataIndex: 'description',
                key: 'description'
            }, {
                title: 'Waste %',
                dataIndex: 'waste',
                key: 'waste'
            }, {
                title: 'Unit Of Measurement',
                key: 'unitsOfMeasurementId',
                render: (text, material) => {
                    if (!material.unitsOfMeasurement) {
                        return;
                    }
                    return (
                        <Tooltip title={material.unitsOfMeasurement.description}>
                            <span>{material.unitsOfMeasurement.abbreviation}</span>
                        </Tooltip>
                    );
                }
            }, {
                title: 'Action',
                key: 'action',
                width: 120,
                render: (text, material, index) => (
                    <span>
                        <a href="#" onClick={() => this.onEdit(index, material)}>
                            <Icon type="edit"/>
                            Edit</a>
                        <span className="ant-divider"/>
                        <Popconfirm
                            title="Are you sure delete this material?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.onDelete(index, material)}>
                            <a href="#">
                                <Icon type="delete"/>
                                Delete</a>
                        </Popconfirm>
                    </span>
                )
            }
        ];
        this.handle = this.handleCreate;
        this.title = "Add Material";
        this.material = {};
    }
    componentWillMount() {
        let {FetchMaterials,entityId} = this.props;
        FetchMaterials(entityId);
    }
    onDelete(index, material) {
        alert(index);
    }
    onEdit(index, material) {
        this.handle = this.handleEdit;
        this.title = "Edit Material";
        this.material = material;
        this.setState({visible: true});
        let {FetchMaterialCostHistory} = this.props;
        FetchMaterialCostHistory(material.id);
    }
    onCreate() {
        this.handle = this.handleCreate;
        this.title = "Add Material";
        this.material = {};
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
            let {AddMaterial,entityId} = this.props;
            delete values.id;
            AddMaterial(entityId,values);
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
            let {UpdateMaterial} = this.props;
            UpdateMaterial(values.id, values);
            form.resetFields();
            this.setState({visible: false});
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        let {
            materials,
            loading,
            FetchUnitsOfMeasurement,
            costHistory,
            UnitsOfMeasurement,
            isSaving
        } = this.props;
        return (
            <Row>
                <MaterialForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handle}
                    FetchUnitsOfMeasurement={FetchUnitsOfMeasurement}
                    material={this.material}
                    UnitsOfMeasurement={UnitsOfMeasurement}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    title={this.title}/>

                <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-material-button"
                        onClick={() => this.onCreate()}>Add</Button>
                </Row>
                <Table
                    rowKey={item => item.id}
                    size="middle"
                    bordered={true}
                    loading={loading}
                    dataSource={materials}
                    columns={this.columns}
                    pagination={{
                    pageSize: 20
                }}/>
            </Row>
        );
    }
}

Materials.propTypes = {
    FetchMaterials: PropTypes.func.isRequired,
    materials: PropTypes.array.isRequired,
    FetchMaterialCostHistory: PropTypes.func.isRequired,
    FetchUnitsOfMeasurement: PropTypes.func.isRequired,
    costHistory: PropTypes.object.isRequired,
    UnitsOfMeasurement: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    AddMaterial: PropTypes.func.isRequired,
    UpdateMaterial: PropTypes.func.isRequired,
    entityId: PropTypes.number.isRequired
};

export default Materials;