const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Medication} = require('../Models/medication');
const MedicationContoller = require('../Controllers/medicationController')

//Get the medications list +TESTED+
router.get('/showAll', MedicationContoller.showAll)

//Get a medication +TESTED+
router.get('/showOne', MedicationContoller.showOne)

//Get a medication of user
router.get('/showAlluser', MedicationContoller.showAlluser)

//Update a medication +TESTED+
router.post('/update',MedicationContoller.UpdateMedication)

//Delete a medication +TESTED+
router.delete('/remove', MedicationContoller.remove)

//router.post('/add', MedicationContoller.add)

//////////////////////////

//Upload image-storage
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('INVALID IMAGE TYPE');
        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })

//Add a medication +TESTED+
router.post(`/add`, uploadOptions.single('image'), async (req, res) =>{
    const file = req.file;
    if(!file) return res.status(400).send('image is not uploaded')//validate if the file is uploaded

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    
    let medication = new Medication({
        ref:req.body.ref,
        name: req.body.name,
        description: req.body.description,
        dose: req.body.dose,
        period: req.body.period,
        quantity: req.body.quantity,
        expDate: req.body.expDate,
        image: `${basePath}${fileName}`,
        user:req.body.user
    })
    medication = await medication.save();
    if(!medication) {
        return res.status(404).send('The medication cannot be added')
    }
    res.send(medication);
})

/*//upload medication image
router.put('/medication-image/:id', uploadOptions.array('images',10), async (req, res) => {

    if(!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Invalid Medication ID')
    }

    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if(files) {
        files.map(file => {
            imagesPaths.push(`${basePath}${file.fileName}`);
        })
    }

    let medication = await Medication.findByIdAndUpdate(
        req.params.id,
        { image: imagesPaths },
        { new: true }
    )

    if(!medication) {
        return res.status(404).send('The medication cannot be updated')
    }
    res.send(medication);   
})*/


module.exports = router;