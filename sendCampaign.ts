import AWS from 'aws-sdk';
import {CreateCampaignRequest} from 'aws-sdk/clients/pinpoint';
import fs from 'fs';

AWS.config.region = 'us-east-1';
const pinpoint = new AWS.Pinpoint();

const params: CreateCampaignRequest = {
  ApplicationId: '193c0624ab2047b2b085814acd7f08f5',
  WriteCampaignRequest: {
    Name: 'Test campaign',
    SegmentId: 'b3d9d5849c5b479cab75f03f86b94a93',
    // Hook: {
    //   LambdaFunctionName: 'pinpoint-campaign-hook',
    //   Mode: 'FILTER'
    // },
    MessageConfiguration: {
      EmailMessage: {
        FromAddress: 'hi@microapps.com',
        HtmlBody: fs.readFileSync('./email.html', 'utf8'),
        Title: 'Test campaign'
      }
    },
    // Schedule: {
    //   IsLocalTime: false,
    //   QuietTime: {},
    //   StartTime: "IMMEDIATE",
    //   Timezone: "UTC",
    // },
    Schedule: {
      Frequency: 'ONCE',
      StartTime: new Date().toISOString()
    },
    IsPaused: true
  }
};

pinpoint.createCampaign(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
