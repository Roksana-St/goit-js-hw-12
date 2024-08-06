import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  const markup = images.map(image => {
    return `
      
        <a href="${image.largeImageURL}">

        <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />

        <div class="info">
          <p class="info-item">
            Likes <span>${image.likes}</span>
          </p>
          <p class="info-item">
            Views <span>${image.views}</span>
          </p>
          <p class="info-item">
            Comments<span>${image.comments}</span>
          </p>
          <p class="info-item">
            Downloads <span>${image.downloads}</span>
          </p>
        </div>
      </div>
    </a>`;
  }).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

    const lightbox = new SimpleLightbox('.gallery a', {captions: true,
        captionsDelay: 250});
    lightbox.refresh();
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}