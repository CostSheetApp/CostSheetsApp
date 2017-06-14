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
import '../styles/materials.css';
import AddMaterialForm from './AddMaterialForm';
import EditMaterialForm from './EditMaterialForm';

Number.prototype.padZero= function(len, c){
    let s= this.toString();
    c = c || '0';
    while(s.length< len) s= c+ s;
    return s;
};

class Materials extends Component {
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
        this.material = {};
    }
    state = {
        AddMaterialFormIsVisible:false,
        EditMaterialFormIsVisible:false
    };
    componentWillMount() {
        let {FetchMaterials,FetchRegions,entityId} = this.props;
        FetchMaterials(entityId);
        FetchRegions(entityId);
    }
    onDelete(index, material) {
        let {DeleteMaterial} = this.props;
        DeleteMaterial(material.id);
    }
    onEdit(index, material) {
        this.material = material;
        this.setState({EditMaterialFormIsVisible: true});
        let {FetchMaterialCostHistory} = this.props;
        FetchMaterialCostHistory(material.id);
    }
    onCreateMaterial() {
        this.material = {};
        this.setState({AddMaterialFormIsVisible: true});
    }
    CancelAdd = () => {
        this.setState({AddMaterialFormIsVisible: false});
    }
    CancelEdit = () => {
        this.setState({EditMaterialFormIsVisible: false});
    }
    Create = () => {
        const form = this.addForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddMaterial,entityId} = this.props;
            delete values.id;
            AddMaterial(entityId,values);
            form.resetFields();
            this.setState({AddMaterialFormIsVisible: false});
        });
    }
    Edit = () => {
        const form = this.editForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {UpdateMaterial} = this.props;
            UpdateMaterial(values.id, values);
            form.resetFields();
            this.setState({EditMaterialFormIsVisible: false});
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
            materials,
            loading,
            FetchUnitsOfMeasurement,
            costHistory,
            UnitsOfMeasurement,
            isSaving,
            regions
        } = this.props;
        return (
            <Row>
                    <EditMaterialForm
                    ref={this.saveEditFormRef}
                    visible={this.state.EditMaterialFormIsVisible}
                    onCancel={this.CancelEdit}
                    onCreate={this.Edit}
                    FetchUnitsOfMeasurement={FetchUnitsOfMeasurement}
                    material={this.material}
                    UnitsOfMeasurement={UnitsOfMeasurement}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    Regions={regions}
                    />

                    <AddMaterialForm
                    ref={this.saveAddFormRef}
                    visible={this.state.AddMaterialFormIsVisible}
                    onCancel={this.CancelAdd}
                    onCreate={this.Create}
                    FetchUnitsOfMeasurement={FetchUnitsOfMeasurement}
                    UnitsOfMeasurement={UnitsOfMeasurement}
                    isSaving={isSaving}
                    Regions={regions}
                    />
                <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-material-button"
                        onClick={() => this.onCreateMaterial()}>Add</Button>
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
    loading: PropTypes.bool.isRequired,
    AddMaterial: PropTypes.func.isRequired,
    UpdateMaterial: PropTypes.func.isRequired,
    DeleteMaterial: PropTypes.func.isRequired,
    entityId: PropTypes.number.isRequired,
    FetchRegions: PropTypes.func.isRequired,
    regions: PropTypes.array.isRequired,
};

export default Materials;