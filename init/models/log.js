var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var LogSchema = new Schema({

	pillName: String, // the generic or manufactures name
	dosage: Number, // number of pills dispensed at that point in time
	dateDispensed: Date// when was it dispensed
	
});

module.exports = mongoose.model('Log', LogSchema);