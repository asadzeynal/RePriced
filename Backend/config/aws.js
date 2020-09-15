const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Body: '',
  Key: '',
};

const upload = async (file, dirname, fileName) => {
  params.Body = file;
  params.Key = `${dirname}/${fileName}`;
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { upload };
