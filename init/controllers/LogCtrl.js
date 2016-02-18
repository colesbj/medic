var LogModel = require("../models/log.js"); 

// Log a medication => POST localhost:3000/log
exports.logPill= function(req, res, next) {
	// Init a new Log Model (creates a object)
	var newLog = new LogModel();

	// Sets attributes of a new LogModel
	// Get attributes from request body
	newLog.pillName = req.body.pillName;
	newLog.dosage = req.body.dosage;
	newLog.dateDispensed = req.body.dateDispensed;

	// save the new log in database
	newLog.save(function(err,savedLog){
		// if you cannot handle this go to the next handler
		if(err) return next(err); 
		// in responses object you send the data
		return res.send(savedLog); 
	})
};

// Get a Medication history => GET localhost:3000/log
exports.getLogs= function(req, res, next) {
	
	LogModel.find(function(err,logs){
		// if you cannot handle this go to the next handler
		if(err) return next(err); 
		// in responses object you send the data
		return res.send(logs); 
	})
};