import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      Tournament System ©2023 Created by Your Name
    </AntFooter>
  );
};

export default Footer;