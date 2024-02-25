import { BASE_URL, MODE } from '../environment';

export const getImage = (image) => {
  if (MODE === 'development') {
    return `${BASE_URL}/static${image}`;
  }
  return image;
};
