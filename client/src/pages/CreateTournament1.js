import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, message, Modal, DatePicker } from 'antd';
import axios from 'axios';

const CreateTournament1 = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTournament, setEditingTournament] = useState("")

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get('/api/v1/tournament/get-all/tournaments');
      setTournaments(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching tournaments');
      setLoading(false);
    }
  };

  const createTournament = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/v1/tournament/create', values);

      if (response.data.success) {
        message.success('Tournament created successfully');
        setShowModal(false);
        fetchTournaments();
      } else {
        message.error(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error('Error creating tournament');
      setLoading(false);
    }
  };

  const updateTournament = async (id, values) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/v1/tournament/edit/${id}`, values);

      if (response.data.success) {
        message.success('Tournament updated successfully');
        fetchTournaments();
      } else {
        message.error(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error('Error updating tournament');
      setLoading(false);
    }
  };

  const deleteTournament = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/v1/tournament/delete/${id}`);

      if (response.data.success) {
        message.success('Tournament deleted successfully');
        fetchTournaments();
      } else {
        message.error(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error('Error deleting tournament');
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const onFinishCreate = (values) => {
    createTournament(values);
  };

  const onFinishUpdate = (id, values) => {
    updateTournament(id, values);
  };
  
  const handleEdit = (id) => {
    const tournament = tournaments.find((tournament) => tournament.id === id);
    setEditingTournament(tournament);
    setShowModal(true);
  };

  const onFinishDelete = (id) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this tournament?',
      onOk: () => deleteTournament(id),
    });
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEdit(record.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            onClick={() => onFinishDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Tournament CRUD</h2>

      <Button type="primary" onClick={handleCreate} style={{ marginBottom: 16 }}>
        Create Tournament
      </Button>

      <Table
        columns={columns}
        dataSource={tournaments}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title="Create Tournament"
        visible={showModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinishCreate}>
          <Form.Item
            label="Name"
            name="name"
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
                message: 'Please select the start date',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              {
                required: true,
                message: 'Please select the end date',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateTournament1;