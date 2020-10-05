var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/car.js");
var seedDB = require("./seeds.js");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");
Comment = require("./models/comment");
User = require("./models/user");

//seedDB();

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/car_reddit", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// requiring routes
var commentRoutes = require("./routes/comments");
var carRoutes = require("./routes/cars");
var indexRoutes = require("./routes/index");

// passport configuration
app.use(require("express-session")({
	secret: "once again",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/cars/:id/comments", commentRoutes);
app.use("/cars", carRoutes);

app.listen(3000, function() {
	console.log("The CarReddit server has started.");
});