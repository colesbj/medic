
var PillModel = require("../models/pill.js"); 

// Create a medication => POST localhost:3000/meds
exports.createPill= function(req, res, next) {
	// Init a new Pill Model (creates a object)
	var newPill = new PillModel();

	// Sets attributes of a new PillModel
	// Get attributes from request body
	newPill.pillName = req.body.pillName;
	newPill.amount = req.body.amount;
	newPill.inventorySlot = req.body.inventorySlot;
	newPill.dispensingTime = req.body.dispensingTime;
	newPill.dispensingFreq = req.body.dispensingFreq;
	newPill.dosage = req.body.dosage;
	newPill.dateAdded = req.body.dateAdded;
	newPill.startDate = req.body.startDate;
	newPill.lastDispensed = req.body.lastDispensed;
	newPill.specialInstructions = req.body.specialInstructions;
	// Used for text notificaiton
	newPill.userName = req.body.userName ;
	newPill.notifyNumber = req.body.notifyNumber; 


	// save the new medication in database
	newPill.save(function(err,savedPill){
		// if you cannot handle this go to the next handler
		if(err) return next(err); 
		// in responses object you send the data
		return res.send(savedPill); 
	})
};

// Get all medication => GET localhost:3000/meds
exports.getPills = function(req,res,next){

	// Query database and get all pills
	PillModel.find(function(err,pills){
		if(err) return next(err);
		return res.send(pills);
	})
};

// Get a single medication => GET localhost:3000/meds/:pill_id
exports.getPill = function(req,res,next){

	// Gets attributes from request body
	var pill_id = req.params.pill_id;

	// Query database using ObjectID and returns a single pill
	PillModel.findById(pill_id,function(err, pill){
		if(err) return next(err);
		return res.send(pill);
	})
};

// Edit a mecication => GET localhost:3000/meds/:pill_id
exports.updatePill = function(req,res,next){

	// Get attribute from a request body
	var pill_id = req.params.pill_id;

	// Query database by ObjectId and return edited object
	PillModel.findById(pill_id,function(err, pill){
		if(err) return next(err);
		
		// Check the request body for updated fields 
		if(req.body.pillName) pill.pillName = req.body.pillName;
		if(req.body.amount) pill.amount = req.body.amount;
		if(req.body.dateAdded) pill.dateAdded = req.body.dateAdded;
		if(req.body.userName) pill.userName = req.body.userName;
		if(req.body.notifyNumber) pill.notifyNumber = req.body.notifyNumber;
		if(req.body.inventorySlot){ 
			pill.inventorySlot = req.body.inventorySlot;
		}
		if(req.body.dispensingFreq){ 
			pill.dispensingFreq = req.body.dispensingFreq;
		}
		if(req.body.dispensingTime){ 
			pill.dispensingTime = req.body.dispensingTime;
		}
		if(req.body.dosage){
			pill.dosage = req.body.dosage;
		}
		if(req.body.startDate) pill.startDate = req.body.startDate;
		if (req.body.lastDispensed) {
			pill.lastDispensed = req.body.lastDispensed;
		}
		if (req.body.specialInstructions) {
			pill.specialInstructions = req.body.specialInstructions; 
		}

		// Save the updated pill in databasse
		pill.save(function(err,savedPill){
			if(err) return next(err);
			return res.send(savedPill);
		})

	})
};

// Delete a single medication => DELETE localhost:3000/meds/:pill_id
exports.deletePill = function(req,res,next){

	// Get attribute from request body
	var pill_id = req.params.pill_id;

	// Query databases by ObjectId and remove it and then send success message
	PillModel.findByIdAndRemove(pill_id,function(err, pill){
		if(err) return next(err);
		return res.send({message:"Pill Removed"});
	})
};

