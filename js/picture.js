'use strict';

// модуль для отрисовки миниатюры

(function () {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    var image = photoElement.querySelector('img');

    image.src = photo.url;
    image.alt = photo.description;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    return photoElement;
  };

  window.picture = {
    photo: renderPhoto
  };

})();
