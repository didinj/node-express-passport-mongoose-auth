var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var ballot = require("../controllers/BallotController.js");

// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

//route to ballot home
router.get('/ballot', ballot.home);

/* TODO: create UI for building ballots
//route to create new ballot
router.get('/newballot', ballot.createBallot);

//route for new ballow action
router.post('/newballot', ballot.doCreateBallot);

router.get('/ballot/:ballotid', ballot.createContest);

router.post('/newcontest', ballot.doCreateContest);
*/
module.exports = router;