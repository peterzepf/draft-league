// Displays Draft League heading and current phase of the game (pick, round robin, playoff)
import React from 'react';
import styled from 'styled-components';
import { Button, Container } from '../style/Styled.jsx';

const Heading = styled.h1`
  flex-grow: 1;
  font-family: Garamond, serif;
  font-size: 3em;
  background-color: Orange;
  border-radius: 20px;
  padding: 5px;
`;

const NextButton = styled(Button)`
  align-self: center;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 2px solid black;
  gap: 20px;
`;

const SigninContainer = styled(Container)`
  flex-grow: 1;
  justify-content: center;
  align-self: center;
  wrap: no-wrap;
  gap: 0px;
  background-color: LightSlateGrey;
  border-radius: 50px;
  box-shadow: 3px 3px 5px grey;
`;

const Select = styled.select`
  align-self: center;
  border-radius: 2px;
`;

const Header = ({ league, nextClick, coaches, user, coachSelectHandler }) => {
  const coachDropdown = [];
  for (let i = 0; i < coaches.length; i++) {
    coachDropdown.push(
      <option
        value={coaches[i].username}
        key={`dropdownitem${i}`}
        disabled={coaches[i].username === user.username}
      >
        {coaches[i].username}
      </option>,
    );
  }
  return (
    <HeadingContainer>
      <Heading>Draft League</Heading>
      <SigninContainer>
        {/* <NextButton onClick={() => nextClick()}>Next Turn</NextButton> */}
        <h3
          style={{
            'background-color': 'Brown',
            color: 'mintcream',
            'border-radius': '10px',
            padding: '20px',
            'padding-left': '0.5em',
            'padding-right': '0.5em',
            'align-self': 'stretch',
          }}
        >
          Coach Sign-in:{' '}
        </h3>
        <Select
          name='coach'
          id='signin'
          onChange={e => {
            coachSelectHandler(e.target.value);
          }}
        >
          <option value='select a coach' disabled={user.username !== undefined}>
            select a coach
          </option>
          {coachDropdown}
        </Select>
      </SigninContainer>
      <Heading style={{ 'text-align': 'right' }}>{league}</Heading>
    </HeadingContainer>
  );
};

export default Header;
