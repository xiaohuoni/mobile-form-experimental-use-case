import { connect } from 'dva';
import React, { FC } from 'react';
import { Form } from 'antd';
import { InputItem, Button, Checkbox, List, DatePicker, Picker, Switch } from 'antd-mobile';
import { AntdModelState, ConnectProps } from '@/models/connect';

import styles from './index.less';

const AgreeItem = Checkbox.AgreeItem;

interface PageProps extends ConnectProps {
  antd: AntdModelState;
}

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    },
    {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    },
    {
      label: '夏',
      value: '夏',
    },
  ],
];

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

const AntdPage: FC<PageProps> = ({ antd }) => {
  const { name } = antd;
  const [form] = Form.useForm();
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <List>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputItem>Username</InputItem>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <InputItem>Password</InputItem>
        </Form.Item>

        <Form.Item
          name="datepicker"
          rules={[{ required: true, message: 'Please input your datepicker!' }]}
        >
          <DatePicker>
            <List.Item arrow="horizontal">DatePicker</List.Item>
          </DatePicker>
        </Form.Item>
        <Form.Item name="picker" rules={[{ required: true, message: 'Please input your picker!' }]}>
          <Picker data={seasons} title="选择季节" cascade={false} extra="请选择(可选)">
            <List.Item arrow="horizontal">Picker</List.Item>
          </Picker>
        </Form.Item>
        <List.Item
          extra={
            <Form.Item
              name="switch"
              valuePropName="checked"
              rules={[{ required: true, message: 'Please input your switch!' }]}
            >
              <Switch />
            </Form.Item>
          }
        >
          Switch
        </List.Item>
        <Form.Item name="remember" valuePropName="checked">
          <AgreeItem>Remember me</AgreeItem>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Form.Item>
      </List>
    </Form>
  );
};

export default connect(({ antd }) => ({ antd }))(AntdPage);
