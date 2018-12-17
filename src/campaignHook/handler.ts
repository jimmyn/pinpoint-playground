import {Handler} from 'aws-lambda';
import middy from 'middy';
import {ICampaignHookEvent} from '../@types';
import {logRoutine} from '../lib/middlewares/logRoutine';

const handler: Handler<ICampaignHookEvent> = (event, context, callback) => {
  callback(null, event.Endpoints);
};

export default middy(handler).use(logRoutine());
