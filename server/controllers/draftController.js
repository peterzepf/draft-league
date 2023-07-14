const { Pokemon, Coach, League } = require('../models/draftModels');

const draftController = {};

const createErr = errInfo => {
  const { method, type, err } = errInfo;
  return {
    log: `draftController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in draftController.${method}. Check server logs for more details.`,
    },
  };
};

// create league
draftController.createLeague = async (req, res, next) => {
  // to-do req body parse
  const {
    league_name,
    max_points,
    num_picks,
    turn_duration,
    coaches,
    pokemon,
  } = req.body;
  try {
    console.log('Issuing request to db creating league: ', league_name);
    const newLeague = await League.create({
      league_name,
      max_points: max_points ?? 90,
      num_picks: num_picks ?? 8,
      turn_duration: turn_duration ?? 86400, // seconds
      coaches: coaches ?? [],
      pokemon: pokemon ?? [],
    });
    res.locals.league = newLeague;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'createLeague',
        type: 'unable to create new league',
        err,
      }),
    );
  }
};

// create pokemon
draftController.findOrCreatePokemon = async (req, res, next) => {
  const { pkmn_name, point_cost, types } = req.body;
  try {
    let pokemon = await Pokemon.findOne({ pkmn_name });
    if (!pokemon)
      pokemon = await Pokemon.create({ pkmn_name, point_cost, types });
    res.locals.pokemon = pokemon;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'findOrCreatePokemon',
        type: 'pkmn could not be found or made',
        err,
      }),
    );
  }
};

// create coach
//   - sign up page
draftController.createCoach = async (req, res, next) => {
  const { username, password, email, team_name, pick_position } = req.body;

  try {
    const newCoach = await Coach.create({
      username,
      password,
      email,
      team_name,
      pick_position,
      roster: [],
    });

    res.locals.coach = newCoach;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'createCoach',
        type: 'unable to create new coach',
        err,
      }),
    );
  }
};

draftController.addCoachToLeague = async (req, res, next) => {
  let { league_name, username } = req.body;
  try {
    res.locals.coach ??= await Coach.findOne({ username });
    res.locals.league ??= await League.findOne({ league_name });
    res.locals.coach.pick_position = res.locals.league.coaches.length;
    res.locals.league.coaches.push(res.locals.coach);
    await res.locals.coach.save();
    await res.locals.league.save();
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'addCoachToLeague',
        type: 'unable to create add coach to league',
        err,
      }),
    );
  }
};

// get single coach sign in
//   - represents logged in
//   - authentication stretch feature

// get two coaches next to pick
//   - where does server know whose turn it is?
//   - stored in League?
//   - current_turn, turn_order
draftController.getNextPicks = async (req, res, next) => {
  const { league_name } = req.params;

  try {
    const league = await League.findOne({ league_name });
    res.locals.currentTurn = league.current_turn ?? 0;
    // now determine turn order from league
    const coaches = league.coaches;
    const turnOrder = [];
    coaches.forEach(coach => {
      turnOrder.push(coach);
    });

    // turn order snakes from first pick to last pick,
    // then last pick picks twice before snaking back
    for (let i = 0; i < turnOrder.length; i++) {
      turnOrder[i] = await Coach.findById(turnOrder[i]);
    }
    turnOrder.sort((a, b) => a.pick_position - b.pick_position);
    for (let i = 0; i < turnOrder.length; i++) {
      turnOrder[i] = turnOrder[i].username;
    }
    turnOrderReverse = JSON.parse(JSON.stringify(turnOrder)).reverse();
    res.locals.turnOrder = turnOrder.concat(turnOrderReverse);

    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getNextPicks',
        type: 'unable to get turn order or current turn from league specified in params',
        err,
      }),
    );
  }
};

// get coaches
//   - all coaches (populate cards on frontend)
//   - Frontend can also deal with the logged in user stuff rn lol
draftController.getAllCoaches = async (req, res, next) => {
  const { league_name } = req.params;
  try {
    const league = await League.findOne({ league_name });
    const coaches = [];
    for (let i = 0; i < league.coaches.length; i++) {
      const coach = await Coach.findById(league.coaches[i]);
      const { username, team_name, pick_position, roster } = coach;
      coaches.push({ username, team_name, pick_position, roster });
    }
    res.locals.coaches = coaches;
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'getAllCoaches',
        type: 'unable to get coach data',
        err,
      }),
    );
  }
};

// update coach roster
//   - see if needed pokemon info is in req body or pokemon db
//   - - if it isn't, pull needed info from pokemon api and add (create) to db
//   - push pokemon to coach roster (array of Pokemon)
draftController.updateCoachRoster = async (req, res, next) => {
  const { username, pkmn_name } = req.body;
  try {
    const coach = await Coach.findOne({ username });
    res.locals.coach = coach;
    res.locals.pokemon ??= await Pokemon.findOne({ pkmn_name });
    coach.roster.push(res.locals.pokemon);
    await coach.save();
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'updateCoachRoster',
        type: 'unable to update coach in db',
        err,
      }),
    );
  }
};

draftController.setCurrentTurn = async (req, res, next) => {
  const { current_turn } = req.body;
  const { league_name } = req.params;
  try {
    const league = await League.findOne({ league_name });
    if (!league) throw new Error('no league with that name');
    league.current_turn = current_turn + 1;
    res.locals.current_turn = current_turn + 1;
    league.save();
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'setCurrentTurn',
        type: 'unable to change turn',
        err,
      }),
    );
  }
};

// update other coach information
//   - req body will have relevant info

// delete coach

// delete pokemon

module.exports = draftController;
