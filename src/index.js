const express = require('express');

const app = express();
const port = 8000;

app.get('/', function (req, res) {
  res.send('Server CLI alive');
});

app.listen(port, function () {
  console.log('Server CLI alive...')
  console.log('Server running on: http://localhost:' + port);
});
