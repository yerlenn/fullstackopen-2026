import express from "express";
const app = express();
app.use(express.json());
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  res.send({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).send({ error: 'parameters missing'} );
  }

  if (isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  if (daily_exercises.some(x => isNaN(Number(x)))) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }

  const targetNumber = Number(target);
  const dailyExercises = daily_exercises.map(x => Number(x));

  const result = calculateExercises(dailyExercises, targetNumber);

  return res.send(result);
});

const PORT = 3003; 

app.listen(PORT, () => {
  console.log(`Server runnnig on port ${PORT}`);
});