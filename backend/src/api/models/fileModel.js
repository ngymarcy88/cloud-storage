'use strict';

import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    filename: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      default: null,
    },
    backblazeFileId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  });

export const UserModel = mongoose.model('File', fileSchema);
