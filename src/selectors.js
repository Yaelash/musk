import { selector } from 'recoil';
import axios from 'axios';
import { extractTweets, options } from './utils';

export const fetchDataSelector = selector({
  key: 'fetchData',
  get: async ({ get }) => {
    try {
      const response = await axios.request(options);
      const { data } = response
      return extractTweets(data)

    } catch (error) {
      console.error(error);
      return [];
    }
  },
});