var Ballot = require("./models/Ballot").Ballot;
var Contest = require("./models/Ballot").Contest;
var Option = require("./models/Ballot").Option;
var Vote = require("./models/Ballot").Vote;

var optionList = [];
var contestList = [];

//Populate db with Ballot, contests, and options

function addOptionToList(desc, type, val){
	Option.create(new Option({description: desc, optiontype: type, value: val}), function(err,option){
			if(err){
				console.log(err);
			}else{
				optionList.push(option);
			}
		}
	);
}

function addContestToList(title, reg, type, instruct, desc, opts){
	Contest.create(new Contest({title: title, region: reg, contesttype: type, instructions: instruct, description: desc}), function(err,contest){
			if(err){
				console.log(err);
			}else{
				Contest.findByIdAndUpdate(
				    contest._id,
				    {$push: {"options": optionList}},
				    {safe: true, upsert: true},
				    function(err, updatedContest) {
				        contestList.push(updatedContest);
				    }
				);
			}
		}
	);
}
//First issue
module.exports = function populate(){
	addOptionToList("Reese WithoutASpoon and Cherry Garcia (Democrat)", 2, 1);
	addOptionToList("Reese WithoutASpoon and Cherry Garcia (Democrat)", 2, 2);
	addOptionToList("Reese WithoutASpoon and Cherry Garcia (Democrat)", 2, 3);

	addOptionToList("Choco 'Chip' Dough and Camela Coney (Republican)", 2, 1);
	addOptionToList("Choco 'Chip' Dough and Camela Coney (Republican)", 2, 2);
	addOptionToList("Choco 'Chip' Dough and Camela Coney (Republican)", 2, 3);

	addOptionToList("Magic Browny and Phish Food (Independent)", 2, 1);
	addOptionToList("Magic Browny and Phish Food (Independent)", 2, 2);
	addOptionToList("Magic Browny and Phish Food (Independent)", 2, 3);

	addContestToList("For Commander In Cream and Vice Ice:", "Federal and State", 3, "Ranked Choice Voting (Instant Runoff)", 
					"Rank candidates in order of choice. Mark your favorite candidate as first choice and then indicate your "+
					"second and additional back-up choices in order of choice. You may rank as many candiddates as you want.",
					optionList);
	optionList = [];

	//Second issue
	addOptionToList("Yes (If you wish the offcial to remain in office)", 1, 0);
	addOptionToList("No (If you do not wish the official to remain in office)", 1, 0);

	addContestToList("For Chief Dairy Queen:", "Federal and State", 1, "Unexpired Term (Choose One)", 
					"Shall Justice Mint C. Chip of the Supreme Court of the State of Ice Cream be retained in office for another term?",
					optionList);
	optionList = [];

	//Third issue
	addOptionToList("P. Nut Butter (Republican)", 2, 0);
	addOptionToList("Cream C. Kol (Independant)", 2, 0);
	addOptionToList("Marsh Mallow (Democrat)", 2, 0);

	addContestToList("For State Rep. District M&M:", "Federal and State", 2, "Choose Two", "", optionList);
	optionList = [];

	//Fourth issue
	addOptionToList("Yes on CI-116 (For Vanilla)", 1, 0);
	addOptionToList("No on CI-116 (For Chocolate)", 1, 0);

	addContestToList("Ballot Issue: Constitutional Inititve No. 116:", "County", 1, "Choose One", 
					"Make Vanilla (over Chocolate) the offical best flavor? This is a fiercely debated topic and CI-116 would "+
					"officially enumerate in written legislative text in perpetuity which flavor has favor - namely Vanilla is "+
					"better, unequivocally, than Chocolate",
					optionList);
	optionList = [];

	Ballot.create(new Ballot({title: "Voteyum 2017"}), function(err, ballot){
	    if(err){
	    	console.log(err);
	    }else{
	    	Ballot.findByIdAndUpdate(
				    ballot._id,
				    {$push: {"contests": contestList}},
				    {safe: true, upsert: true},
				    function(err, model) {
				    	console.log(contestList);
				        console.log(err);
				    }
			);
	    }
	});
};