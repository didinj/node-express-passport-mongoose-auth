var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var Ballot = require("../models/Ballot").Ballot;
var Contest = require("../models/Ballot").Contest;
var Option = require("../models/Ballot").Option;
var Vote = require("../models/Ballot").Vote;

var ballotController = {};

// Ballot view
ballotController.home = function(req, res) {
  res.render('ballot', { user: req.user});
};

// Create a new ballot
ballotController.createBallot = function(req, res) {
  res.render('ballot', { mode: 'createballot',  user: req.user});
};

// Post registration
ballotController.doCreateBallot = function(req, res) {
  Ballot.create(new Ballot({ title: req.body.title, ballotlevel: req.body.ballotlevel}), function(err, ballot) {
    if (err) {
      return res.render('ballot', { error: err, user: user });
    }else{
      return res.render('ballot', { mode: 'createcontest', ballot: ballot, user: req.user});
    }
  });
};

ballotController.createContest = function(req, res) {
  Ballot.findById(req.params.ballotid, '', { lean: true }, function(err, ballot) {
    if (ballot) {
      return res.render('ballot', { mode: 'createcontest', ballot: ballot, user: req.user});
    }else if (err) {
      return res.render('ballot', { error: err, user: user });
    }
  });
};

ballotController.doCreateContest = function(req, res) {
  Contest.create(new Contest({ title: req.body.title, contesttype: req.body.contesttype, typestring: req.body.typestring, typedesc: req.body.typedesc}), function(err, contest) {
    console.log(contest, err);
    if (err) {
      return res.render('ballot', { error: err, mode: 'createcontest', ballot: ballot, user: req.user});
    }else{
      Ballot.findByIdAndUpdate(
        req.body.ballotId,
        {$push: {"contests": contest}},
        {safe: true, new : true},
        function(err, ballot) {
            console.log(ballot, err);
            if(err){
              return res.render('ballot', { error: err, mode: 'createcontest', ballot: ballot, user: req.user});
            }else if(ballot){
              return res.render('ballot', {mode: 'createoption', ballot: ballot, user: req.user});
            }
        }
      );
    }
  });



  Ballot.findById(req.params.ballotid, '', { lean: true }, function(err, ballot) {
    if (ballot) {
      
    }else if (err) {
      return res.render('ballot', { error: err, user: user });
    }
  });
};


// Post login
ballotController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

module.exports = ballotController;
