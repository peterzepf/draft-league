// Holds pick dialog for logged in current pick coach
// Input box, current input box point cost and types, sprite, confirm button to send POST
import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';

import {
  pickDisplayReducer,
  pickDisplayStateInit,
} from '../reducers/Reducers.jsx';

import { Container, Input, Button } from '../style/Styled.jsx';

const InputContainer = styled(Container)`
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
      <InputContainer>
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
      </InputContainer>
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
