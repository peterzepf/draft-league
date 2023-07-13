import React, { useReducer } from 'react';

export const pickPhaseStateInit = {
  currentPick: 0,
  turnOrder: [],
  coaches: [],
  league: 'test-league-1',
  user: { username: undefined },
  loading: '', // array of strings detailing all unresolved server requests
  newCoachName: '',
  newCoachPassword: '',
  pokemon: [],
  pickChosen: {},
};

export const pickPhaseReducer = (state, action) => {
  // state holds current pick, turn order, some collection of coaches,
  // league name, signed in coach
  // actions:
  // change signed in coach, go to next turn
  switch (action.type) {
    case 'CHANGE_USER': {
      const newUsername = action.payload;
      const newUser = state.coaches.find(
        coach => coach.username === newUsername,
      );
      return {
        ...state,
        user: newUser ?? state.user,
      };
      break;
    }

    case 'NEXT_TURN_SUBMIT': {
      // allows for multiple kinds of requests to go out at once
      return {
        ...state,
        loading: action.type,
      };
      break;
    }

    case 'NEXT_TURN_RECEIVE': {
      if (action.payload === state.currentPick + 1)
        return {
          ...state,
          loading: '',
          currentPick: (state.currentPick + 1) % state.turnOrder.length,
        };
      else return { ...state, loading: '' };
    }

    case 'LOAD_COACHES': {
      const coaches = action.payload;
      // console.log(coaches);
      const loading = '';
      return {
        ...state,
        coaches,
        loading,
      };
      break;
    }

    case 'LOAD_TURNORDER': {
      const [currentPick, turnOrder] = action.payload;
      const loading = '';
      return {
        ...state,
        currentPick,
        turnOrder,
        loading,
      };
    }

    case 'COACH_NAME_INPUT': {
      return {
        ...state,
        newCoachName: action.payload,
      };
      break;
    }

    case 'COACH_PASSWORD_INPUT': {
      return {
        ...state,
        newCoachPassword: action.payload,
      };
      break;
    }

    case 'NEW_COACH_SUBMIT': {
      return {
        ...state,
        loading: action.type,
      };
      break;
    }

    case 'NEW_COACH_RECEIVE': {
      return {
        ...state,
        loading: '',
        newCoachName: '',
        newCoachPassword: '',
      };
    }

    case 'ADD_TO_ROSTER_SUBMIT': {
      return {
        ...state,
        loading: action.type,
        pickChosen: action.payload,
      };
    }

    case 'ADD_TO_ROSTER_RECEIVE': {
      const updatedCoach = action.payload;
      const coaches = JSON.parse(JSON.stringify(state.coaches));
      const oldCoach = coaches.find(
        coach => coach.username === updatedCoach.username,
      );
      oldCoach.roster = updatedCoach.roster;
      return {
        ...state,
        coaches,
        loading: 'NEXT_TURN_SUBMIT',
      };
    }

    default:
      return state;
      break;
  }
};

export const pickDisplayStateInit = {
  pokemonBox: '',
  pointBox: '',
  types: '',
};

// use a separate reducer for pick display? yes; only start it when rendered
export const pickDisplayReducer = (state, action) => {
  // state holds contents of pkmn name text box, contents of point value box
  // actions:
  // update text boxes, submit pick
  switch (action.type) {
    case 'POKEMON_NAME_INPUT': {
      return {
        ...state,
        pokemonBox: action.payload,
        types: '',
      };
      break;
    }

    case 'POINT_COST_INPUT': {
      return {
        ...state,
        pointBox: action.payload,
      };
    }

    case 'POINT_LOOKUP': {
      return {
        ...state,
        pointBox: action.payload,
      };
    }

    case 'SUBMIT': {
      return {
        ...state,
        pointBox: '',
        pokemonBox: '',
        types: '',
      };
    }

    default:
      return state;
      break;
  }
};
