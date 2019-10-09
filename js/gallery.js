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

  renderPhotos(window.data.photosArray);

  var bigPhotos = document.querySelectorAll('.picture');
  var previewPhoto = document.querySelector('.big-picture');
  var btnClosePreview = previewPhoto.querySelector('.cancel');

  // прячем блоки счетчика комментариеа и загрузки новых комментариев
  window.util.hideElement(previewPhoto.querySelector('.social__comment-count'));
  window.util.hideElement(previewPhoto.querySelector('.comments-loader'));

  // открытие фото по клику по миниатюре

  var onPhotoClick = function (bigPhoto, photo) {
    bigPhoto.addEventListener('click', function () {
      window.preview.bigPhoto(photo);
      window.util.showElement(previewPhoto);
    });
  };

  for (var i = 0; i < bigPhotos.length; i++) {
    onPhotoClick(bigPhotos[i], window.data.photosArray[i]);
  }

  btnClosePreview.addEventListener('click', function () {
    window.util.hideElement(previewPhoto);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.escKeydown) {
      window.util.hideElement(previewPhoto);
    }
  });

  // var onEscPress = function (evt) {
  //   window.util.isEscEvent(evt, closeWindow);
  // };

  // var closeWindow = function () {
  //   window.util.hideElement(previewPhoto);
  //   document.removeEventListener('keydown', onEscPress);
  // };

  // var openWindow = function () {
  //   window.util.showElement(previewPhoto);
  //   document.addEventListener('keydown', onEscPress);
  // };

  // btnClosePreview.addEventListener('click', function () {
  //   window.util.closeWindow(previewPhoto);
  // });
})();
