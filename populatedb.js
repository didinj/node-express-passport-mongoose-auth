var Ballot = require("../models/Ballot").Ballot;
var Contest = require("../models/Ballot").Contest;
var Option = require("../models/Ballot").Option;
var Vote = require("../models/Ballot").Vote;

var optionList = [];
var contestList = [];

//Populate db with Ballot, contests, and options

function addOptionToList(desc, type){
	Option.create(new Option({description: desc, optiontype: type}), function(err,option){
			if(err){
				console.log(err);
			}else{
				optionList.push(option);
			}
		}
	);
}

function addContestToList(title, type, instruct, desc){
	Contest.create(new Contest({title: title, contesttype: type, instructions: instruct, description: desc}), function(err,contest){
			if(err){
				console.log(err);
			}else{
				contestList.push(contest);
			}
		}
	);
}

Ballot.create(new Ballot({title: "Voteyum 2017"}), function(err, ballot){
    if(err){
    	console.log(err);
    }else{
    	console.log(ballot);
    }
});