var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var VoteSchema = new Schema({
	datecast: Date,
	voter: { type: Schema.ObjectId, ref: 'User' },
	hash: String
});

//option types:
//1. yes/no
//2. ranking
var OptionSchema = new Schema({
	description: String,
	optiontype: Number,
	value: Number,
	votes: [VoteSchema]
});

//contest types:
//1. simple majority
//2. pick two
//3. ranked choice
var ContestSchema = new Schema({
	title: String,
	contesttype: Number,
	instructions: String,
	description: String,
	options: [OptionSchema]
});

var BallotSchema = new Schema({
	title: String,
    contests: [ContestSchema]
});

module.exports = {
	Vote: mongoose.model('Vote', VoteSchema),
	Option: mongoose.model('Option', OptionSchema),
	Contest: mongoose.model('Contest', ContestSchema),
	Ballot: mongoose.model('Ballot', BallotSchema)
};