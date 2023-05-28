import React, { useEffect, useState } from 'react';
import { Form, Select, Button, message } from 'antd';
import axios from 'axios';

const RegisterTournament = () => {
  const [loading, setLoading] = useState();
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

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/tournaments/register', values);

      if (response.data.success) {
        message.success('Successfully registered for the tournament');
        // Reset form fields or redirect to another page
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Error registering for the tournament');
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h2>Register for Tournament</h2>
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterTournament;