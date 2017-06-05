import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    Row,
    Col,
    Button,
    Icon,
    Tooltip,
    Popconfirm
} from 'antd';
import '../styles/costSheets.css';
import CostSheetForm from './CostSheetForm';

class CostSheets extends Component {
    state = {
        visible:false
    };
    onCreate() {
       let {AddCostSheet,entityId} = this.props;
       AddCostSheet(entityId);
    }
    render() {
        return (
            <Row>
                <Row>
                    <Button
                        type="primary"
                        icon="plus"
                        className="add-cost-sheet-button"
                        onClick={() => this.onCreate()}>Add</Button>
                </Row>
            </Row>
        );
    }
}

CostSheets.propTypes = {
    AddCostSheet: PropTypes.func.isRequired,
    costSheets: PropTypes.array.isRequired,
    entityId: PropTypes.number.isRequired
};

export default CostSheets;