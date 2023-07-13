const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://ptrgzpf:simplepassword@cluster0.tcgqbzm.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'draft-league',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  pkmn_name: { type: String, required: true, unique: true },
  point_cost: { type: Number, required: true },
  types: { type: String },
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemon');

const coachSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  email: String,
  team_name: String,
  pick_position: { type: Number },
  roster: [
    {
      pkmn_name: String,
      point_cost: Number,
      types: String,
      id: { type: Schema.Types.ObjectId, ref: 'Pokemon' },
    },
  ],
});

const Coach = mongoose.model('Coach', coachSchema);

const leagueSchema = new Schema({
  league_name: { type: String, required: true, unique: true },
  max_points: { type: Number, required: true },
  num_picks: { type: Number, required: true },
  turn_duration: Number,
  pokemon: [{ type: Schema.Types.ObjectId, ref: 'Pokemon' }],
  coaches: [{ type: Schema.Types.ObjectId, ref: 'Coach' }],
  current_turn: Number,
});

const League = mongoose.model('League', leagueSchema);

module.exports = {
  Pokemon,
  Coach,
  League,
};
