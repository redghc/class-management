import ky from 'ky';

import { BASE_URI } from '@/providers/helpers/envs';

export const ClassAPI = ky.create({
  prefixUrl: BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});
