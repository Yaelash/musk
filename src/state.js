import { atom } from 'recoil';

export const tweetsState = atom({
  key: 'tweetsData',
  default: [],
});
export const isDarkModeState = atom({
  key: 'isDarkMode',
  default: true,
});
