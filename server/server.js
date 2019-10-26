const express = require('express');
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const DB = require("./database.js");

/**
 * GET all items
 */
app.get("/api/items", (req, res)=>{
  res.json(DB.getItems())
});

/**
 * Get item with id
 */
app.get("/api/items/:itemId", (req, res)=>{
  res.send(DB.getItem(req.params.itemId));
});

app.post("/hello", (req, res)=>{
  res.send("post hello");
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

app.get('/items/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});


app.use(express.static('dist'));

// Heroku needs process.env.PORT
app.listen(PORT, () => {
  console.log("Server started", PORT);
  console.log(`http://localhost:${PORT}`);
});