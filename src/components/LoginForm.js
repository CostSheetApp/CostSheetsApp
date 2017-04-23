import React, { Component, PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import '../styles/login.css';
const FormItem = Form.Item;

class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            let {login} = this.props;
            login(values.username,values.password);
        }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (           
            <Row type="flex" justify="space-around" align="middle">
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
            {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
            </FormItem>
            <FormItem>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
            </FormItem>
            <FormItem>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(
                <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            Or <a href="">register now!</a>
            </FormItem>
        </Form>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ pan: 6, offset: 2 }}></Col>
        </Row>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
};

export default Form.create()(LoginForm);