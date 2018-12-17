import {ICampaignHookEvent} from '../@types';

export const campaignHook = async (event:ICampaignHookEvent) => {
  return event.Endpoints;
};
