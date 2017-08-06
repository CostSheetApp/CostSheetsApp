import React, { Component, PropTypes } from 'react';
import { Form, Icon, Input, Button, Row, Col,Alert } from 'antd';
import {ForgotPassword} from '../actions/accountActions';
import { connect } from 'react-redux';
import '../styles/forgot-password.css';
const FormItem = Form.Item;

class ForgotPasswordForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            //console.log('Received values of form: ', values);
            let {forgotPassword} = this.props;
            forgotPassword(values);
        }
        });
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
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}/>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <Form onSubmit={this.handleSubmit} className="forgot-password-form">
            <FormItem>
            {getFieldDecorator('email', {
                rules: [
                    { required: true, message: '¡Por favor ingresa tu Email!' }, 
                    { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: '¡Ingresa un email valido!' }
                    ],
            })(
                <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
            )}
            </FormItem>
            {errorMessage}
            <FormItem>
            <Button type="primary" htmlType="submit" className="forgot-password-form-button">
                Recuperar mi contraseña
            </Button>
            O <a href="/login">Iniciar Sesión</a>
            </FormItem>
        </Form>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ pan: 6, offset: 2 }}/>
        </Row>
        );
    }
}

ForgotPasswordForm.propTypes = {
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    forgotPassword: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        hasError: state.account.hasError,
        error: state.account.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (email) => {
            dispatch(ForgotPassword(email));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ForgotPasswordForm));
