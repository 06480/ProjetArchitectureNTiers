const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password: String,
});
const beerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  brand: String,
  volume: Number,
});
const brewerySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  adress: String,
});
const User = mongoose.model("users", userSchema);
const Beer = mongoose.model("beers", beerSchema);
const brewery = mongoose.model("breweries", brewerySchema);
mongoose
  .connect("mongodb+srv://paulmessiant:epsi2023@cluster0.d7h8lhq.mongodb.net/ubeer", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((r) => {
    console.log("connection réussie");
    app.get("/users", (req, res) => {
      User.find({}, (err, documents) => {
        res.json(documents);
      });
    });
    app.get("/users/:userId", (req, res) => {
      let id = req.params.userId;
      User.findById(id).then((user) => res.json(user));
    });
    app.post("/users/create/:name/:email/:password", (req, res) => {
      let user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.params.name,
        email: req.params.email,
        password: req.params.password,
      });
      user.save((err, user) => {
        console.log(user);
      });

      res.json();
    });
    app.delete("/users/delete/:id", (req, res) => {
      User.findByIdAndDelete(req.params.id, (err, user) => {
        console.log(err);
      });
    });
    app.patch("/users/change/:id/:name/:email/:password", (req, res) => {
      User.findByIdAndUpdate(req.params.id, { name: req.params.name, email: req.params.email, password: req.params.password }, (err, user) => {});
      res.status(204).send();
    });
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
    console.log("Connexion à MongoDB échouée !");
  });
