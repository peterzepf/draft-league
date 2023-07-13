// Displays name of current coach in turn order
// If current coach is signed in, shows pick dialog

import React from 'react';

import styled from 'styled-components';
import { Container } from '../style/Styled.jsx';

const JimHead = styled.h2``;

const CurrentPick = ({ coachname }) => {
  return <JimHead>{coachname} is picking</JimHead>;
};

export default CurrentPick;
