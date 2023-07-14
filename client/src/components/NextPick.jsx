// Displays name of next coach in turn order
import React from 'react';

import styled from 'styled-components';
import { Container, JimHead2 } from '../style/Styled.jsx';

const NextPick = ({ coachname }) => {
  return (
    <JimHead2>
      <span style={{ color: '#FF3300' }}>{coachname}</span> is up next...
    </JimHead2>
  );
};

export default NextPick;
