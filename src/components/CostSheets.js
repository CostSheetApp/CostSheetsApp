import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    //Table,
    Row,
    Col,
    Button,
    //Icon,
    //Tooltip,
    //Popconfirm,
    Card,
    Tag
} from 'antd';
import Moment from 'react-moment';
import '../styles/costSheets.css';
//import CostSheetForm from './CostSheetForm';

class CostSheets extends Component {
    state = {
        visible:false
    };
    componentWillMount() {
        let {FetchCostSheets,entityId} = this.props;
        FetchCostSheets(entityId);
    }
    onCreate() {
       let {AddCostSheet,entityId} = this.props;
       AddCostSheet(entityId);
    }
    render() {
        let {costSheets,ViewCostSheet} = this.props;
        return (
            <Row>
                <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-cost-sheet-button"
                        onClick={() => this.onCreate()}>Agregar</Button>
                </Row>
                <Row>
                    {costSheets.map((sheet,i) => 
                    <Col key={i} span="8" className="separate">
                    <Card title={sheet.description} bordered={true}>
                        <Row>
                            Costo Mínimo: {'L. ' + sheet.minimumCost.toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")  }
                        </Row>
                        <Row>
                            Región: <Tag color="green">{sheet.region.name}</Tag>
                        </Row>
                        <Row>
                            Fecha:  <Moment format="DD/MM/YYYY">{sheet.createdAt}</Moment>
                        </Row>
                        <Row className="action-panel">
                        <Button type="primary" className="actions" onClick={() => ViewCostSheet(sheet.id)}>Ver</Button>
                        </Row>
                        </Card>
                    </Col>
                    )}
                </Row>
            </Row>
        );
    }
}

CostSheets.propTypes = {
    AddCostSheet: PropTypes.func.isRequired,
    costSheets: PropTypes.array.isRequired,
    entityId: PropTypes.number.isRequired,
    ViewCostSheet: PropTypes.func.isRequired,
    FetchCostSheets: PropTypes.func.isRequired,
};

export default CostSheets;