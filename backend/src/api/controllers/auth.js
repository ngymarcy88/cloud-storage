'use strict';

import axios from 'axios';
import admin from '../helpers/firebase.js'
import { UserModel } from '../models/userModel.js';

export const register = async (req,res) => {
  const { username, email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // todo hibakezelés
    const newUser = new UserModel({
      username,
      email,
      firebaseUid: userRecord.uid,
    });

    await newUser.save();

    res.status(201).json({
      message: 'Felhasználó sikeresen regisztrálva!',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

export const login = async(req,res) => {
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
    console.log(error);
    res.status(400);
  }
};
