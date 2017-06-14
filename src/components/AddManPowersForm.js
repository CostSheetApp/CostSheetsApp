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
const FormItem = Form.Item;
const Option = Select.Option;

class addManPowerForm extends Component {
    constructor(props){
      super(props);
      this.columns = [{
          title: 'Description',
          dataIndex: 'manPower.description',
          key: 'manPower.description'
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
    componentWillMount() {
        let {FetchJobs} = this.props;
        FetchJobs();
    }
    render() {
        let {
            visible,
            onCancel,
            onCreate,
            manPower,
            costHistory,
            Jobs
            //isSaving,
            //title
        } = this.props;
        let {getFieldDecorator} = this.props.form;

        return (
            <Modal
                visible={visible}
                title={"Add Man Power"}
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
                    <Row><Button type="primary" icon="plus" className="add-manPowers-button">Add New Price</Button></Row>
                    <FormItem>
                        <Table rowKey={item => item.id} size="small" bordered={true} loading={costHistory.loading} dataSource={costHistory.list} columns={this.columns} pagination={{pageSize:5}}/>
                    </FormItem>
                </Form>
            </Modal>
        );

    }
}

addManPowerForm.propTypes = {
    FetchJobs: PropTypes.func.isRequired,
    manPower: PropTypes.object,
    costHistory: PropTypes.object.isRequired,
    Jobs: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
    //form: this
};

const addManPower = Form.create()(addManPowerForm);

export default addManPower;