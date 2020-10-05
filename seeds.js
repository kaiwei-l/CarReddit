var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/car_reddit", { useNewUrlParser: true });
var Car = require("./models/car.js");
var Comment = require("./models/comment");


function seedDB() {
	// remove all campgrounds
	Car.deleteMany({}, function(err) {
	});
}

module.exports = seedDB;