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


class BranchData extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false,
        visible: false,
        branches: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post('/api/branch', values).then(res => {
                    message.success('Branch Added');
                    this.state.branches.push(res.data.data);
                    this.setState({ visible: false, branches: this.state.branches })
                }).catch(error => {
                    if (error.response && error.response.data && error.response.data.message)
                        message.error(error.response.data.message);
                    else
                        message.error('Something went wrong');
                })
            }
        })
    }

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    componentDidMount() {
        axios.get('/api/branch').then(res => {
            this.setState({ branches: res.data.data })
        }
        ).catch(error => {

        })
    }

    showForm = e => {
        e.preventDefault();
        this.setState({ visible: true })
    }

    render() {
        const columns = [
            {
                title: 'Branch Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Branch Code',
                dataIndex: 'code',
                key: 'code',
            }
        ];
        const dataSource = this.state.branches.length ? this.state.branches : [];
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
                        <Button type="primary" htmlType="submit" onClick={this.showForm} style={{ marginBottom: 20 }}>Add Branch</Button>
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
                                            Branch Name
                                    </span>
                                    }
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input branch name!', whitespace: false }],
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="Code">
                                    {getFieldDecorator('code', {
                                        rules: [{ required: true, message: 'Please input branch code' }],
                                    })(
                                        <Input />,
                                    )}
                                </Form.Item>
                                <Row>
                                    <Col span={4} offset={11}>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" >Add Branch</Button>
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

const WrappedBranchDataForm = Form.create({ name: 'student' })(BranchData);

export default WrappedBranchDataForm;