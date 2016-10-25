// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* set CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // set CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // do logging
    console.log('Request received. Details follow:');
    console.log(req.method);
    console.log(req.headers);
    console.log(req.body);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// more routes for our API will happen here
// on routes that end in /incidents
// ----------------------------------------------------
router.route('/incidents')

    // create a incident (accessed at POST http://localhost:8080/api/incidents)
    .post(function(req, res) {
        
        var incident = new Incident();      // create a new instance of the Incident model
        incident.type = req.body.incidentType;  // set the incident's type (comes from the request)
	incident.community = req.body.incidentCommunity;
	incident.parish = req.body.incidentParish;
	incident.date = req.body.incidentDate;
	incident.time = req.body.incidentTime;
	incident.description = req.body.incidentDesc;
	incident.age = req.body.demoAge;
	incident.gender = req.body.demoGender;
	incident.identity = req.body.demoIdentity;

        // save the incident and check for errors
        incident.save(function(err) {
            if (err) {
		console.log("error!");
		console.log(err);
                res.send("-1");
	    }

            res.json({ id: incident.id });
        });
    })

    // get all the incidents (accessed at GET http://localhost:8080/api/incidents)
    .get(function(req, res) {
        Incident.find(function(err, incidents) {
            if (err)
                res.send(err);

            res.json(incidents);
        });
    });
        
// on routes that end in /incidents/:incident_id
// ----------------------------------------------------
router.route('/incidents/:incident_id')

    // get the incident with that id (accessed at GET http://localhost:8080/api/incidents/:incident_id)
    .get(function(req, res) {
        Incident.findById(req.params.incident_id, function(err, incident) {
            if (err)
                res.send(err);
            res.json(incident);
        });
    })

    // update the incident with this id (accessed at PUT http://localhost:8080/api/incidents/:incident_id)
    .put(function(req, res) {

        // use our incident model to find the incident we want
        Incident.findById(req.params.incident_id, function(err, incident) {

            if (err)
                res.send(err);

            incident.name = req.body.name;  // update the incidents info

            // save the incident
            incident.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Incident updated!' });
            });

        });
    })

    // delete the incident with this id (accessed at DELETE http://localhost:8080/api/incidents/:incident_id)
    .delete(function(req, res) {
        Incident.remove({
            _id: req.params.incident_id
        }, function(err, incident) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

var mongoose   = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/db');

var Incident     = require('./models/incident');
