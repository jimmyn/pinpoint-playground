import AWS from 'aws-sdk';
import {CreateExportJobRequest} from 'aws-sdk/clients/pinpoint';

AWS.config.region = 'us-east-1';
const pinpoint = new AWS.Pinpoint();

const params: CreateExportJobRequest = {
  ApplicationId: '193c0624ab2047b2b085814acd7f08f5',
  ExportJobRequest: { /* required */
    RoleArn: 'arn:aws:iam::862946620411:role/service-role/pinpoint-segment-test-role',
    S3UrlPrefix: 's3://pinpoint-segments-import/export',
    SegmentId: '1e2f571f06ab4740b7ef79767eb39c6e',
    SegmentVersion: 0
  }
};

pinpoint.createExportJob(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);  // successful response
});
