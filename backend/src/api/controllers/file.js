'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const response = {message: 'test/ file respone'};

  res.status(200).json(response);
});

module.exports = router;
