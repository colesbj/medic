var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var PillSchema = new Schema({

	userName: String, //This is the person whose pill it is
	notifyNumber: Number, // This is the phone number to whom it will send the text message 
	pillName: String, // generic or manufactures name
	amount: Number, // current amount of pills
	inventorySlot: Number, // where the pill is stored
	dispensingTime: Array, // When to dispense the pill
	dispensingFreq: Number, // how often will it be dispensed 
	dosage: Number, // the number of pill to dispense each time
	dateAdded: Date, // when was the pill added to the database
	startDate: Date, // when should the treatment begin
	lastDispensed: Date, // when was the last time the pill was dispensed
	specialInstructions: Array // what should the user be reminded of each time 

	
});

module.exports = mongoose.model('Pill', PillSchema);
