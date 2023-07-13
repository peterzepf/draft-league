// Contains all coach cards. Displays arrows between cards indicating direction of pick order
import React from 'react';
import Coach from '../components/Coach.jsx';
import styled from 'styled-components';
import { Container, Button, Input } from '../style/Styled.jsx';

const Coacherino = styled(Container)`
  display: flex;
  justify-content: flex-start;
  border-top: 2px solid black;
`;

const NewCoach = styled(Container)`
  gap: 0px;
`;

const CoachInput = styled(Input)`
  align-self: flex-start;
`;

const InputContainer = styled(Container)`
  flex-direction: column;
  gap: 0px;
  margin: 0px;
`;

const CoachDisplay = styled(Container)`
  justify-content: flex-start;
`;

// Needs state/logic for:
//   - All coaches kept as state information
//   - All coaches have rosters, points, picks remaining
//   - ?Is this where we check if a Coach has been clicked?
//   - I think it is.
const CoachesContainer = ({
  coaches,
  newCoachHandler,
  newCoachName,
  newCoachPassword,
  inputHandler,
  user,
  userTurn,
  upNext,
}) => {
  const dispCoaches = [];
  for (let i = 0; i < coaches.length; i++) {
    dispCoaches.push(
      <Coach
        username={coaches[i].username}
        roster={coaches[i].roster}
        user={user}
        myturn={userTurn === coaches[i].username}
        upNext={upNext === coaches[i].username}
        key={coaches[i].username}
      />,
    );
  }

  return (
    <>
      <Coacherino>
        <h3>Coaches</h3>
        <NewCoach>
          <Button
            onClick={() => {
              newCoachHandler();
            }}
          >
            Add Coach
          </Button>
          <InputContainer>
            <CoachInput
              placeholder='Username'
              onInput={e => {
                inputHandler(e.target.value);
              }}
              value={newCoachName}
            ></CoachInput>
            <CoachInput
              placeholder='Password'
              value={newCoachPassword}
            ></CoachInput>
          </InputContainer>
        </NewCoach>
      </Coacherino>
      <CoachDisplay>{dispCoaches}</CoachDisplay>
    </>
  );
};

export default CoachesContainer;
