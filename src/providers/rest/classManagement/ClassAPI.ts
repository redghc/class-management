import axios from 'axios';

import { BASE_URI } from '@/providers/constants/envs';

export const ClassAPI = axios.create({
  baseURL: BASE_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});
