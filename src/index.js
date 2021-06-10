const express = require('express');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { fileRoute } = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({ limit: '50mb' }));
app.use('/file', fileRoute);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
