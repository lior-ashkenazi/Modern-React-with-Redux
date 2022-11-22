import axios from 'axios';

const searchImages = async () => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers:{
        Authorization: 'Client-ID QB1v26gHO0WmqSSz2mJhQAv78tmYHsR9iW4hkTc1F2s'
      },
      params: {
        query: 'cars'
      }
  })
    console.log(response);

    return response;
}

export default searchImages;