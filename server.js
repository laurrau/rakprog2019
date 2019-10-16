const express = require('express')
const app = express()
const path = require("path");
const PORT = 3000

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
})

app.use(express.static('dist'));

// Heroku needs process.env.PORT
app.listen(process.env.PORT || PORT, () => {
  console.log("Server started", PORT);
});