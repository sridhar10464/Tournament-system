import React, { useEffect, useState } from 'react';
// import { useDispatch } from "react-redux";
import { Form, Input, Button, Table, message, Modal } from 'antd';
import axios from 'axios';


const ParticipantCRUD = () => {
  const [participants, setParticipants] = useState([]);
//   const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);

  const fetchParticipants = async () => {
    try {
        setLoading(true);
      const response = await axios.get('/api/v1/participant/get-all/');
      setParticipants(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('Error fetching participants');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchParticipants();
  }, []);

  const createParticipant = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/v1/participant/add-participant', values);

      if (response.data.success) {
        message.success('Participant created successfully');
        setShowModal(false);
        fetchParticipants();
      } else {
        message.error(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error('Error creating participant');
      setLoading(false);
    }
  };

  const updateParticipant = async (id, values) => {
    try {
      setLoading(true);
      const response = await axios.put(`/api/participants/${id}`, values);

      if (response.data.success) {
        message.success('Participant updated successfully');
        fetchParticipants();
      } else {
        message.error(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error('Error updating participant');
      setLoading(false);
    }
  };

  const deleteParticipant = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/participants/${id}`);

      if (response.data.success) {
        message.success('Participant deleted successfully');
        fetchParticipants();
      } else {
        message.error(response.data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error('Error deleting participant');
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const participant = participants.find((participant) => participant.id === id);
    setEditingParticipant(participant);
    setShowModal(true);
  };

  const handleCreate = () => {
    setShowModal(true);
    setEditingParticipant(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingParticipant(null);
  };

  const onFinishCreate = (values) => {
    createParticipant(values);
  };

  const onFinishUpdate = (values) => {
    if (editingParticipant) {
      updateParticipant(editingParticipant.id, values);
    }
  };

  const onFinishDelete = (id) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this participant?',
      onOk: () => deleteParticipant(id),
    });
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
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
          <Button type="danger" onClick={() => onFinishDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

    return (
     
    
    <div>
      <h2>Participant CRUD</h2>

      <Button type="primary" onClick={handleCreate} style={{ marginBottom: 16 }}>
        Create Participant
      </Button>

      <Table
        columns={columns}
        dataSource={participants}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingParticipant ? 'Edit Participant' : 'Create Participant'}
        visible={showModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={editingParticipant ? onFinishUpdate : onFinishCreate}
          initialValues={editingParticipant}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter the participant name',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter the participant email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: 'Please enter the participant age',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingParticipant ? 'Update' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    
    
  );
};

export default ParticipantCRUD;