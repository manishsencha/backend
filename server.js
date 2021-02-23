const express = require("express");
const userData = require("./models/model");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/userAuth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = 3001;
app.get("/", (req, res) => {
  res.send("server is working");
});

app.post("/signup", async (req, res) => {
  var name = req.body.fullname;
  var email = req.body.email;
  var password = req.body.password;
  var user = req.body.username;
  console.log(name + " " + email + " " + password + " " + user);
  userData
    .create({
      fullname: name,
      username: user,
      email: email,
      password: password,
    })
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.log(error);
    });
});
app.get("/:user", async (req, res) => {
  const username = await userData.findOne({ username: req.params.user });
  console.log(username);
  if (username == null) {
    return res.sendStatus(404);
  }
  res.json(username);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});