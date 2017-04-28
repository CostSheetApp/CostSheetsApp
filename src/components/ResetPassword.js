import React, { Component, PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col,Alert } from 'antd';
import {ResetPassword} from '../actions/accountActions';
import { connect } from 'react-redux';
import '../styles/forgot-password.css';
const FormItem = Form.Item;

class ResetPasswordForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            let {resetPassword} = this.props;
            resetPassword(values);
        }
        });
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let {hasError,error} = this.props;
        const query = this.props.location.query;
        let errorMessage = null

        if(hasError){
            errorMessage =  <Alert message={error} type="error" />
        }

        return (
             <Row type="flex" justify="space-around" align="middle">
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        <Form onSubmit={this.handleSubmit} className="forgot-password-form">
            {getFieldDecorator('access_token', {
                rules: [
                    { required: true, message: 'Please input your access token!' }, 
                    ],
                initialValue: query.access_token
            })(
                <Input type="hidden" />
            )}
            <FormItem>
            {getFieldDecorator('password', {
                rules: [
                    { required: true, message: 'Please input your new password!' }, 
                    ],
            })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="New password" />
            )}
            </FormItem>
            <FormItem>
            {getFieldDecorator('confirmPassword', {
                rules: [
                    { required: true, message: 'Please confirm your new password!' }, 
                    ],
            })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm password" />
            )}
            </FormItem>
            {errorMessage}
            <FormItem>
            <Button type="primary" htmlType="submit" className="forgot-password-form-button">
                Save
            </Button>
            Or <a href="/login">Log in!</a>
            </FormItem>
        </Form>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ pan: 6, offset: 2 }}></Col>
        </Row>
        );
    }
}

ResetPasswordForm.propTypes = {
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    resetPassword: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    return {
        hasError: state.account.hasError,
        error: state.account.error,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        resetPassword: (access_token,password, confirmPassword) => {
            dispatch(ResetPassword(access_token,password, confirmPassword))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ResetPasswordForm))
