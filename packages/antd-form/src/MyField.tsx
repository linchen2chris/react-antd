import { Input } from 'antd';
import React from 'react';

const MyField = (props: any) => {
  console.log('Line 4', props);
  return <Input onChange={props.onChange}/>;
};

export default MyField;
