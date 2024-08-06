import axios from 'axios';

const API_KEY = "45130160-d43b37f420c01d8101f282345";
const BASE_URL = "https://pixabay.com/api/";



export async function fetchImages(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page: page,
    },
  });
  return response.data;
}

