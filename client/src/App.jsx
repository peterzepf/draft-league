import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import Header from './components/Header.jsx';

import NextUpContainer from './containers/NextUpContainer.jsx';
import CoachesContainer from './containers/CoachesContainer.jsx';

import { pickPhaseReducer, pickPhaseStateInit } from './reducers/Reducers.jsx';

import { PageContainer } from './style/Styled.jsx';
import './style/styles.scss';

const App = () => {
  const [state, dispatch] = useReducer(pickPhaseReducer, pickPhaseStateInit);

  useEffect(() => {
    // handle INITIAL async stuff here
    // load coaches, load turn order
    const fetchData = async (endpoint, type) => {
      const result = await fetch(endpoint);
      const data = await result.json();
      if (!ignore) dispatch({ type, payload: data });
    };
    let ignore = false;
    fetchData(`/api/${state.league}/coaches`, 'LOAD_COACHES');
    fetchData(`/api/${state.league}/turn-order`, 'LOAD_TURNORDER');
    return () => {
      ignore = true;
    };
  }, []);

  // handle user initiated async
  useEffect(() => {
    switch (state.loading) {
      case 'NEXT_TURN_SUBMIT': {
        // patch current turn to server
        const patchFetch = async (endpoint, type) => {
          const result = await fetch(endpoint, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ current_turn: state.currentPick }),
          });
          const data = await result.json();
          if (!ignore) dispatch({ type, payload: data });
        };
        let ignore = false;
        patchFetch(`/api/${state.league}/next-turn`, 'NEXT_TURN_RECEIVE');
        return () => {
          ignore = true;
        };
        break;
      }

      case 'NEW_COACH_SUBMIT': {
        const postFetch = async (endpoint, type) => {
          const result = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
              username: state.newCoachName,
              league_name: state.league,
            }),
          });
          const league = await result.json();
          if (!ignore) {
            dispatch({ type });
            const newResult = await fetch(`/api/${state.league}/coaches`);
            const coaches = await newResult.json();
            dispatch({ type: 'LOAD_COACHES', payload: coaches });
            const response = await fetch(`/api/${state.league}/turn-order`);
            const turnOrder = await response.json();
            dispatch({ type: 'LOAD_TURNORDER', payload: turnOrder });
          }
        };
        let ignore = false;
        postFetch(`/api/new/coach`, 'NEW_COACH_RECEIVE');
        return () => {
          ignore = true;
        };
      }

      case 'ADD_TO_ROSTER_SUBMIT': {
        const addToRosterFetch = async (endpoint, type) => {
          const result = await fetch(endpoint, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({
              pkmn_name: state.pickChosen.pkmn_name,
              point_cost: state.pickChosen.point_cost,
              username: state.user.username,
            }),
          });
          const updatedCoach = await result.json();
          if (!ignore) {
            dispatch({ type, payload: updatedCoach });
          }
        };
        let ignore = false;
        addToRosterFetch(`/api/add-to-roster/`, 'ADD_TO_ROSTER_RECEIVE');
        return () => {
          ignore = true;
        };
      }

      default:
        break;
    }
  }, [state.loading]);

  const nextTurnClickHandler = () => {
    if (state.user !== null) dispatch({ type: 'NEXT_TURN_SUBMIT' });
  };

  const newCoachHandler = () => {
    dispatch({ type: 'NEW_COACH_SUBMIT' });
  };

  const inputHandler = value => {
    dispatch({ type: 'COACH_NAME_INPUT', payload: value });
  };

  const coachSelectHandler = coachname => {
    dispatch({ type: 'CHANGE_USER', payload: coachname });
  };

  return (
    <PageContainer>
      <Header
        league={state.league}
        nextClick={nextTurnClickHandler}
        coaches={state.coaches}
        user={state.user}
        coachSelectHandler={coachSelectHandler}
      />
      <NextUpContainer
        turnOrder={state.turnOrder}
        currentPick={state.currentPick}
        user={state.user}
        pokemon={state.pokemon}
        dispatch={dispatch}
      />
      <CoachesContainer
        coaches={state.coaches}
        inputHandler={inputHandler}
        newCoachHandler={newCoachHandler}
        newCoachName={state.newCoachName}
        newCoachPassword={state.newCoachPassword}
        user={state.user}
        userTurn={state.turnOrder[state.currentPick % state.turnOrder.length]}
        upNext={
          state.turnOrder[(state.currentPick + 1) % state.turnOrder.length]
        }
      />
    </PageContainer>
  );
};

export default App;
