
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const input = form.querySelector('input[name="query"]');
  const loader = document.querySelector('.loader');
  const loadMoreBtn = document.querySelector('.load');

  let currentPage = 1;
  let currentQuery = '';
  let totalHits = 0;
  let lightbox = null;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    currentQuery = input.value.trim();
    currentPage = 1;

    if (!currentQuery) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search query!',
      });
      return;
    }

    clearGallery();
    loader.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    try {
      const data = await fetchImages(currentQuery, currentPage);
      loader.style.display = 'none';
      totalHits = data.totalHits;

      if (data.hits.length === 0) {
        iziToast.error({
            title: 'Error',
            position: 'topRight',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        renderImages(data.hits);
        loadMoreBtn.style.display = 'block';

        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery a', {});
        }

        if (currentPage * 15 >= totalHits) {
          loadMoreBtn.style.display = 'none';
          iziToast.info({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results.",
          });
        }
      }
    } catch (error) {
      loader.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      input.value = '';
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    loader.style.display = 'block';

    try {
      const data = await fetchImages(currentQuery, currentPage);
      loader.style.display = 'none';

      if (data.hits.length > 0) {
        renderImages(data.hits);
        lightbox.refresh();

        
        const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

        if (currentPage * 15 >= totalHits) {
          loadMoreBtn.style.display = 'none';
          iziToast.info({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results.",
          });
        }
      }
    } catch (error) {
      loader.style.display = 'none';
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    }
  });
});
