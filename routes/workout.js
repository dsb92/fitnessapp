var express = require('express');
var router = express.Router();
var ctrlWorkout = require('../controllers/workout');

/* GET workout. */
router.get('/:id', ctrlWorkout.workout);

/* GET New workout. */
router.get('/:id/newworkout', ctrlWorkout.getnewworkout);

/* POST New workout */
router.post('/:id/newworkout', ctrlWorkout.postnewworkout);

/* POST Complete program */
router.post('/:id/completeprogram', ctrlWorkout.completeprogram);

module.exports = router;
