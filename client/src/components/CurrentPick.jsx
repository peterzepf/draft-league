// Displays name of current coach in turn order
// If current coach is signed in, shows pick dialog

import React from 'react';

import styled from 'styled-components';
import { Container, JimHead } from '../style/Styled.jsx';

const CurrentPick = ({ coachname }) => {
  return (
    <JimHead>
      <span style={{ color: '#FF3300' }}>{coachname}</span> is picking
    </JimHead>
  );
};

export default CurrentPick;
