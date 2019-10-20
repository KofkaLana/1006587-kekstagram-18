'use strict';

// модуль, который работает с галереей изображений;

(function () {
  var photosListElement = document.querySelector('.pictures');

  // отрисовка галереи

  var renderPhotos = function (photosList) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosList.length; i++) {
      fragment.appendChild(window.picture.photo(photosList[i]));
    }
    photosListElement.appendChild(fragment);

    return photosListElement;
  };

  var onSuccess = function (data) {
    renderPhotos(data);
  };

  var onError = function (message) {
    window.error.onError(message);
  };

  window.load.loadPhotos(onSuccess, onError);

  // работа с превью
  var previewPhoto = document.querySelector('.big-picture');
  var btnClosePreview = previewPhoto.querySelector('.cancel');

  // прячем блоки счетчика комментариеа и загрузки новых комментариев
  window.util.hideElement(previewPhoto.querySelector('.social__comment-count'));
  window.util.hideElement(previewPhoto.querySelector('.comments-loader'));

  btnClosePreview.addEventListener('click', function () {
    window.util.hideElement(previewPhoto);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.escKeydown) {
      window.util.hideElement(previewPhoto);
    }
  });
})();
