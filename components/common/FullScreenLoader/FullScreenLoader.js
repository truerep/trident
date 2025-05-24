import React from 'react';
import styled from 'styled-components';

import colors from '@/constants/colors';

const FullScreenLoader = () => (
  <Wrapper>
    <Loader />
  </Wrapper>
);

const Wrapper = styled.div`
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.DarkGunmetal};
`;

const Loader = styled.div`
  border: 3px solid #fff; 
  border-top-color: transparent;
  border-radius: 100%;
  width: 80px;
  height: 80px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default FullScreenLoader;
