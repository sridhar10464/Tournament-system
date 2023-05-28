import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Header = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Title level={2}>Tournament System</Title>
    </div>
  );
};

export default Header;