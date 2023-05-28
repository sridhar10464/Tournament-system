import React, { useEffect, useState } from 'react';
import { Form, Select, DatePicker, Button, message } from 'antd';
import axios from 'axios';

const ScheduleTournament = () => {
  const [loading, setLoading] = useState(false);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/tournament/get-all/tournaments');
      setTournaments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const scheduleTournament = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/tournament/schedule', values);

      if (response.data.success) {
        message.success('Tournament scheduled successfully');
        // Reset form fields or redirect to another page
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Error scheduling the tournament');
    }

    setLoading(false);
  };

  const onFinish = (values) => {
    scheduleTournament(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h2>Schedule Tournament</h2>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Tournament"
          name="tournamentId"
          rules={[
            {
              required: true,
              message: 'Please select a tournament',
            },
          ]}
        >
          <Select placeholder="Select a tournament">
            {Array.isArray(tournaments) && tournaments.map((tournament) => (
              <Select.Option key={tournament.id} value={tournament.id}>
                {tournament.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            {
              required: true,
              message: 'Please select a start date',
            },
          ]}
        >
          <DatePicker placeholder="Select start date" />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            {
              required: true,
              message: 'Please select an end date',
            },
          ]}
        >
          <DatePicker placeholder="Select end date" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Schedule
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ScheduleTournament;