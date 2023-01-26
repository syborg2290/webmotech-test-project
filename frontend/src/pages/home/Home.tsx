import { Button, Space, Spin, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import DateInput from '../../components/DateInput';
import { getAllPatientHistoryQuery } from '../../graphql/queries/patientHistoryGraphql';
import { apiCaller } from '../../utils/axios-request-caller';
import { DataType } from '../../utils/dataType,interface';
import { CSVLink } from 'react-csv';

import './home.scss';
import { LogoutOutlined } from '@ant-design/icons';

function Home() {
  const [filterLoading, setFilterLoading] = useState(false);
  const [data, setData] = useState([]);
  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');

  useEffect(() => {
    getAllPatientsHistory();
    // eslint-disable-next-line
  }, [firstDate, secondDate]);

  const getAllPatientsHistory = async () => {
    const graphqlQuery = {
      operationName: 'getPatientHistory',
      query: getAllPatientHistoryQuery,
      variables: {
        firstDate: firstDate === null ? '' : firstDate,
        secondDate: secondDate === null ? '' : secondDate,
      },
    };
    const res: any = await apiCaller(graphqlQuery, '');
    if (res.data.data.getPatientHistory.length > 0) {
      setData(res.data.data.getPatientHistory);
    }
  };

  const filterFunc = async () => {
    setFilterLoading(true);
    if (firstDate && secondDate !== '') {
      const graphqlQuery = {
        operationName: 'getPatientHistory',
        query: getAllPatientHistoryQuery,
        variables: {
          firstDate: firstDate === null ? '' : firstDate,
          secondDate: secondDate === null ? '' : secondDate,
        },
      };
      const res: any = await apiCaller(graphqlQuery, '');
      if (res.data.data.getPatientHistory.length > 0) {
        setData(res.data.data.getPatientHistory);
      }

      setFilterLoading(false);
    } else {
      setFilterLoading(false);
      alert('Please select a date range!');
    }
  };

  const onDateClear = () => {
    setFirstDate('');
    setSecondDate('');
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Patient ID',
      dataIndex: 'patient_id',
      key: 'patientId',
      width: 100,
    },
    {
      title: 'First Appointment ID',
      dataIndex: 'first_appointment_iD',
      key: 'first_appointment_iD',
      width: 100,
    },
    {
      title: 'Invoice',
      dataIndex: 'invoice',
      key: 'invoice',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          {<div>{record.invoice.split(',').slice(0, 4).toString()}</div>}
        </Space>
      ),
    },
    {
      title: 'Total Receipts Value',
      dataIndex: 'total_receipts_value',
      key: 'total_receipts_value',
      width: 100,
      render: (_, record) => (
        <Space size="middle">{record.total_receipts}</Space>
      ),
    },
    {
      title: 'Receipts No',
      dataIndex: 'receipts_no',
      key: 'receipts_no',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          {<div>{record.receipts.split(',').slice(0, 4).toString()}</div>}
        </Space>
      ),
    },
    {
      title: 'First appointment date',
      dataIndex: 'first_appointment_date',
      key: 'first_appointment_date',
      width: 200,
      render: (_, record) => (
        <Space size="middle">{record.first_appointment_date}</Space>
      ),
    },
    {
      title: 'First Receipt Date',
      dataIndex: 'first_receipt_date',
      key: 'first_receipt_date',
      width: 200,
      render: (_, record) => (
        <Space size="middle">{record.first_receipt_date}</Space>
      ),
    },
    {
      title: 'First Invoice Date',
      dataIndex: 'first_invoice_date',
      key: 'first_invoice_date',
      width: 200,
      render: (_, record) => (
        <Space size="middle">{record.first_invoice_date}</Space>
      ),
    },
    {
      title: 'Patient Created Date',
      dataIndex: 'patient_created_date',
      key: 'patient_created_date',
      width: 200,
      render: (_, record) => (
        <Space size="middle">{record.patient_created_date}</Space>
      ),
    },
  ];

  return (
    <Space size={10} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal"></Space>

      <div className="dates_range">
        <div>
          <DateInput
            placeholder="First Date"
            onChangeFunc={setFirstDate}
            onFilterLoading={filterLoading}
          />
        </div>
        <div>
          <DateInput
            placeholder="Second Date"
            onChangeFunc={setSecondDate}
            onFilterLoading={filterLoading}
          />
        </div>
        <div>
          <Button type="primary" onClick={filterFunc} disabled={filterLoading}>
            {filterLoading ? <Spin /> : 'Filter'}
          </Button>
        </div>
        <div>
          <Button type="primary" onClick={onDateClear} disabled={filterLoading}>
            {'Clear'}
          </Button>
        </div>
      </div>

      <div className="export_container">
        <CSVLink
          data={data}
          onClick={() => {
            console.log('clicked');
          }}
          className="export_csv"
        >
          Export to CSV
        </CSVLink>
        <div>
          <Button type="default" onClick={logout}>
            <LogoutOutlined />
            logout
          </Button>
        </div>
      </div>
      <Space>
        <Table
          scroll={{ y: 1000 }}
          className="table_history"
          columns={columns}
          dataSource={data}
        />
      </Space>
    </Space>
  );
}

export default Home;
