import React from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    Row,
    Col,
    message
} from 'antd';
import axios from "axios";

const { Option } = Select;
class StudentPlacement extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false,
        companies: [],
        branches: []
    };

    handleSubmit = (e, type) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((error, values) => {
            if (!error) {
                axios.post('/api/student', values).then(res => {
                    message.success('Student Added');
                }).catch(error => {
                    if (error.response && error.response.data && error.response.data.message)
                        message.error(error.response.data.message);
                    else
                        message.error('Something went wrong');
                });
            };
        })
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    componentDidMount() {
        axios.get('api/branch').then(res => { this.setState({ branches: res.data.data }) }).catch(error => console.log(error))
        axios.get('/api/company').then(res => {
            this.setState({ companies: res.data.data })
        }
        ).catch(error => console.log(error))
    }

    render() {
        const companiesList = this.state.companies.length && this.state.companies.map(company => <Option key={company._id} value={company._id}>{company.name}</Option>);
        const branchesList = this.state.branches.length && this.state.branches.map(branch => <Option key={branch._id} value={branch._id}>{branch.name}</Option>);
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        return (
            <div type="flex" justify="center" align="center">
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={14} offset={5}>
                            <Form.Item
                                label={
                                    <span>
                                        FirstName
                                    </span>
                                }
                            >
                                {getFieldDecorator('firstName', {
                                    rules: [{ required: true, message: 'Please input your firstname!', whitespace: false }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item
                                label={
                                    <span>
                                        LastName
                                    </span>
                                }
                            >
                                {getFieldDecorator('lastName', {
                                    rules: [{ required: true, message: 'Please input your lastname!', whitespace: false }],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="Gender" hasFeedback>
                                {getFieldDecorator('gender', {
                                    rules: [{ required: true, message: 'Please select your gender!' }],
                                })(<Select style={{ width: '100%' }} placeholder='Please select your gender'>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="E-mail">
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="Branch" hasFeedback>
                                {getFieldDecorator('branch', {
                                    rules: [{ required: true, message: 'Please select branch!' }],
                                })(<Select style={{ width: '100%' }} placeholder='select branch'>
                                    {branchesList}
                                </Select>
                                )}
                            </Form.Item>
                            <Form.Item label="Company" hasFeedback>
                                {getFieldDecorator('company', {
                                    rules: [{ required: true, message: 'Please select company!' }],
                                })(<Select style={{ width: '100%' }} placeholder='select company'>
                                    {companiesList}
                                </Select>
                                )}
                            </Form.Item>
                            <Row>
                                <Col span={4} offset={11}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" >Add</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const WrappedStudentPlacementForm = Form.create({ name: 'student' })(StudentPlacement);

export default WrappedStudentPlacementForm;