import {ICampaignHookEvent} from '../@types';

export const campaignHook = async (event:ICampaignHookEvent) => {
  return {
    body: "ok",
    statusCode: 200
  }
};
