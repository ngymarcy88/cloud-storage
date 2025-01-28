'use strict';

import admin from 'firebase-admin';
//import serviceAccount from '../../../serviceAccountKey.json'
import fs from 'fs';

const data = fs.readFileSync('./serviceAccountKey.json', 'utf-8');
const jsonData = JSON.parse(data);

admin.initializeApp({
  credential: admin.credential.cert(jsonData),
});

export default admin;
