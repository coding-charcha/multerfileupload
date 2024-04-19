const {uploadFile} = require('../controllers/upload.controller');
const multer = require('multer');
const router = require('express').Router();

//const fileUpload = multer({dest:"uploads/"});

//const uploadMulti = multer({dest:"uploads/"});

/*Uploading a single file */
//router.post('/upload',fileUpload.single('fileName'),uploadFile);

/* Uploading Multiple File */
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"uploads");
    },
    filename: (req,file,cb)=>{
        const {originalname} = file
        cb(null,`${Date.now()}-${originalname}`);
    },
    

})

const fileFilter= (req,file,cb)=>{
    console.log(file.mimetype);
    if(file.mimetype.split('/')[0] === 'image'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

// const multiFileUpload = fileUpload.fields([
//     {name:'mainImage',maxCount:1},
//     {name: 'secondaryImage',maxCount:1 }
// ])
//const upload = multer({ storage , fileFilter, limits: {fileSize: 100000000, files: 2}});

const fileUpload =multer({storage, fileFilter, limits:{fileSize:100000,files:2}}) 
router.post('/upload',fileUpload.single("fileName"),uploadFile);
router.post('/uploadmulti',fileUpload.array("fileName",2), uploadFile);

module.exports= router