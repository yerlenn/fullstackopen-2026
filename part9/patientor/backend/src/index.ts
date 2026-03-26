import express = require('express');
import cors = require('cors');
import diagnosisRouter = require('./routes/diagnosis');
import patientsRouter = require('./routes/patients');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong')
});

app.use('/api/diagnosis', diagnosisRouter);

app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});