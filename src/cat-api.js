// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_po7OnoitBJ3FjjKgvIFZpQWsUiyNmCzk8Hx5uHPoMEQ8BZixPjGj0AJ3EZSrTbd5';

const API_KEY =
  'live_v0L9DqdKskGuxYZ5wD2TI8jH2PdtxGXqzFkHgiaJkOxbGJ20bWF6aQ8bBt8QFR2n';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT_BREEDS = 'breeds';
const END_POINT_IMG = 'images/search';

export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT_BREEDS}?api_key=${API_KEY}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}


export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}${END_POINT_IMG}?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}













  
// const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
// const urlCat = 'https://api.thecatapi.com/v1/images';

// function fetchBreeds() {
//   return fetch(`${urlBreeds}?api_key=${API_KEY}`)
//     .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// };

// function fetchCatByBreed(breedId) {
//   return fetch(`${urlCat}/${breedId}?api_key=${API_KEY}`)
//     .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//       }
//       return response.json();
//   });
// };
// export { fetchBreeds, fetchCatByBreed };



