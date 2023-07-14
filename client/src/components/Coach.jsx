// Tile card for coach to be displayed
// Coach name, points remaining, picks remaining, current lineup sprites
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from '../style/Styled.jsx';

const backgroundFadeAnimation = keyframes`
  from {background-color: grey;}
  to {background-color: IndianRed;}
`;

const CoachBox = styled(Container)`
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  margin: 5px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  flex: 0 0 15%;
  height: 10em;
  min-width: 10em;
  box-sizing: border-box;
  border: ${props => (props.$loggedin ? '3px solid orange' : '')};
  background-color: ${({ myturn }) =>
    myturn ? 'IndianRed' : 'LightSlateGrey'};
  box-shadow: 5px 5px 6px ${({ upNext }) => (upNext ? 'brown' : 'grey')};
  border-radius: 10px;
  transition: all 0.25s ease;
`;

const RosterList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-size: 0.75em;
  list-style-type: none;
`;

// Click for more info on picks
//   - causes element to take up more space
//   - or spawns in a new element?
const Coach = ({ username, roster, user, myturn, upNext }) => {
  const dispRoster = [];
  for (let i = 0; i < roster.length; i++) {
    dispRoster.push(<li>{roster[i].pkmn_name}</li>);
  }
  return (
    <CoachBox
      $loggedin={username === user.username}
      myturn={myturn}
      upNext={upNext}
    >
      <h3 style={{ 'margin-bottom': '0px' }}>{username.toUpperCase()}</h3>
      <p style={{ 'margin-top': '0px' }}>
        Roster:
        <RosterList>{dispRoster}</RosterList>
      </p>
    </CoachBox>
  );
};

export default Coach;
