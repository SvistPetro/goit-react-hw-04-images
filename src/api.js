import axios from 'axios';

const KEY = '38811526-651373b29693b9dc0a21ebd76';
const pageLimit = 12;
axios.defaults.baseURL = 'https://pixabay.com/api/';


export const requestImages = async (query, page) => {
  const { data } = await axios({
    params: {
      key: KEY,
      q: query,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: pageLimit,
    },
  });
  return data;
};