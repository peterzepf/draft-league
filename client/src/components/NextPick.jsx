// Displays name of next coach in turn order
import React from 'react';

import styled from 'styled-components';
import { Container } from '../style/Styled.jsx';

const JimHead = styled.h3``;

const NextPick = ({ coachname }) => {
  return <JimHead>{coachname} is up next...</JimHead>;
};

export default NextPick;
