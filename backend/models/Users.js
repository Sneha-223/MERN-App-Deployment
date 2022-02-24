const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	number: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
	age:{
		type: Number
	},
	batch:{
		type: String
	},
	manager:{
		type: String
	},
	shop:{
		type: String
	},
	OpenTime:{
		type: String
	},
	CloseTime:{
		type: String
	},
	type:{
		type: String,
		enum: ['Buyer', 'Vendor'] 
	},
	wallet:{
		type: Number
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
