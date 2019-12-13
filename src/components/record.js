import React from 'react';
import {
    Form,
    Row,
    Col,
    Table
} from 'antd';
import axios from "axios";

class StudentRecord extends React.Component {
    state = {
        students: []
    };

    componentDidMount() {
        axios.get('/api/student').then(res => {
            this.setState({ students: res.data.data })
        }
        ).catch(error => console.log(error))
    }

    render() {
        const columns = [
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
            },
            {
                title: 'Branch',
                dataIndex: 'branch.name',
                key: 'branch',
            },
            {
                title: 'Company',
                dataIndex: 'company.name',
                key: 'company',
            },
        ];
        const dataSource = this.state.students.length ? this.state.students : [];
        return (
            <div type="flex" justify="center" align="center">
                <Row>
                    <Col span={18} offset={3}>
                        <Table rowKey={record => record._id} dataSource={dataSource} columns={columns} />
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedStudentRecordForm = Form.create({ name: 'student' })(StudentRecord);

export default WrappedStudentRecordForm;