'use strict';

import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

router.get('/', register);
router.post('/', login);

export default router;
