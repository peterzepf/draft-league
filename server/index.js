const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  console.log('request received');
  res.status(200).json({
    test: 'success',
  });
});

console.log('listening on port 3000');
app.listen(3000);
