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
    Select,
    Row
} from 'antd';
import AddCostManPowerForm from './AddCostManPowerForm';
const FormItem = Form.Item;
const Option = Select.Option;

class editManPowerForm extends Component {
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
        AddCostManPowerFormIsVisible:false
    };
    componentWillMount() {
        let {FetchJobs} = this.props;
        FetchJobs();
    }
    onCreateManPowerCost(manPower) {
        this.manPower = manPower;
        this.setState({AddCostManPowerFormIsVisible: true});
    }
    CancelCreateCost = () => {
        this.setState({AddCostManPowerFormIsVisible: false});
    }
    CreateCost = () => {
        const form = this.addCostForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddCostManPower} = this.props;
            AddCostManPower(values);
            form.resetFields();
            this.setState({AddCostManPowerFormIsVisible: false});
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
            manPower,
            costHistory,
            Regions,
            Jobs,
            isSaving,
            //title
        } = this.props;
        let {getFieldDecorator} = this.props.form;

        return (
            <Row>
                <AddCostManPowerForm
                    ref={this.saveAddCostFormRef}
                    visible={this.state.AddCostManPowerFormIsVisible}
                    onCancel={this.CancelCreateCost}
                    onCreate={this.CreateCost}
                    manPower={this.manPower}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    Regions={Regions}
                    manpowerId={this.manPower?this.manPower.id:0}
                />
                <Modal
                    visible={visible}
                    title={"Edit Man Power"}
                    onCancel={onCancel}
                    onOk={onCreate}
                    footer={[
                        <Button key = "back" size = "large" onClick = {onCancel} > Cancel </Button>, 
                        <Button key="submit" type="primary" size="large" onClick={onCreate} > Submit </Button >
                        ]}>
                    <Form>
                        {getFieldDecorator('id', {
                            initialValue: manPower.id?manPower.id:0
                        })(
                            <Input type="hidden" />
                        )}
                        <FormItem label="Description">
                        {getFieldDecorator('description', {
                            rules: [
                                { required: true, message: 'Please input tool and equipment description!' }, 
                                ],
                                initialValue: manPower.description?manPower.description:""
                        })(
                            <Input  placeholder="Tool and Equipment description" />
                        )}
                        </FormItem>
                        <FormItem label="Job">
                            {getFieldDecorator('jobId', {
                                rules: [
                                    { required: true, message: 'Please input Job!' }, 
                                    ],
                                    initialValue: manPower.jobId?manPower.jobId.toString():null
                            })(
                                <Select
                                    showSearch
                                    placeholder="Select a job"
                                    optionFilterProp="children"
                                    //onChange={handleChange}
                                    filterOption={(input, option) => {
                                        //console.log(input,option);
                                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                >
                                    {Jobs.map(o => <Option key={o.id} >{`${o.description}`}</Option>)}
                                </Select>
                            )}
                            </FormItem>
                        <Row><Button type="primary" icon="plus" className="add-manPowers-button" onClick={() => this.onCreateManPowerCost(manPower)}>Add New Price</Button></Row>
                        <FormItem>
                            <Table rowKey={item => item.id} size="small" bordered={true} loading={costHistory.loading} dataSource={costHistory.list} columns={this.columns} pagination={{pageSize:5}}/>
                        </FormItem>
                    </Form>
                </Modal>
            </Row>
        );

    }
}

editManPowerForm.propTypes = {
    FetchJobs: PropTypes.func.isRequired,
    manPower: PropTypes.object,
    costHistory: PropTypes.object.isRequired,
    Regions: PropTypes.array.isRequired,
    Jobs: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    AddCostManPower: PropTypes.func.isRequired
};

const editManPower = Form.create()(editManPowerForm);

export default editManPower;