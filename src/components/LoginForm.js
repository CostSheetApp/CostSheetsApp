import React, { Component, PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col,Alert } from 'antd';
import '../styles/login.css';
const FormItem = Form.Item;

class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            //console.log('Received values of form: ', values);
            let {login} = this.props;
            login(values);
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
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 1 }}/>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 0 }}>
            <center><h2>Iniciar Sesión</h2></center>
            <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: '¡Por favor ingrese el usuario' }],
            })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
            </FormItem>
            <FormItem>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: '¡Por favor ingrese la contraseña' }],
            })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
            </FormItem>
            {errorMessage}
            <FormItem>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(
                <Checkbox>Recordarme</Checkbox>
            )}
            <a className="login-form-forgot" href="/forgot-password">Olvide mi contraseña</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Iniciar Sesión
            </Button>
            O <a href="/register-user">Registrar</a>
            </FormItem>
        </Form>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ pan: 6, offset: 2 }}/>
        </Row>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    form: PropTypes.objectOf({
        getFieldDecorator: PropTypes.object.isRequired,
        validateFields: PropTypes.object.isRequired,
    }).isRequired,
};

export default Form.create()(LoginForm);