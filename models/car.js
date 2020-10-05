var mongoose = require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/car_reddit", { useNewUrlParser: true });

// Schema setup
var carSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Car", carSchema);