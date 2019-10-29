'use strict';

// модуль для работы фильтров

(function () {
  var photosListElement = document.querySelector('.pictures');

  var removePhotos = function () {
    var pictureElements = photosListElement.querySelectorAll('.picture');

    for (var i = 0; i < pictureElements.length; i++) {
      pictureElements[i].remove();
    }
  };

  var fillterButtons = document.querySelector('.img-filters');
  var Filters = {
    'filter-popular': window.data.popularPhotos,
    'filter-random': window.data.randomPhotos,
    'filter-discussed': window.data.discussPhotos
  };

  fillterButtons.addEventListener('click', function (evt) {

    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    var activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    var showPhotos = window.debounce(function () {
      removePhotos();
      window.gallery.render(Filters[evt.target.id]());
    });

    showPhotos();
  });
})();
