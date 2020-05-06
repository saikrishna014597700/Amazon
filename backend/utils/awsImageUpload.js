const { awsBucket, awsAccessKey, awsSecretAccessKey, awsPermission } = require('./config');
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey
});

const deleteFile = (file) => {
    fs.unlink(file.path, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function uploadFileToS3(buffer, name, type,param) {

    //const fileContent  = Buffer.from(req.files.uploadedFileName.data, 'binary');
    let promise = new Promise((resolve, reject) => {

        let params;
        if(param === "user"){
         params = {
            ACL: 'public-read',
            Body: buffer,
            Bucket: awsBucket +"/users",
            ContentType: type.mime,
            Key: `${name}.${type}`
          };
        }else if (param === "product"){
             params = {
                ACL: 'public-read',
                Body: buffer,
                Bucket: awsBucket +"/products",
                ContentType: type.mime,
                Key: `${name}.${type}`
              }; 
        }
        
        
        s3.upload(params, (s3Err, resp) => {
            if (s3Err) {
                console.log("error in upload: ",s3Err);
                //deleteFile(file);
                reject(s3Err);
            }
            else {
                imageUrl = resp.Location;
                //deleteFile(file);
                resolve(resp);
            }
          });
        // s3.upload(params, function (s3Err, resp) {
        //     if (s3Err) {
                
        //     } else {
                
        //     }
        // });
    });
    return promise;
};

exports.uploadFileToS3 = uploadFileToS3;