import React from 'react';
import styled, {
  keyframes
} from 'styled-components';

const Spinner = ({size = '30px', color = 'white'}) => <StyledSpinner size={size} color={color} />;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  width: ${({size}) => size};
  height: ${({size}) => size};
  border: 2px solid ${({color}) => color};
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

export default Spinner;
