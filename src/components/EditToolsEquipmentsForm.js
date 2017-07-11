import React, {Component, PropTypes } from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
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
          title: 'Región',
          dataIndex: 'region.name',
          key: 'region.name'
        }, {
          title: 'Fecha',
          key: 'createdAt',
          render: (text, record) => (
            <span>
                <Moment format="DD/MM/YYYY">{record.createdAt}</Moment>
            </span>
          ),
        }, {
          title: 'Costo',
          dataIndex: 'cost',
          render: (text, record) => (
            <NumberFormat
                value={record.cost} 
                displayType={'text'}
                thousandSeparator={true} 
                prefix={'L.'} 
                decimalPrecision={2}
            />
          ),
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
                    title={"Editar Herramienta y Equipo"}
                    onCancel={onCancel}
                    onOk={onCreate}
                    footer={[
                        <Button key = "back" size = "large" onClick = {onCancel} > Cancelar </Button>, 
                        <Button key="submit" type="primary" size="large" onClick={onCreate} > Aceptar </Button >
                        ]}>
                    <Form>
                        {getFieldDecorator('id', {
                            initialValue: toolsEquipment.id?toolsEquipment.id:0
                        })(
                            <Input type="hidden" />
                        )}
                        <FormItem label="Descripción">
                        {getFieldDecorator('description', {
                            rules: [
                                { required: true, message: '¡Por favor ingrese la descripción!' }, 
                                ],
                                initialValue: toolsEquipment.description?toolsEquipment.description:""
                        })(
                            <Input  placeholder="Descripción de la herramienta y equipo" />
                        )}
                        </FormItem>
                        <Row><Button type="primary" icon="plus" className="add-toolsEquipments-button" onClick={() => this.onCreateToolCost(toolsEquipment)}>Agregar nuevo costo</Button></Row>
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