var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var ScheduleSchema = new Schema({

	schedule: Array //stores all of the dispensiong times of pills in order
					// each object has
					// pillName
					// dispensing Time
					// _id:
	
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
