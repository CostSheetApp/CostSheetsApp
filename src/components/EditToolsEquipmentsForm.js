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
import AddCostToolForm from './AddCostToolForm';
const FormItem = Form.Item;
//const Option = Select.Option;

class editToolsEquipmentForm extends Component {
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Region',
          dataIndex: 'region.name',
          key: 'region.name'
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
    state = {
        AddCostToolFormIsVisible:false
    };
    onCreateToolCost(toolsEquipment) {
        this.toolsEquipment = toolsEquipment;
        this.setState({AddCostToolFormIsVisible: true});
    }
    CancelCreateCost = () => {
        this.setState({AddCostToolFormIsVisible: false});
    }
    CreateCost = () => {
        const form = this.addCostForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddCostTool} = this.props;
            AddCostTool(values);
            form.resetFields();
            this.setState({AddCostToolFormIsVisible: false});
        });
    }
    saveAddCostFormRef = (form) => {
        this.addCostForm = form;
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            toolsEquipment,
            costHistory,
            Regions,
            isSaving
        } = this.props;
        let {getFieldDecorator} = this.props.form;

        return (
            <Row>
                <AddCostToolForm
                    ref={this.saveAddCostFormRef}
                    visible={this.state.AddCostToolFormIsVisible}
                    onCancel={this.CancelCreateCost}
                    onCreate={this.CreateCost}
                    toolsEquipment={this.toolsEquipment}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    Regions={Regions}
                    toolsAndEquipmentId={this.toolsEquipment?this.toolsEquipment.id:0}
                />
                <Modal
                    visible={visible}
                    title={"Edit Tools"}
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
                        <Row><Button type="primary" icon="plus" className="add-toolsEquipments-button" onClick={() => this.onCreateToolCost(toolsEquipment)}>Add New Price</Button></Row>
                        <FormItem>
                            <Table rowKey={item => item.id} size="small" bordered={true} loading={costHistory.loading} dataSource={costHistory.list} columns={this.columns} pagination={{pageSize:5}}/>
                        </FormItem>
                    </Form>
                </Modal>
            </Row>
        );

    }
}

editToolsEquipmentForm.propTypes = {
    toolsEquipment: PropTypes.object,
    costHistory: PropTypes.object.isRequired,
    Regions: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    AddCostTool: PropTypes.func.isRequired
};

const editToolsEquipment = Form.create()(editToolsEquipmentForm);

export default editToolsEquipment;