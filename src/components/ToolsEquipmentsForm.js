import React, {Component, PropTypes } from 'react';
import Moment from 'react-moment';
import {
    Form,
    Button,
    Modal,
    Input,
    //Icon,
    Table,
    //Col,
    //Select,
    Row
} from 'antd';
const FormItem = Form.Item;
//const Option = Select.Option;

class addToolsEquipmentForm extends Component {
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Description',
          dataIndex: 'toolsEquipment.description',
          key: 'toolsEquipment.description'
        }, {
          title: 'Created At',
          key: 'createdAt',
           render: (text, record) => (
            <span>
                <Moment fromNow>{record.createdAt}</Moment>
            </span>
          ),
        }, {
          title: 'Cost',
          dataIndex: 'cost',
          key: 'cost',
        }
        ];
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            toolsEquipment,
            costHistory,
            //isSaving,
            title
        } = this.props;
        let {getFieldDecorator} = this.props.form;

        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate} > Submit </Button >
                    ]}>
                <Form>
                    {getFieldDecorator('id', {
                        initialValue: toolsEquipment.id?toolsEquipment.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem label="Description">
                    {getFieldDecorator('description', {
                        rules: [
                            { required: true, message: 'Please input tool and equipment description!' }, 
                            ],
                            initialValue: toolsEquipment.description?toolsEquipment.description:""
                    })(
                        <Input  placeholder="Tool and Equipment description" />
                    )}
                    </FormItem>
                    <Row><Button type="primary" icon="plus" className="add-toolsEquipments-button">Add New Price</Button></Row>
                    <FormItem>
                        <Table rowKey={item => item.id} size="small" bordered={true} loading={costHistory.loading} dataSource={costHistory.list} columns={this.columns} pagination={{pageSize:5}}/>
                    </FormItem>
                </Form>
            </Modal>
        );

    }
}

addToolsEquipmentForm.propTypes = {
    toolsEquipment: PropTypes.object,
    costHistory: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
};

const addToolsEquipment = Form.create()(addToolsEquipmentForm);

export default addToolsEquipment;