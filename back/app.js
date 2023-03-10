const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const app = express();
app.use(cors());

const port = 8000;
const jwtCheck = auth({
  audience: "https//www.ubeer.com",
  issuerBaseURL: "https://dev-s15hjodwpfsobczx.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});
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
  address: String,
});
const User = mongoose.model("users", userSchema);
const Beer = mongoose.model("beers", beerSchema);
const Brewery = mongoose.model("breweries", brewerySchema);
mongoose
  .connect("mongodb+srv://paulmessiant:epsi2023@cluster0.d7h8lhq.mongodb.net/ubeer", { useNewUrlParser: true, useUnifiedTopology: true })
  .then((r) => {
    console.log("connection réussie");
    app.use(jwtCheck);

    app.get("/authorized", function (req, res) {
      res.send("Secured Resource");
    });
    app.get("/callback", (req, res) => {
      res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
    });
    app.get("/users", (req, res) => {
      User.find({}, (err, documents) => {
        res.json(documents);
      });
    });
    app.get("/users/:userId", (req, res) => {
      console.log(req.body);
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
    app.get("/beers/", (req, res) => {
      Beer.find({}, (err, documents) => {
        res.json(documents);
      });
    });
    app.get("/beers/:beerId", (req, res) => {
      let id = req.params.beerId;
      Beer.findById(id).then((beer) => res.json(beer));
    });
    app.post("/beers/create/:brand/:volume", (req, res) => {
      let beer = new Beer({
        _id: mongoose.Types.ObjectId(),
        brand: req.params.brand,
        volume: req.params.volume,
      });
      beer.save((err, beer) => {
        console.log(beer);
      });

      res.json();
    });
    app.delete("/beers/delete/:id", (req, res) => {
      Beer.findByIdAndDelete(req.params.id, (err, beer) => {
        console.log(err);
      });
    });
    app.patch("/beers/change/:id/:brand/:volume", (req, res) => {
      Beer.findByIdAndUpdate(req.params.id, { brand: req.params.brand, volume: req.params.volume }, (err, beer) => {});
      res.status(204).send();
    });

    app.get("/breweries/:breweryId", (req, res) => {
      let id = req.params.breweryId;
      Brewery.findById(id).then((brewery) => res.json(brewery));
    });
    app.post("/breweries/create/:name/:address", (req, res) => {
      let brewery = new Brewery({
        _id: mongoose.Types.ObjectId(),
        name: req.params.name,
        address: req.params.address,
      });
      brewery.save((err, brewery) => {
        console.log(brewery);
      });

      res.json();
    });
    app.delete("/breweries/delete/:id", (req, res) => {
      Brewery.findByIdAndDelete(req.params.id, (err, brewery) => {
        console.log(err);
      });
    });
    app.patch("/breweries/change/:id/:name/:address", (req, res) => {
      Brewery.findByIdAndUpdate(req.params.id, { name: req.params.name, address: req.params.address }, (err, brewery) => {});
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
