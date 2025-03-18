const express = require('express');
const dotenv = require('dotenv')
const app = express();
dotenv.configDotenv()

app.get('/', (req, res) => {
  res.json({
    "succes": true,
    "path": "/"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

