'use strict';

// модуль, собирающий все вместе

(function () {
  var onSuccess = function (data) {
    window.data.save(data);
    window.gallery.render(window.data.get());

    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var onError = function (message) {
    window.error.onError(message);
    var main = document.querySelector('main');
    var errorButtons = main.querySelectorAll('.error__button');
    var tryAgainButton = errorButtons[0];
    window.util.hideElement(errorButtons[1]);
    tryAgainButton.addEventListener('click', function () {
      window.errorNode.remove();
      window.TIMEOUT *= 10;
      window.load.loadData(onSuccess, onError);
    });
  };

  window.load.loadData(onSuccess, onError);

  var fillterButtons = document.querySelector('.img-filters');
  var Filters = {
    'filter-popular': window.filters.popularPhotos,
    'filter-random': window.filters.randomPhotos,
    'filter-discussed': window.filters.discussPhotos
  };

  fillterButtons.addEventListener('click', function (evt) {

    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    var activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');

    var showPhotos = window.debounce(function () {
      window.filters.remove();
      window.gallery.render(Filters[evt.target.id]());
    });

    showPhotos();
  });
})();
