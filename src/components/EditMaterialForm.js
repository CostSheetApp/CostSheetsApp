import React, {Component, PropTypes } from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
//import Mayre from 'mayre';
import {
    Form,
    Button,
    Modal,
    Input,
    InputNumber,
    //Icon,
    Table,
    Col,
    Select,
    Row
} from 'antd';
import '../styles/materials.css';
import AddCostMaterialForm from './AddCostMaterialForm';
const FormItem = Form.Item;
const Option = Select.Option;


class editMaterialForm extends Component {
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
        AddCostMaterialFormIsVisible:false
    };
    componentWillMount() {
        let {FetchUnitsOfMeasurement} = this.props;
        FetchUnitsOfMeasurement();
    }
    onCreateMaterialCost(material) {
        this.material = material;
        this.setState({AddCostMaterialFormIsVisible: true});
    }
    CancelCreateCost = () => {
        this.setState({AddCostMaterialFormIsVisible: false});
    }
    CreateCost = () => {
        const form = this.addCostForm;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let {AddCostMaterial} = this.props;
            AddCostMaterial(values);
            form.resetFields();
            this.setState({AddCostMaterialFormIsVisible: false});
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
            material,
            costHistory,
            isSaving,
            UnitsOfMeasurement,
            Regions
        } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Row>
                <AddCostMaterialForm
                    ref={this.saveAddCostFormRef}
                    visible={this.state.AddCostMaterialFormIsVisible}
                    onCancel={this.CancelCreateCost}
                    onCreate={this.CreateCost}
                    material={this.material}
                    costHistory={costHistory}
                    isSaving={isSaving}
                    Regions={Regions}
                    materialId={this.material?this.material.id:0}
                    />
                
                <Modal
                    visible={visible}
                    title={"Editar Material"}
                    onCancel={onCancel}
                    onOk={onCreate}
                    footer={[
                        <Button key = "back" size = "large" onClick = {onCancel} > Cancelar </Button>, 
                        <Button key="submit" type="primary" size="large" onClick={onCreate} loading={isSaving}> Aceptar </Button >
                        ]}>
                    <Form>
                        {getFieldDecorator('id', {
                            initialValue: material.id?material.id:0
                        })(
                            <Input type="hidden" />
                        )}
    
                        <FormItem label="Descripción" style={{marginBottom:"10px"}}>
                        {getFieldDecorator('description', {
                            rules: [
                                { required: true, message: '¡Por favor ingrese la descripción!' }, 
                                ],
                                initialValue: material.description?material.description:""
                        })(
                            <Input  placeholder="Descripción del material" />
                        )}
                        </FormItem>
                        <FormItem >
                            <Col span="12">
                            <FormItem label="Desperdicio">
                                {getFieldDecorator('waste', {
                                    rules: [
                                        { required: true, message: '¡Por favor ingrese el desperdicio del material!' }, 
                                        ],
                                        initialValue: material.waste?material.waste:0
                                })(
                                    <InputNumber
                                        min={0}
                                        max={2147483645.99}
                                        style={{ width: '100%' }}
                                        formatter={value => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                                        parser={value => value.toString().replace(/\L.\s?|(,*)/g, '')}
                                    />
                                )}
                                </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="Unidad de Medida">
                                {getFieldDecorator('unitsOfMeasurementId', {
                                    rules: [
                                        { required: true, message: '¡Por favor seleccione una unidad de medida!' }, 
                                        ],
                                        initialValue: material.unitsOfMeasurementId?material.unitsOfMeasurementId.toString():null
                                })(
                                    <Select
                                        showSearch
                                        placeholder="Seleccione una unidad de medida"
                                        optionFilterProp="children"
                                        //onChange={handleChange}
                                        filterOption={(input, option) => {
                                            //console.log(input,option);
                                            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                        }}
                                    >
                                        {UnitsOfMeasurement.map(o => <Option key={o.id} >{`${o.description} (${o.abbreviation})`}</Option>)}
                                    </Select>
                                )}
                                </FormItem>
                            </Col>
                        </FormItem>
                        
                        <Row><Button type="primary" icon="plus" className="add-material-button" onClick={() => this.onCreateMaterialCost(material)}>Agregar nuevo costo</Button></Row>
                        
                        <FormItem>
                            <Table rowKey={item => item.id} size="small" bordered={true} loading={costHistory.loading} dataSource={costHistory.list} columns={this.columns} pagination={{pageSize:5}}/>
                        </FormItem>
                        
                        
                    </Form>
                </Modal>

            </Row>
        );
    }
}

editMaterialForm.propTypes = {
    FetchUnitsOfMeasurement: PropTypes.func.isRequired,
    material: PropTypes.object,
    costHistory: PropTypes.object.isRequired,
    UnitsOfMeasurement: PropTypes.array.isRequired,
    isSaving: PropTypes.bool.isRequired,
    visible: PropTypes.bool.isRequired,
    Regions: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    AddCostMaterial: PropTypes.func.isRequired
};

const editMaterial = Form.create()(editMaterialForm);

export default editMaterial;