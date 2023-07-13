const express = require('express');

const draftController = require('../controllers/draftController');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json('party time');
});

// get request to sign in
//   - find coach in db, send it back to client

// get request for coach cards
//   - find all coaches in db, send them back to client
router.get(
  '/:league_name/coaches',
  draftController.getAllCoaches,
  (req, res) => {
    res.status(200).json(res.locals.coaches);
  },
);

// get request for next coach to pick
//   - logic handled in draftController
router.get(
  '/:league_name/turn-order',
  draftController.getNextPicks,
  (req, res) => {
    res.status(200).json([res.locals.currentTurn, res.locals.turnOrder]);
  },
);

// POST new league
router.post('/new/league/', draftController.createLeague, (req, res) => {
  res.status(200).json(res.locals.league);
});

// POST add coach to league
router.post(
  '/new/coach/',
  draftController.createCoach,
  draftController.addCoachToLeague,
  (req, res) => {
    res.status(200).json(res.locals.league);
  },
);

router.post(
  '/new/pokemon/',
  draftController.findOrCreatePokemon,
  (req, res) => {
    res.status(200).json(res.locals.pokemon);
  },
);

// UPDATE coach roster
//   - use middleware to put pokemon in the coach roster list,
//     change the current turn in the league (simple increment)
router.patch(
  '/add-to-roster/',
  draftController.findOrCreatePokemon,
  draftController.updateCoachRoster,
  (req, res) => {
    res.status(200).json(res.locals.coach);
  },
);

router.patch(
  '/:league_name/next-turn',
  draftController.setCurrentTurn,
  (req, res) => {
    res.status(200).json(res.locals.current_turn);
  },
);

module.exports = router;
