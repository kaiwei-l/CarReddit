var express = require("express");
var router = express.Router();
var Car = require("../models/car");
var middleware = require("../middleware/index.js");

// Index - Show all cars
router.get("/", function(req, res) {
	// get all cars from DB
	Car.find({}, function(err, allCars) {
		if(err) {
			console.log(err);
		} else {
			res.render("cars/index", {cars: allCars});
		}
	});
});

// Create - Add new cars to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
	// get data from form and add to car array
	// redirect back to cars page
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCar = {name: name, image: image, description: desc, author: author};
	// Cretate a new campground and save to DB
	Car.create(newCar, function(err, newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			// redirect back to car page
			res.redirect("/cars");
		}
	});
});

// New - Show forms to create new car
router.get("/new", middleware.isLoggedIn, function(req, res) {
	res.render("cars/new.ejs");
});

// Show - Shows more info about one car 
router.get("/:id", function(req, res) {
	// find the car with provided id
	Car.findById(req.params.id).populate("comments").exec(function(err, foundCar) {
		if(err) {
			console.log(err);
		} else {
			console.log(foundCar);
			// render show template with that car
			res.render("cars/show", {car: foundCar});
		}
	});
});

// edit car route
router.get("/:id/edit", middleware.checkCarOwnership, function(req, res) {
	Car.findById(req.params.id, function(err, foundCar) {
		res.render("cars/edit", {car: foundCar});
	});
});

// update car route
router.put("/:id", middleware.checkCarOwnership, function(req, res) {
	// find and update the correct car
	Car.findByIdAndUpdate(req.params.id, req.body.car, function(err, updatedCar) {
		if(err) {
			res.redirect("/cars");
		} else {
			// redirect somewhere
			res.redirect("/cars/" + req.params.id);
		}
	});
});

// destory car route
router.delete("/:id", middleware.checkCarOwnership, function(req, res) {
	Car.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/cars");
		} else {
			res.redirect("/cars");
		}
	});
});

module.exports = router;