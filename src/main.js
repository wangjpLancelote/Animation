const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path')
const { S3Client, S3, PutObjectCommand,  } = require('@aws-sdk/client-s3');
const mime = require('mime');
const https = require('https');
const http = require('http');


const REGION = 'ap-southeast-1';
const s3Client = new S3Client({ region: REGION, credentials: { accessKeyId: 'AKIAZXDBJDONXKYSRCWD', secretAccessKey: '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' } });
// s3Client.config.accessKeyId = 'AKIAQZPDLWVANCGIDWQX';
// s3Client.config.secretAccessKey = '55liOZyuNKXRTRuiBIBsJh0hOgs';
// export const s3 = new S3({ region: REGION });
const file = fs.readFileSync('../src/pages/canvas/展示背景.png');
console.log('file', file);
const streamFile = fs.createReadStream('../src/pages/canvas/展示背景.png');


var s3 = new AWS.S3({ accessKeyId: 'AKIAZXDBJDONXKYSRCWD', secretAccessKey: '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', region: 'ap-south-1'});

var s3Uat = new AWS.S3({ accessKeyId: 'AKIAQZPDLWVANCGIDWQX', secretAccessKey: '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', region: 'ap-southeast-1'});


// const deleteObject = s3.deleteObjects({
//   Bucket: 'ws-front',
//   Delete: {
//     Objects: [
//       {
//         Key: 'test.js'
//       }
//     ]
//   }
// });

// console.log('>>client', s3Client);
const uploadParams = {
  Bucket: "ws-front",
  Key: 'test1',
  Body: streamFile,
};
const run = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
// run();

// deleteObject.send((err, data) => {
//   if (err) {
//     console.log('err', err.code, err.message);
//   } else {
//     console.log('>>>data', data);
//   }
// })


// const file = fs.readFileSync('./utils/test.js');


const params = {
  Bucket: 'winnerspin-front-pub',
  Key: 'test/展示背景.png',
  Body: streamFile,
  ContentType: 'image/png'
}

const upload = s3.upload(params, {
  queueSize: 1,
  connectTimeout: 60 * 60 * 1 * 1000,
  httpOptions: {
    timeout: 60 * 60 * 1000,
  }
}).on('httpUploadProgress', function (e) {
  let percent = parseInt(e.loaded, 10) / parseInt(e.total, 10);
  percent = percent.toFixed(2) * 100;
  console.log('percent', percent);
});

upload.send(function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('data', data);
  }
})