import axios from 'axios';
import env from '@/env';

export const sendMsg = (payload) => {
  const finalURL = `${env.baseUrl}/api/v1/chat`;

  return axios.post(finalURL, payload);
};
