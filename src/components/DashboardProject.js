import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    //Table,
    Row,
    Col,
    Button,
    Tabs,
    //Icon,
    //Tooltip,
    //Popconfirm,
    Card,
    Tag
} from 'antd';
import Moment from 'react-moment';
import '../styles/costSheets.css';
import IndirectCosts from './IndirectCosts';
import AddCostSheetForm from './AddCostSheetForm';
//import CostSheetForm from './CostSheetForm';

class DashboardProject extends Component {
     state = {
        AddMaterialFormIsVisible:false
    };
    componentWillMount() {
        let {id} = this.props.params;
        let {FetchProjectsCostSheet,FetchIndirectCosts} = this.props;
        FetchProjectsCostSheet(id);
        FetchIndirectCosts(id);
    }
    onCreate() {
       alert('Nueva ficha de costo');
       //let {AddCostSheet,entityId} = this.props;
       //AddCostSheet(entityId);
    }
    onConsolidate() {
       alert('Consolidados');
       //let {AddCostSheet,entityId} = this.props;
       //AddCostSheet(entityId);
    }
    saveAddFormRef = (form) => {
        this.addForm = form;
    }
    onCreateMaterial() {
        this.material = {};
        this.setState({AddMaterialFormIsVisible: true});
    }
    CancelAdd = () => {
        this.setState({AddMaterialFormIsVisible: false});
    }
    Create = () => {
        const form = this.addForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddCostSheet} = this.props;
            delete values.id;
            let {id} = this.props.params;
            values.projectId = id;
            values.totalCost = 0.0;
            AddCostSheet(values);
            form.resetFields();
            this.setState({AddMaterialFormIsVisible: false});
        });
    }
    render() {
        let {FetchCostSheets,costSheets,ViewCostSheet,entityId,costSheetList,regions,FetchRegions} = this.props;
        return (
            <Row>
                <AddCostSheetForm
                    ref={this.saveAddFormRef}
                    visible={this.state.AddMaterialFormIsVisible}
                    onCancel={this.CancelAdd}
                    onCreate={this.Create}
                    FetchCostSheets={FetchCostSheets}
                    FetchRegions={FetchRegions}
                    entityId={entityId}
                    costSheetList={costSheetList}
                    isSaving={false}
                    Regions={regions}
                    />
                <Row type="flex" justify="end">
                                                <Col>
                                                <Button
                                type="default"
                                icon="plus"
                                className="add-cost-sheet-button"
                                onClick={() => this.onConsolidate()}>Generar Consolidados</Button></Col>
                </Row>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Fichas de Costos" key="1">
                        <Row>
                            <Button
                                type="primary"
                                icon="plus"
                                className="add-cost-sheet-button"
                                onClick={() => this.onCreateMaterial()}>Agregar Ficha de Costo
                            </Button>
                        </Row>
                        <Row>
                            {costSheets.map((sheet,i) => 
                            <Col key={i} span="8" className="separate">
                            <Card title={sheet.costSheet.description} bordered={true}>
                                <Row>
                                    Cantidad de Obra: {sheet.totalUnit.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ` ${sheet.costSheet.unitsOfMeasurement.abbreviation}`  }
                                </Row>
                                <Row>
                                    Costo Mínimo: {'L. ' + sheet.costSheet.minimumCost.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")  }
                                </Row>
                                <Row>
                                    Costo total de obra: {'L. ' + (sheet.totalUnit*sheet.costSheet.minimumCost).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")  }
                                </Row>
                                <Row>
                                    Región: <Tag color='green'>{sheet.region.name}</Tag>
                                </Row>
                                <Row className="action-panel">
                                <Button type="primary" className="actions" onClick={() => ViewCostSheet(sheet.costSheetId)}>Ver</Button>
                                </Row>
                                </Card>
                            </Col>
                            )}
                        </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Costos Indirectos" key="2">
                        <Row>
                            <IndirectCosts projectId={1}/>
                        </Row>                        
                    </Tabs.TabPane>
                </Tabs>
            </Row>
        );
    }
}

DashboardProject.propTypes = {
    FetchProjectsCostSheet: PropTypes.func.isRequired,
    costSheets: PropTypes.array,
    costSheetList:PropTypes.array,
    entityId: PropTypes.number.isRequired,
    ViewCostSheet: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    FetchIndirectCosts: PropTypes.func.isRequired,
    FetchCostSheets: PropTypes.func.isRequired,
    regions:PropTypes.array.isRequired,
    FetchRegions:PropTypes.func.isRequired,
    AddCostSheet:PropTypes.func.isRequired,
};

export default DashboardProject;