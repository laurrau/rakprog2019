const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const DB = require("./database.js");
const mongoose = require("mongoose");
//const userRouter = require("./src/user.js");
const Item = require("./item.model.js");
const bodyParser= require("body-parser")
const itemRouter = require("./item.router.js");
const userRouter = require("./user.router.js");
const authRouter = require("./auth.router.js");
//require('dotenv').config();

/** Development environment. In Heroku we don't use .env file */
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

// ${DB_USERNAME}:${DB_PASSWORD} ... ${DB_NAME}
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0-nymcl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; 
//console.log("DB", DB_URL);

mongoose.connect(DB_URL)
  .then(() => {
    console.log("Database access success!");
    listen();
    migrate();
    //deleteAllItems();
  })
  .catch( err => {
    console.log("error happened", err);
  });

  app.use(bodyParser.json());
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1", itemRouter);
  app.use("/api/v1/users", userRouter);

app.post("/hello",(req, res) => {
  res.send("hello");
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.get("/items/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.use(express.static("dist"));



function listen() {
  //heroku
  app.listen(PORT, () => {
    console.log("Server started", PORT);
    console.log(`http://localhost:${PORT}`);
  });
}

function migrate(){
      Item.count({},(err, countNr) => {
          if(err) throw err;
          if(countNr > 0 ){
            console.log("Already had items, don't save");
            return;
          }
          saveAllItems();
      });
  }

  function deleteAllItems(){
      Item.deleteMany({}, (err, doc) => {
        console.log('err', err, "doc", doc);
      });
  }

  function saveAllItems(){
    console.log("migrate started!");
    const items = DB.getItems();
    items.forEach(item=> {
        const document = new Item(item);
        document.save( (err) => {
          if(err){
              console.log(err);
              throw new Error ("Something happened during save");
          }
          console.log('save succcess');
        });
    });
    console.log("items", items);
  }