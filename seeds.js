var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/car_reddit", { useNewUrlParser: true });
var Car = require("./models/car.js");
var Comment = require("./models/comment");

// var data = [
// 	{
// 		name: "Cloud's Rest",
// 		image: "https://images.pexels.com/photos/4631093/pexels-photo-4631093.jpeg?auto=compress&cs=tinysrgb&h=350",
// 		description: "blah blah blah"
// 	},
// 	{
// 		name: "Desert Mesa",
// 		image: "https://images.pexels.com/photos/4321774/pexels-photo-4321774.jpeg?auto=compress&cs=tinysrgb&h=350",
// 		description: "blah blah blah"
// 	},
// 	{
// 		name: "Canyon Floor",
// 		image: "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e507440762e79d7954fc4_340.jpg",
// 		description: "blah blah blah"
// 	}
// ]

function seedDB() {
	// remove all campgrounds
	Car.deleteMany({}, function(err) {
		// if(err) {
		// 	console.log(err);
		// } else {
		// 	console.log("removed campgrounds");
		// 	// add a few campgrounds
		// 	data.forEach(function(seed) {
		// 		Campground.create(seed, function(err, campground) {
		// 			if(err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log("added a campground");
		// 				// create a comment
		// 				Comment.create(
		// 					{
		// 						text: "this is place is great.",
		// 						author: "Homer"
		// 					}, function(err, comment) {
		// 						if(err) {
		// 							console.log(err);
		// 						} else {
		// 							campground.comments.push(comment);
		// 							campground.save();
		// 							console.log("created new comment");
		// 						}
		// 					});
		// 			}
		// 		});
		// 	});
		// }
	});
}

module.exports = seedDB;