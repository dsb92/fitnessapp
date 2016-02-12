var express = require('express');
// Router-level middleware
var router = express.Router();
var ctrlWorkoutPrograms = require('../controllers/workoutprograms');
var ctrlWorkoutLog = require('../controllers/workoutlog');

/* GET Workoutprograms. */
router.get('/', ctrlWorkoutPrograms.index);

/* GET New workoutprogram. */
router.get('/newprogram', ctrlWorkoutPrograms.getnewprogram);

/* GET Worklog. */
router.get('/workoutlog', ctrlWorkoutLog.workoutlog);

/* POST New workoutprogram. */
router.post('/newprogram', ctrlWorkoutPrograms.postnewprogram);

module.exports = router;
