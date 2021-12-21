const express = require('express');
const router = express.Router();
const MedicationContoller = require('../Controllers/medicationController')

//Get the medications list +TESTED+
router.get('/showAll', MedicationContoller.showAll)

//Get a medication +TESTED+
router.get('/showOne', MedicationContoller.showOne)

//Delete a medication +TESTED+
router.delete('/remove', MedicationContoller.remove)

//Add a medication +TESTED+
router.post('/add', MedicationContoller.add)

module.exports = router;