'use strict';

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
});

export const UserModel = mongoose.model('User', userSchema);
