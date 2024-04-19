const express = require('express');
const { MulterError } = require('multer');

function uploadFile(req,res){
    try{
       
        if(req.files.length === 0){
            throw new Error(`Missing files`)
        }
        return res.status(200).json({
            message:"File Uploaded Successfully"
        })
    }catch(err){
        if(err instanceof MulterError){
            return res.status(400).json({
                message:"Something went wrong",
                error: err.message
            })
        }
        return res.status(500).json({
            message:"Something went wrong",
            error: err.message
        })
    }
}

module.exports = {
    uploadFile
}