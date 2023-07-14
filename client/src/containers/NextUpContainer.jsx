// Container for current pick, next pick, time left, and pick dialog if current pick coach signed in
import React from 'react';

import CurrentPick from '../components/CurrentPick.jsx';
import NextPick from '../components/NextPick.jsx';
import TimeLeft from '../components/TimeLeft.jsx';
import PickDialogContainer from '../containers/PickDialogContainer.jsx';

import styled from 'styled-components';
import { Container } from '../style/Styled.jsx';

const TimerBox = styled(Container)`
  align-self: center;
  border: 1px solid rgb(114, 33, 33);
  padding: 0.5em;
`;

const Timer = () => {
  return <TimerBox>23:44</TimerBox>;
};

// Needs state/logic for:
//   - Time left box (pull turn-time-expire date from database?)
//   - Current player turn (accessible from database?)
//   - Next player turn (Need logic for snaking selection order)
//
//   - Pass stateful data of textbox contents to PickDisplay
const NextUpContainer = ({
  turnOrder,
  currentPick,
  user,
  pokemon,
  dispatch,
}) => {
  if (
    user.username !== undefined &&
    user.username === turnOrder[currentPick % turnOrder.length]
  ) {
    return (
      <>
        <Container style={{ 'padding-bottom': '0px' }}>
          <CurrentPick coachname={turnOrder[currentPick % turnOrder.length]} />
          {/* <Timer /> */}
        </Container>
        <PickDialogContainer
          pokemon={pokemon}
          dispatch={dispatch}
        ></PickDialogContainer>
        <Container style={{ 'padding-top': '0px' }}>
          <NextPick
            coachname={turnOrder[(currentPick + 1) % turnOrder.length]}
          />
        </Container>
      </>
    );
  } else
    return (
      <>
        <Container>
          <CurrentPick coachname={turnOrder[currentPick % turnOrder.length]} />
          {/* <Timer /> */}
        </Container>
        <Container>
          <NextPick
            coachname={turnOrder[(currentPick + 1) % turnOrder.length]}
          />
        </Container>
      </>
    );
};

export default NextUpContainer;
