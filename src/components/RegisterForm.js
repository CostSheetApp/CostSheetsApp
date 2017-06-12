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
            <Form onSubmit={this.handleSubmit} className="register-form">
                <FormItem label="Name">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Name" />
                    )}
                </FormItem>
                <FormItem label ="Username">
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="email" style={{ fontSize: 13 }} />} placeholder="username" />
                    )}
                </FormItem>
                <FormItem label="Email">
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="email" />
                    )}
                </FormItem>
                <FormItem label="Password">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                {errorMessage}
                <Button type="primary" htmlType="submit" className="register-form-button">
                    Register
                </Button>
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
