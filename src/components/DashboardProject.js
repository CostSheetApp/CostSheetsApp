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
        let {id} = this.props.params;
        let {FetchProjectsCostSheet} = this.props;
        FetchProjectsCostSheet(id);
    }
    onCreate() {
       alert('New Cost Sheet');
       //let {AddCostSheet,entityId} = this.props;
       //AddCostSheet(entityId);
    }
    render() {
        //let {costSheets,ViewCostSheet} = this.props;
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
    FetchProjectsCostSheet: PropTypes.func.isRequired,
    costSheets: PropTypes.array,
    entityId: PropTypes.number.isRequired,
    ViewCostSheet: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default CostSheets;