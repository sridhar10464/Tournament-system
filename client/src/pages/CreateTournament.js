import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import { Option } from 'antd/es/mentions';

const CreateTournament = () => {
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/participant/get-all/participants');
      setParticipants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/tournament/create', values);

      if (response.data.success) {
        message.success('Tournament created successfully');
        // Reset form fields or redirect to another page
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Error creating the tournament');
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h2>Create Tournament</h2>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Tournament Name"
          name="tournamentName"
          rules={[
            {
              required: true,
              message: 'Please enter the tournament name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            {
              required: true,
              message: 'Please enter the start date',
            },
          ]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            {
              required: true,
              message: 'Please enter the end date',
            },
          ]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          label="Participants"
          name="participants"
          rules={[
            {
              required: true,
              message: 'Please select participants',
              type: "array",
            },
          ]}
        >
          
          <Select mode="multiple" placeholder="Select participants">
            
            {Array.isArray(participants) && participants.map((participant) => (
              <Select.Option key={participant.participantId} value={participant.participantId}>
                {participant.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTournament;