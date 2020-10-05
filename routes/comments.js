var express = require("express");
var router = express.Router({mergeParams: true});
var Car = require("../models/car");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

// ===============
// Comments routes
// ===============

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
	// find car by id
	Car.findById(req.params.id, function(err, car) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {car: car});
		}
	});
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res) {
	// lookup car using ID
	Car.findById(req.params.id, function(err, car) {
		if(err) {
			console.log(err);
			res.redirect("/cars");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					// add user name and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					car.comments.push(comment);
					car.save();
					req.flash("success", "Successfully added comment");
					res.redirect("/cars/" + car._id);
				}
			});
		}
	});
});

// comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {car_id: req.params.id, comment: foundComment});
		}
	});
});

// comment update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/cars/" + req.params.id);
		}
	});
});

// comment destory route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	// findByIdAndRemove
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			res.redirect("back");
		} else {
			req.flash("success", "Comment Deleted");
			res.redirect("/cars/" + req.params.id);
		}
	});
});

module.exports = router;
