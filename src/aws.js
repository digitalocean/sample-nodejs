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
    Bucket: process.env.AWS_bucketname,
    Key: key,
  };

  return s3.getObject(params).promise();
};
