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
    //Card,
    //Tag
} from 'antd';
//import Moment from 'react-moment';
import '../styles/costSheets.css';
import IndirectCosts from './IndirectCosts';
//import CostSheetForm from './CostSheetForm';

class CostSheets extends Component {
    state = {
        visible:false
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
    render() {
        //let {costSheets,ViewCostSheet} = this.props;
        return (
            <Row>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Costos Indirectos" key="1">
                        <Row>
                            <IndirectCosts ProjectId={1} />
                        </Row>
                        
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-cost-sheet-button"
                        onClick={() => this.onCreate()}>Agregar Ficha de Costo</Button>
                </Row>

                <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-cost-sheet-button"
                        onClick={() => this.onConsolidate()}>Generar Consolidados</Button>
                </Row>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">Content of Tab Pane 3</Tabs.TabPane>
                </Tabs>
                               
            </Row>
        );
    }
}

CostSheets.propTypes = {
    FetchProjectsCostSheet: PropTypes.func.isRequired,
    costSheets: PropTypes.array,
    entityId: PropTypes.number.isRequired,
    ViewCostSheet: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    FetchIndirectCosts: PropTypes.func.isRequired,
};

export default CostSheets;