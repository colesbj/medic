var ScheduleModel = require("../models/schedule.js"); 

// Create a schedule => POST localhost:3000/schedule
exports.createSchedule= function(req, res, next) {
	// Init a new Schedule Model (creates a object)
	var newSchedule = new ScheduleModel();

	// Sets attributes of a new ScheduleModel
	// Get attributes from request body
	newSchedule.schedule = req.body.schedule;


	// save the new medication in database
	newSchedule.save(function(err,savedSchedule){
		// if you cannot handle this go to the next handler
		if(err) return next(err); 
		// in responses object you send the data
		return res.send(savedSchedule); 
	})
};

// Gets the schedule => GET localhost:3000/schedule
exports.getSchedule = function(req,res,next){

	// Query database and get all Schedules
	ScheduleModel.find(function(err,Schedule){
		if(err) return next(err);
		return res.send(Schedule);
	})
};

// Edit Schedule => GET localhost:3000/schedule/:schedule_id
exports.updateSchedule = function(req,res,next){

	// Get attribute from a request body
	var Schedule_id = req.params.schedule_id;

	// Query database by ObjectId and return edited object
	ScheduleModel.findById(Schedule_id,function(err, Schedule){
		if(err) return next(err);
		
		// Check the request body for updated fields 
		if(req.body.schedule) Schedule.schedule = req.body.schedule;
		

		// Save the updated Schedule in databasse
		Schedule.save(function(err,savedSchedule){
			if(err) return next(err);
			return res.send(savedSchedule);
		})

	})
};

// Delete schedule => DELETE localhost:3000/schedule/:Schedule_id
exports.deleteSchedule = function(req,res,next){

	// Get attribute from request body
	var Schedule_id = req.params.schedule_id;

	// Query databases by ObjectId and remove it and then send success message
	ScheduleModel.findByIdAndRemove(Schedule_id,function(err, Schedule){
		if(err) return next(err);
		return res.send({message:"Schedule Removed"});
	})
};

