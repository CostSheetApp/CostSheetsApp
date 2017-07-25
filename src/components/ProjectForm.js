import React, {Component, PropTypes } from 'react';
import moment from 'moment';

import {
    Form,
    Button,
    Modal,
    Input,
    InputNumber,
    DatePicker
} from 'antd';
const FormItem = Form.Item;

class addProjectForm extends Component {
    constructor(props){
      super(props);
    }  
    render() {
        let {visible, onCancel, onCreate, project,title } = this.props;
        let {getFieldDecorator} = this.props.form;
        
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={onCreate}
                footer={[
                    <Button key = "back" size = "large" onClick = {onCancel} > Cancelar </Button>, 
                    <Button key="submit" type="primary" size="large" onClick={onCreate}> Aceptar </Button >
                    ]}>
                <Form>
                    {getFieldDecorator('id', {
                        initialValue: project.id?project.id:0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem label = "Nombre">
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese el nombre!' }, 
                            ],
                            initialValue: project.name?project.name:""
                    })(
                        <Input  placeholder="Nombre" />
                    )}
                    </FormItem>
                    <FormItem label="Presupuesto">
                    {getFieldDecorator('budget', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese el presupuesto!' }, 
                            ],
                            initialValue: project.budget?project.budget:0
                    })(
                        <InputNumber
                            min={0}
                            max={2147483645.99}
                            style={{ width: '40%' }}
                            formatter={value => `L. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                            parser={value => value.toString().replace(/\L.\s?|(,*)/g, '')}
                        />
                    )}
                    </FormItem>
                    <FormItem label="Porcentaje Ganancia">
                    {getFieldDecorator('profitPercentage', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese porcentaje Ganancia!' }, 
                            ],
                            initialValue: project.profitPercentage?project.profitPercentage:0
                    })(
                        <InputNumber 
                            min={0}
                            max={100}
                            style={{ width: '20%' }}
                            formatter={value => `${value}%`}
                            parser={value => value.toString().replace('%', '')}
                            placeholder="Porcentaje Ganancia"
                        />
                    )}
                    </FormItem>
                    <FormItem label="Fecha Inicio">
                    {getFieldDecorator('startDate', {
                        rules: [
                            { required: true, message: '¡Por favor ingrese Fecha Inicio!' },  ],
                            initialValue: project.startDate?moment(project.startDate): moment()
                    })(
                        <DatePicker placeholder="Fecha Inicio" />
                    )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}


addProjectForm.propTypes = {
    project: PropTypes.object,
    isSaving: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    onCancel: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
};

const addProject = Form.create()(addProjectForm);

export default addProject;