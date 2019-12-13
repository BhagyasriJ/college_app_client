import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Company from '../src/components/company';
import Branch from '../src/components/branch';
import Student from '../src/components/student';
import Record from './components/record';
import './App.css';


const { Header, Content, Sider } = Layout;
class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              paddingTop: 60
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
              <Menu.Item key="dashboard">
                <span className="nav-text">Placements
                </span>
                <Link to='/'></Link>
              </Menu.Item>
              <Menu.Item key="company">
                <span className="nav-text">Company</span>
                <Link to='/company'></Link>
              </Menu.Item>
              <Menu.Item key="branch">
                <span className="nav-text">Branch</span>
                <Link to='/branch' />
              </Menu.Item>
              <Menu.Item key="student">
                <span className="nav-text">Student</span>
                <Link to='/student' />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}><h1>Visvesvaraya Technological University</h1></Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <Route exact path='/' component={Record} />
              <Route exact path='/company' component={Company} />
              <Route exact path='/branch' component={Branch} />
              <Route exact path='/student' component={Student} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
