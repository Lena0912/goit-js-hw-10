import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_v0L9DqdKskGuxYZ5wD2TI8jH2PdtxGXqzFkHgiaJkOxbGJ20bWF6aQ8bBt8QFR2n';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
catInfo.classList.add('is-hidden');
breedSelect.addEventListener('change', createMarkup);
function updateSelect() {
  fetchBreeds()
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      let markSelect = data.map(({ name, id }) => {
        return `<option value= '${id}'>${name}</option>`;
      });
      breedSelect.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select: breedSelect,
      });
    })
    .catch(error => {
      onError(error);
    });
}
updateSelect();
function createMarkup(evt) {
  loader.classList.replace('is-hidden', 'loader');
  breedSelect.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');
  const breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      breedSelect.classList.remove('is-hidden');
      const { url, breeds } = data[0];
      catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
      <div class="box"><h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      onError(error);
    });
}
function onError(error) {
  breedSelect.classList.remove('hide-error');
  loader.classList.replace('loader', 'hide-error');
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!'
  );
  console.error(error);
}
