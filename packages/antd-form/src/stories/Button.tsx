import './button.css';

import { Button, Form, Input } from 'antd';
import React from 'react';

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */

const MyInput = ({ form }) => {
  console.log('Line 34', form, form.getFieldValue('name'));
  return (
    <>
      <Form.Item name={['name', 'firstName']} label="FirstName">
        <Input
          label="name"
          onChange={(e) => {
            const name = e.target.value;
            const age = form.getFieldValue('age');
            console.log('Line 42', name, age);
            console.log('Line 44', form.getFieldValue(['name', 'lastName']));
            if (age === '1') {
              console.log('Line 44', true);
              form.setFieldsValue({ name: { firstName: `${name}-${age}` } });
            } else {
              form.setFieldsValue({ name: { firstName: name } });
            }
          }}
        />
      </Form.Item>
      <Form.Item name={['name', 'lastName']} label="LastName">
        <Input label="lastName" />
      </Form.Item>
    </>
  );
};

const Test = () => <Input />;
export const Button1: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const [form] = Form.useForm();
  console.log('Line 70', form.getForm);
  return (
    <Form
      form={form}
      onValuesChange={(c, a) => {
        console.log('Line 46', c, a);
      }}
      onFinish={(values) => {
        console.log('finish', values);
      }}
    >
      <MyInput form={form} />
      <Form.Item name="status" dependencies={['age']}></Form.Item>
      <Form.Item
        name="age"
        onChange={(e) =>
          form.setFieldsValue({
            age: e.target.value,
            status: 'child',
          })
        }
      >
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        submit
      </Button>
    </Form>
  );
};
