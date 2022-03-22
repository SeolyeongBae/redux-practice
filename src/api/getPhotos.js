import axios from 'axios';

//json placeholder로부터 응답을 받아옴
export const getPhotos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
  return response.data;
};