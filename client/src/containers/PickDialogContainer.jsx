// Holds pick dialog for logged in current pick coach
// Input box, current input box point cost and types, sprite, confirm button to send POST
import React, { useEffect, useReducer } from 'react';
import styled, { keyframes } from 'styled-components';

import {
  pickDisplayReducer,
  pickDisplayStateInit,
} from '../reducers/Reducers.jsx';

import { Container, Input, Button } from '../style/Styled.jsx';

const loadInAnimation = keyframes`
  from {height: 0px;}
  30% {height: 70px;}
  60% {height: 100px;}
  90% {height: 180px;}
  to {height: fit-content;}
`;

const InputContainer = styled(Container)`
  align-self: center;
  overflow: hidden;
  flex-direction: column;
  flex-wrap: nowrap;
  height: fit-content;
  width: fit-content;
  animation-name: ${loadInAnimation};
  animation-duration: 0.15s;
  animation-timing-function: ease;
  animation-iteration-count: 1;
  background-color: orange;
  box-shadow: 3px 3px 6px grey;
`;

const InputContainer2 = styled(Container)`
  flex-direction: column;
`;

const PickDialogContainer = ({ pokemon, dispatch }) => {
  const [pickState, pickDispatch] = useReducer(
    pickDisplayReducer,
    pickDisplayStateInit,
  );

  useEffect(() => {
    for (let i = 0; i < pokemon.length; i++) {
      if (pokemon[i].pkmn_name === pickState.pokemonBox) {
        pickDispatch({ type: 'POINT_LOOKUP', payload: pokemon[i].point_cost });
        if (pokemon[i].types) pickDispatch({ type: 'TYPES_UPDATE' });
      }
    }
  }, [pickState.pokemonBox]);

  return (
    <InputContainer>
      <InputContainer2>
        <h5 style={{ margin: '0px', color: 'rgb(41, 41, 41)' }}>
          I choose you!
        </h5>
        <Input
          placeholder='Pokemon name'
          value={pickState.pokemonBox}
          onInput={e => {
            pickDispatch({
              type: 'POKEMON_NAME_INPUT',
              payload: e.target.value,
            });
          }}
        ></Input>
        <Input
          placeholder='Point cost'
          value={pickState.pointBox}
          style={{ width: '5em' }}
          onInput={e => {
            pickDispatch({ type: 'POINT_COST_INPUT', payload: e.target.value });
          }}
        ></Input>
      </InputContainer2>
      <Button
        onClick={() => {
          dispatch({
            type: 'ADD_TO_ROSTER_SUBMIT',
            payload: {
              pkmn_name: pickState.pokemonBox,
              point_cost: pickState.pointBox,
            },
          });
          pickDispatch({ type: 'SUBMIT' });
        }}
      >
        Confirm
      </Button>
    </InputContainer>
  );
};

export default PickDialogContainer;
