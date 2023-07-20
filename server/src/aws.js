const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.load();

AWS.config.update({
  accessKeyId: process.env.AWS_keyid,
  secretAccessKey: process.env.AWS_secretkey,
  region: process.env.AWS_region,
});
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const Bucket = process.env.AWS_bucketname;

exports.getSignedUrl = async (filename) => {
  // Get signed URL from S3
  const key = filename + (Math.random() * 10000000);
  const s3Params = {
    Bucket,
    Key: key,
    ContentType: 'image/jpeg',
  };

  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
  console.log(s3Params, { uploadURL }); // check

  return ({ uploadURL, key });
};

exports.addPhoto = (name) => {
  const params = {
    Bucket: process.env.AWS_bucketname,
    Key: name,
    Body: fs.readFileSync(`./receipts/${name}.png`),
    ContentType: 'image/png',
  };

  return s3.putObject(params).promise();
};

exports.receipt = async (key) => {
  const params = {
    Bucket,
    Key: key,
  };

  return s3.getObject(params).promise();
};
