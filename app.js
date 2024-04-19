const express = require('express');
const uploadRoute = require('./routes/upload');
const { MulterError } = require('multer');
require('dotenv').config();

const app = express();

app.use(express.json())
app.use('/api',uploadRoute);
app.use((error,req,res,next)=>{
    if(error instanceof MulterError){
        return res.status(400).json({
            message: error.message
        })
    }
})
const port = 8000

app.listen(port,()=>console.log(`Server started at ${port}`));



