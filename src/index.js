// import axios from 'axios';
// axios.defaults.headers.common['x-api-key'] =
//   'live_po7OnoitBJ3FjjKgvIFZpQWsUiyNmCzk8Hx5uHPoMEQ8BZixPjGj0AJ3EZSrTbd5';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix';

const ref = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
  catPic: document.querySelector('.cat-info-pict'),
  catDesc: document.querySelector('.cat-info-desc')
}
ref.select.addEventListener('change', onChangeSelect);
function renderSelect(breeds) {
  const markup = breeds
    .map(breed => {
      return `<option value= '${breed.reference_image_id}'>${breed.name}</option>`;
    })
    .join('');
  ref.select.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  })
};

(function fetchBreedsRender() {
  ref.loader.classList.remove('unvisible')
  fetchBreeds()
    .then(breeds => renderSelect(breeds))
    .catch(error => {
      console.log(error);
      Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      ref.loader.classList.add('unvisible');
      ref.select.classList.remove('unvisible');
    });
})();
function renderDesc(breed) {
  const picture = `<img class="cat-picture" scr="${breed.url}" alt="${breed.id}"`;
  const descript = `<h2 class="cat-info-desc-title">${breed.breeds[0].name}</h2>
  <p class="cat-info-desc-desc">${breed.breed[0].description}</p>
      <p class="cat-info-desc-temp">${breed.breeds[0].temerament}</p>`;
  ref.catPic.insertAdjacentHTML('beforeend', picture);
  ref.catDesc.insertAdjacentHTML('beforeend', descript);
};

function onChangeSelect(evt) {
  ref.loader.classList.remove('unvisible');
  ref.catPic.innerHTML = '';
  ref.catDesc.innerHTML = '';
  const breedId = evt.target.value;
  console.log('breedId: ', breedId);
  console.log('ref.catPic:', ref.catPic);
  console.log('ref.catDesc:', ref.catDesc);

  fetchCatByBreed(breedId)
    .then(breed => renderDesc(breed))
    .catch(error => {
      console.log(error);
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => ref.loader.classList.add('unvisible'));
}










// const url = `https://api.thecatapi.com/v1/images/search?limit=20`;
// const api_key =
//   'live_O9lGwjdl8IpSBv1d2UKjTVcgA09lTK5JBJ4EC2yr9pjM9p3ZPwGhnfuNwGgw9JbN';

// const breedSelect = document.getElementById('breed-select');

// // Визначення селекту для порід
// new SlimSelect({
//   select: '#selectElement',
// });

// // Відслідковування події change для селекту
// breedSelect.addEventListener('change', function () {
//   const selectedBreedId = breedSelect.value;

//   // Виклик функції для отримання даних про кота та відображення інформації
//   fetchCatByBreed(selectedBreedId)
//     .then(catData => {
//       displayCatInfo(catData);
//     });
// });

// const loader = document.querySelector('.loader');
// const catInfo = document.querySelector('.cat-info');

// // Функція для показу завантажувача та приховування інших елементів
// function showLoader() {
//   loader.classList.add('show');
//   breedSelect.classList.add('hidden');
//   catInfo.classList.add('hidden');
// }

// // Функція для приховування завантажувача та показу інших елементів
// function hideLoader() {
//   loader.classList.remove('show');
//   breedSelect.classList.remove('hidden');
//   catInfo.classList.remove('hidden');
// }

// // Приклад використання функцій при роботі з запитами
// showLoader(); // Показати завантажувач перед запитом

// // Після завершення запиту:
// hideLoader(); // Приховати завантажувач і показати інші елементи

// const error = document.querySelector('.error');

// // Функція для відображення помилки
// function showError() {
//   error.classList.add('show');
// }

// // Функція для приховування помилки
// function hideError() {
//   error.classList.remove('show');
// }

// function displayCatInfo(catData) {
//   const catInfoDiv = document.querySelector('.cat-info');
//   const catImage = document.createElement('img');
//   const catName = document.createElement('h2');
//   const catDescription = document.createElement('p');
//   const catTemperament = document.createElement('p');

//   catImage.src = catData[0].url;
//   catName.textContent = `Name: ${catData[0].breeds[0].name}`;
//   catDescription.textContent = `Description: ${catData[0].breeds[0].description}`;
//   catTemperament.textContent = `Temperament: ${catData[0].breeds[0].temperament}`;

//   catInfoDiv.innerHTML = '';
//   catInfoDiv.appendChild(catImage);
//   catInfoDiv.appendChild(catName);
//   catInfoDiv.appendChild(catDescription);
//   catInfoDiv.appendChild(catTemperament);
// }






