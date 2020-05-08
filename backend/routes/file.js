"use strict";
const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const pool = require("../utils/mysqlConnection");
// const { checkAuth } = require("../utils/passport");
const { validateAccount } = require("../validations/accountValidations");
const { STATUS_CODE, MESSAGES } = require("../utils/constants");
const logger = require("../utils/logger");
const {uploadFileToS3} = require("../utils/awsImageUpload")
const multiparty = require('multiparty');
const fileType = require('file-type');
const fs = require('fs');
const Product = require("./../routes/productModel");
const { checkAuth } = require("../utils/passport");


/**
 * to deactivate an account
 * @param req: user_id
 */
router.post("/uploadImage",checkAuth, async (req, res) => {
  console.log("Req body for add Pr", req.body);
  var userId = req.query.userId
  //var data = await uploadFileToS3(req.body,"users",userId);
  //console.log("response in upload image",data)

  const form = new multiparty.Form();
    form.parse(req, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        console.log("path:::",path)
        const buffer = fs.readFileSync(path);
        //console.log("buffer:::",buffer)
        const type = "jpg"
        console.log("type:::",type)
        const timestamp = Date.now().toString();
        const fileName = userId//`bucketFolder/${timestamp}-lg`;
        const data = await uploadFileToS3(buffer, fileName, type,"user");
        
        pool.query(`update users set imagePath = "${data.Location}" where id = ${userId}`, async function(error,result){
            if(!error){
            console.log("updated")
            }else{
                console.log('error::',error)
            }
        })
        
        return res.status(200).send(data);


      } catch (error) {
        console.log("error",error)
        return res.status(400).send(error);
      }
    });


 // return res.send({ signedUrl: data })
});


router.post("/uploadImages",checkAuth, async (req, res) => {
    console.log("Req body for add Pr", req.body);
    var productId = req.query.productId
    //var data = await uploadFileToS3(req.body,"users",userId);
    //console.log("response in upload image",data)
  
    const form = new multiparty.Form();
      form.parse(req, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
        //console.log("files::",files)
          const path = files.file[0].path;
          console.log("path:::",files.file[0])
          const buffer = fs.readFileSync(path);
          //console.log("buffer:::",buffer)
          const type = "jpg"
          console.log("type:::",type)
          const timestamp = Date.now().toString();
          const fileName = productId+ "/"+files.file[0].originalFilename.split(".")[0]//`bucketFolder/${timestamp}-lg`;
          const data = await uploadFileToS3(buffer, fileName, type,"product");
          
          Product.updateOne({_id:productId},{$push:{productImages:data.Location}}).then((res)=>{

            console.log("updated")
          })
          
         
       
          return res.status(200).send(data);
  
  
        } catch (error) {
          console.log("error",error)
          return res.status(400).send(error);
        }
      });
  
  
   // return res.send({ signedUrl: data })
  });


  router.post("/removeProductImage", checkAuth,async (req, res) => {
    console.log("Req body for add Pr", req.body);
    var productId = req.body.productId
    
    var imagePath = req.body.imagePath

    Product.updateOne({_id:productId},{"$pull": { "productImages": imagePath }},{ multi:true })
    .then((response)=>{
        console.log("updated")
        return res.status(200).send("deleted");
        // return res.send({ signedUrl: data })
     });

    })
  


module.exports = router;
