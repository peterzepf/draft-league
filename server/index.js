const path = require('path');
const express = require('express');

const PORT = 3000;

const apiRouter = require('./routes/api');

const app = express();

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * handle requests for static files
 */
app.use(express.static(path.resolve(__dirname, '../client')));

/**
 * define route handlers
 */
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) =>
  res.status(404).send("Lol oops. Don't have that endpoint"),
);

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, _next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

console.log(`listening on port ${PORT}`);
app.listen(PORT);
