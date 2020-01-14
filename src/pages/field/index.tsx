import { connect } from 'dva';
import React, { FC } from 'react';
import { InputItem, Button, Checkbox, List, DatePicker, Picker, Switch } from 'antd-mobile';
import { AntdModelState, ConnectProps } from '@/models/connect';
import Form, { Field } from 'rc-field-form';

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
        <Field
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <InputItem>Username</InputItem>
        </Field>

        <Field
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <InputItem>Password</InputItem>
        </Field>

        <Field
          name="datepicker"
          rules={[{ required: true, message: 'Please input your datepicker!' }]}
        >
          <DatePicker>
            <List.Item arrow="horizontal">DatePicker</List.Item>
          </DatePicker>
        </Field>
        <Field name="picker" rules={[{ required: true, message: 'Please input your picker!' }]}>
          <Picker data={seasons} title="选择季节" cascade={false} extra="请选择(可选)">
            <List.Item arrow="horizontal">Picker</List.Item>
          </Picker>
        </Field>
        <List.Item
          extra={
            <Field
              name="switch"
              valuePropName="checked"
              rules={[{ required: true, message: 'Please input your switch!' }]}
            >
              <Switch />
            </Field>
          }
        >
          Switch
        </List.Item>
        <Field name="remember" valuePropName="checked">
          <AgreeItem>Remember me</AgreeItem>
        </Field>

        <Field {...tailLayout}>
          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Field>
      </List>
    </Form>
  );
};

export default connect(({ antd }) => ({ antd }))(AntdPage);
