import express from "express";
import bodyParser from "body-parser";

import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const user = ["admin"];
const password = ["123"];
const token = "duruuru76uee65e6sryhr5yh";
const authRoutes = [
  "/content",
  "/triumph,",
  "/enfield",
  "/kawasaki",
  "/superior",
  "/yamaha",
  "/mindoro",
  "/fuji",
  "/Fuji",
  "/faq"
];

app.use((req, res, next) => {
  // for authentication
  //cookieparser
  if (authRoutes.includes(req.url)) {
    if (!req.cookies.token || req.cookies.token !== token) {
      return res.render("login.ejs");
    }

    next();

    return;
  }

  next();
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/content", (req, res) => {
  res.render("content.ejs");
});

app.post("/check", (req, res) => {
  if (
    user.includes(req.body["user"]) &&
    password.includes(req.body["password"])
  ) {
    console.log("success approve");
    res.cookie("token", token);
    res.render("content.ejs");
  } else {
    console.log("wrong");

    res.render("login.ejs", {
      message: "Wrong credentials, please try again",
    });

    console.log(user);
    console.log(password);
  }
});

app.post("/register", (req, res) => {
  console.log(req.body["user"]);
  console.log(req.body["password"]);

  user.push(req.body["user"]);
  password.push(req.body["password"]);

  console.log(user);
  console.log(password);

  res.render("register.ejs", {
    message: "Registration success, Please LOG IN",
  });

  console.log("success");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.get("/triumph", (req, res) => {
  res.render("contentTriumph.ejs");
});

app.get("/enfield", (req, res) => {
  res.render("contentEnfield.ejs");
});

app.get("/kawasaki", (req, res) => {
  res.render("contentKawasaki.ejs");
});

app.get("/yamaha", (req, res) => {
  res.render("contentYamaha.ejs");
});

app.get("/superior", (req, res) => {
  res.render("contentSuperior.ejs");
});

app.get("/mindoro", (req, res) => {
  res.render("contentMindoro.ejs");
});

app.get("/fuji", (req, res) => {
  res.render("contentFuji.ejs");
});

app.get("/faq", (req, res) => {
  res.render("contentFaq.ejs");
});
app.get("/about", (req, res) => {
  res.render("contentAbout.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// need npm: express, bodyparser, cookieparser
