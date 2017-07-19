import React, { Component, PropTypes } from 'react';
import { Form, Icon, Input, Button, Row, Col,Alert } from 'antd';
import {Register} from '../actions/entityActions';
import { connect } from 'react-redux';
import '../styles/register-form.css';
const FormItem = Form.Item;


class RegisterUserForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            //console.log('Received values of form: ', values);
            let {registerUser} = this.props;
            registerUser(values);
        }
        });
    }
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Las dos contraseñas no son iguales!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        let {hasError,error} = this.props;

        let errorMessage = null;

        if(hasError){
            errorMessage =  <Alert message={error} type="error" />;
        }

        return (
            <Row type="flex" justify="space-around" align="middle">
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}/>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 0 }}>
            <center><h2>Registrar Usuario</h2></center>
            <Form onSubmit={this.handleSubmit} className="register-form">
                <FormItem label="Nombre">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '¡Por favor ingrese su nombre!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Nombre" />
                    )}
                </FormItem>
                <FormItem label ="Nombre Usuario">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '¡Por favor ingrese el nombre de usuario!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Nombre Usuario" />
                    )}
                </FormItem>
                <FormItem label="Email">
                    {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: '¡Este no es un E-mail valido!',}, 
                                { required: true, message: '¡Por favor ingrese su E-mail!' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="email" />
                    )}
                </FormItem>
                <FormItem label="Contraseña">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '¡Por favor ingrese la Contraseña!' },
                        { validator: this.checkConfirm,}],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Contraseña" />
                    )}
                </FormItem>
                
                <FormItem label="Confirmar Contraseña">
                    {getFieldDecorator('confirm', {
                        rules: [{required: true, message: '¡Por favor confirme la contraseña!',}, 
                        { validator: this.checkPassword,}],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" onBlur={this.handleConfirmBlur}  placeholder="Contraseña" />
                    )}
                </FormItem>

                {errorMessage}
                <Button type="primary" htmlType="submit" className="register-form-button">
                    Registrar
                </Button>
                <a href="/login">Cancelar</a>
            </Form>
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ pan: 6, offset: 2 }}/>
            </Row>
        );
    }
}

RegisterUserForm.propTypes = {
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    registerUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        hasError: state.account.hasError,
        error: state.account.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (name,username,email,password) => {
            dispatch(Register(name,username,email,password));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RegisterUserForm));
