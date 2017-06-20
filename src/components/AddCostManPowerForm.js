import React, {Component, PropTypes } from 'react';
//import Moment from 'react-moment';
//import Mayre from 'mayre';
import {
    Form,
    Button,
    Modal,
    Input,
    //Icon,
    //Table,
    Col,
    Select
    //Row
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class addCostToolForm extends Component {
    render() {
        let {
            manpowerId,
            visible,
            onCancel,
            onCreate,
            isSaving,
            Regions
        } = this.props;
        let {getFieldDecorator} = this.props.form;

        return (
            <Modal
                visible={visible}
                title={"Add Cost"}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Submit </Button >
                    ]}
            >
                <Form>
                    {getFieldDecorator('manpowerId', {
                            initialValue: manpowerId?manpowerId:0
                        })(
                            <Input type="hidden" />
                        )}
                    <FormItem style={{paddingTop:"10px"}}>
                        <Col span="12" >
                            <FormItem label="Cost">
                                {getFieldDecorator('cost', {
                        rules: [
                            { required: true, message: 'Please input new cost!' }, 
                            ],
                            initialValue: 0
                        })(
                            <Input type="number" placeholder="New cost" />
                        )}
                            </FormItem>
                        </Col>
                        <Col span="12">
                                <FormItem label="Region">
                                    {getFieldDecorator('regionId', {
                                        rules: [
                                            { required: true, message: 'Please select a region' }, 
                                            ],
                                            
                                    })(
                                        <Select
                                        showSearch
                                        placeholder="Select a region"
                                        optionFilterProp="children"
                                        //onChange={handleChange}
                                        filterOption={(input, option) => {
                                            //console.log(input,option);
                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    >
                                        {Regions.map(o => <Option key={o.id} >{`${o.name}`}</Option>)}
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

addCostToolForm.propTypes = {
    manPower: PropTypes.object,
    manpowerId:PropTypes.number,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    Regions: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const addCostTool = Form.create()(addCostToolForm);

export default addCostTool;