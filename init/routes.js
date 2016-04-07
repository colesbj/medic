
// Theses are the views
var express = require('express');
var router = express.Router();

// This is the controller
var PillCtrl = require("./controllers/PillCtrl.js");
var LogCtrl = require("./controllers/LogCtrl.js");
var NotifyCtrl = require("./controllers/NotifyCtrl.js") ;
var ScheduleCtrl = require("./controllers/ScheduleCtrl.js");
// Pill API ENDPOINTS

// Send SMS message

router.post('/notify',NotifyCtrl.sendNotification);

//Send SMS reminder message
router.post('/reminder',NotifyCtrl.sendReminder);

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

//Create a schedule
router.post('/schedule',ScheduleCtrl.createSchedule);

//Get the schedule 
router.get('/schedule',ScheduleCtrl.getSchedule);
// Update a schedule
router.put('/schedule/:schedule_id',ScheduleCtrl.updateSchedule);
// Delete a schedule
router.delete('/schedule/:schedule_id',ScheduleCtrl.deleteSchedule);

module.exports = router;
