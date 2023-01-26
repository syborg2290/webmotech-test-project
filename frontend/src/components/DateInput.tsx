import { DatePicker, Space } from 'antd';
import React from 'react';

const DateInput = ({ placeholder, onChangeFunc, onFilterLoading }: any) => {
  return (
    <Space direction="vertical">
      <DatePicker
        placeholder={placeholder}
        disabled={onFilterLoading}
        onChange={onChangeFunc}
      />
    </Space>
  );
};

export default DateInput;
