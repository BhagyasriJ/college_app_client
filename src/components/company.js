import React from 'react';
import {
    Form,
    Input,
    Button,
    Row,
    Col,
    Modal,
    Table,
    message
} from 'antd';
import axios from "axios";


class CompanyData extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false,
        visible: false,
        companies: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
                axios.post('/api/company', values).then(res => {
                    message.success('Company Added');
                    this.state.companies.push(res.data.data);
                    this.setState({ visible: false, companies: this.state.companies })
                }).catch(error => {
                    if (error.response && error.response.data && error.response.data.message)
                        message.error(error.response.data.message);
                    else
                        message.error('Something went wrong');
                })
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    componentDidMount() {
        axios.get('/api/company').then(res => {
            this.setState({ companies: res.data.data })
        }
        ).catch(error => console.log(error))
    }

    showForm = e => {
        e.preventDefault();
        this.setState({ visible: true })
    }

    render() {
        const columns = [
            {
                title: 'Company Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
            }
        ];
        const dataSource = this.state.companies.length ? this.state.companies : [];
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
                <Row>
                    <Col span={4} offset={18}>
                        <Button type="primary" htmlType="submit" onClick={this.showForm} style={{ marginBottom: 20 }}>Add Company</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <Table rowKey={record => record._id} dataSource={dataSource} columns={columns} />
                    </Col>
                </Row>
                <Modal destroyOnClose={true}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={() => this.setState({ visible: false })}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Row>
                            <Col span={20} offset={2}>
                                <Form.Item
                                    label={
                                        <span>
                                            Company Name
                                    </span>
                                    }
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input your company name!', whitespace: false }],
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="Contact">
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

                                <Form.Item label="City">
                                    {getFieldDecorator('city', {
                                        rules: [{ required: true, message: 'Please input your city' }],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                                <Row>
                                    <Col span={4} offset={11}>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" >Add Company</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>

                </Modal>

            </div>
        );
    }
}

const WrappedCompanyDataForm = Form.create({ name: 'student' })(CompanyData);

export default WrappedCompanyDataForm;