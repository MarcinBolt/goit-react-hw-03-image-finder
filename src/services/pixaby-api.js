import axios from 'axios';

const baseURL = 'https://pixabay.com/api/?';
const API_KEY = '34547606-bcadd44fa8c62bb8814ebb3cc';
const perPage = 12;

const getImagesBySearchingPhrases = async (query, page) => {
  const searchParams = new URLSearchParams({
    key: `${API_KEY}`,
    q: `${query}`,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: `${perPage}`,
    page: `${page}`,
  });

  const response = await axios.get(`${baseURL}${searchParams}`);

  return { images: response.data.hits, totalHits: response.data.totalHits };
};

const pixaby = { getImagesBySearchingPhrases };
export default pixaby;
