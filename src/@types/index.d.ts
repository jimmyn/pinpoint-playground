import {APIGatewayEventRequestContext} from 'aws-lambda';
import {DirectMessageConfiguration, EndpointResponse} from 'aws-sdk/clients/pinpoint';

export interface INormalizedEvent {
  headers: {
    [name: string]: string;
  };
  httpMethod: string;
  isBase64Encoded: boolean;
  path: string;
  pathParameters: {[name: string]: string} | {};
  queryStringParameters: {[name: string]: string} | {};
  stageVariables: {[name: string]: string} | null;
  requestContext: APIGatewayEventRequestContext;
  resource: string;
  body: any;
}

interface ICampaignHookEvent {
  "MessageConfiguration": DirectMessageConfiguration
  "ApplicationId": string,
  "CampaignId": string,
  "TreatmentId": string,
  "ActivityId": string,
  "ScheduledTime": string,
  "Endpoints": {
    [key: string]: EndpointResponse
  }
}
