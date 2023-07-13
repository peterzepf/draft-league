// Displays Draft League heading and current phase of the game (pick, round robin, playoff)
import React from 'react';
import styled from 'styled-components';
import { Button, Container } from '../style/Styled.jsx';

const Heading = styled.h1`
  font-family: Garamond, serif;
  font-size: 3em;
`;

const NextButton = styled(Button)`
  align-self: center;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  border-bottom: 2px solid black;
`;

const SigninContainer = styled(Container)`
  wrap: no-wrap;
  gap: 0px;
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
        <NextButton onClick={() => nextClick()}>Next Turn</NextButton>
        <SigninContainer>
          <h3>Coach Sign-in: </h3>
          <Select
            name='coach'
            id='signin'
            onChange={e => {
              coachSelectHandler(e.target.value);
            }}
          >
            <option
              value='select a coach'
              disabled={user.username !== undefined}
            >
              select a coach
            </option>
            {coachDropdown}
          </Select>
        </SigninContainer>
      </SigninContainer>
      <Heading>{league}</Heading>
    </HeadingContainer>
  );
};

export default Header;
