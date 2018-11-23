import {ICampaignHookEvent} from '../@types';
import {logRoutine} from '../lib/middlewares/logRoutine';
import middy from 'middy';
import {campaignHook} from './campaignHook';

const handler = async (event: ICampaignHookEvent) => {
  return campaignHook(event);
};

export default middy(handler).use(logRoutine());
