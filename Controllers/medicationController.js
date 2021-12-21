const {Medication} = require('../Models/medication');

//Get the medications list +TESTED+
const showAll = (req, res, next) => {
    Medication.find().select('name dose')
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({message:'Could  not show the medications list'})
        })
}

//Get a meddication +TESTED+
const showOne = (req, res, next) =>{
    let medicationID = req.body.medicationID 
    Medication.findById(medicationID)
    .then(response => {
        res.json ({response})
    })
    .catch(error => { message:'The medication with the given ID was not found'})
}

//Delete a medication +TESTED+
const remove = (req, res, next) => {
    let medicationID = req.body.medicationID
    Medication.findByIdAndRemove(medicationID)
    .then(medication =>{
        if(medication){
            return res.status(200).json({message: 'The medication is deleted'})
        } else {
            return res.status(404).json({message: 'The medication is not found'})
        }
    }).catch(err =>{
        return res.status(400).json({success: false, error: err})
    })
}

//Add a medication +TESTED+
const add = ( req, res, next ) => {
    let medication = new Medication ({
        ref:req.body.ref,
        name: req.body.name,
        description: req.body.description,
        dose: req.body.dose,
        period: req.body.period,
        quantity: req.body.quantity,
        expDate: req.body.expDate,
        image: req.body.image
    })
    medication.save()
        .then(response => {
            res.json({message: 'medication Added Sucessfull!', response})
        })
        .catch(error => {
            res.json({
                message:'The medication cannot be added',error})
        })
}

module.exports = { showAll, showOne, remove, add }