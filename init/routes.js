
// Theses are the views
var express = require('express');
var router = express.Router();

// This is the controller
var PillCtrl = require("./controllers/PillCtrl.js");
var LogCtrl = require("./controllers/LogCtrl.js");
var NotifyCtrl = require("./controllers/NotifyCtrl.js") ;

// Pill API ENDPOINTS

// Add pills to calendar
router.post('/addToCalendar',NotifyCtrl.addToCalendar);

// Send SMS message
router.post('/notify',NotifyCtrl.sendNotification);

// Create a Pill
router.post('/meds',PillCtrl.createPill);

// Get all Pills
router.get('/meds',PillCtrl.getPills);

// Get a single Pill
router.get('/meds/:pill_id',PillCtrl.getPill);

// Update a pill
router.put('/meds/:pill_id',PillCtrl.updatePill);

// Delete a pill
router.delete('/meds/:pill_id',PillCtrl.deletePill);

//Log Dispensed Pill
router.post('/log',LogCtrl.logPill); 

//Get All Dispensed Pills
router.get('/log',LogCtrl.getLogs); 

module.exports = router;
