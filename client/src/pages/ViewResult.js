import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const ViewMatchResult = ({ matchId, winner, loser, score }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        View Result
      </Button>
      <Modal
        title="Match Result"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>Winner: {winner}</p>
        <p>Loser: {loser}</p>
        <p>Score: {score}</p>
      </Modal>
    </div>
  );
};

const EnterMatchResult = ({ matchId, onResultEntered }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const response = await axios.post(`/api/matches/${matchId}/result`, values);

      if (response.data.success) {
        message.success('Match result entered successfully');
        form.resetFields();
        setVisible(false);
        onResultEntered(); // Callback to refresh match results
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error('Error entering match result');
    }

    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Enter Result
      </Button>
      <Modal
        title="Enter Match Result"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Winner"
            name="winner"
            rules={[
              {
                required: true,
                message: 'Please enter the winner',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Loser"
            name="loser"
            rules={[
              {
                required: true,
                message: 'Please enter the loser',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Score"
            name="score"
            rules={[
              {
                required: true,
                message: 'Please enter the score',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Enter
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export { ViewMatchResult, EnterMatchResult };