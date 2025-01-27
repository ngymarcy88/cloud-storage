const express = require('express')

const authRoutes = require('./api/routes/auth');
const fileRoutes = require('./api/routes/file');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/file', fileRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
