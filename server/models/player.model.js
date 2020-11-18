const mongoose = require('mongoose')

// Player schema 
const playerSchema = new mongoose.Schema({
	"Player": String,
	"Team": String,
	"Pos": String,
	"Att": Number,
	"Att/G": Number,
	"Yds": String,
	"Avg": Number,
	"Yds/G": Number,
	"TD": Number,
	"Lng": String,
	"1st": Number,
	"1st%": Number,
	"20+": Number,
	"40+": Number,
	"FUM": Number
});

const Player = mongoose.model("Player", playerSchema, "Player");
module.exports = Player;