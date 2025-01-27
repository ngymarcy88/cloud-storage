const admin = require('../helpers/firebase');
const express = require('express');
const axios = require('axios')
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({
      message: 'Felhasználó sikeresen regisztrálva!',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
      },
    });
  } catch (error) {
    res.status(400).json({ message: 'Hiba a regisztráció során', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);

    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    const { localId, email, idToken, refreshToken, expiresIn } = response.data;

    res.status(200).json({
      message: 'Sikeres bejelentkezés!',
      user: {
        uid: localId,
        email: email,
      },
      idToken,
      refreshToken,
      expiresIn,
    });
  } catch (error) {
    res.status(400).json({ message: 'Hiba a bejelentkezés során', error: error.message });
  }
});

module.exports = router;
