import express = require('express');
import diagnosisService from '../services/diagnosisService'

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getDiagnosis())
})

export = router;  