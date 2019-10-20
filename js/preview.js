'use strict';

// модуль для отрисовки увеличенного изображения

(function () {
  var previewPhoto = document.querySelector('.big-picture');
  var bigPicture = previewPhoto.querySelector('img');
  var likesCount = previewPhoto.querySelector('.likes-count');
  var photoDescription = previewPhoto.querySelector('.social__caption');
  var commentsCount = previewPhoto.querySelector('.comments-count');
  var photoCommentsList = previewPhoto.querySelector('.social__comments');

  function createCommentsElement(photo) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photo.comments.length; i++) {
      var commentElement = document.querySelector('.social__comment').cloneNode(true);
      var commentAvatar = commentElement.querySelector('.social__picture');
      var commentText = commentElement.querySelector('.social__text');
      commentAvatar.src = photo.comments[i].avatar;
      commentAvatar.alt = photo.comments[i].name;
      commentText.textContent = photo.comments[i].message;
      fragment.appendChild(commentElement);
    }
    return fragment;
  }

  function renderComments(photo) {
    var fragment = createCommentsElement(photo);
    photoCommentsList.innerHTML = '';
    photoCommentsList.appendChild(fragment);
  }

  var renderBigPicture = function (photo) {
    bigPicture.src = photo.url;
    bigPicture.alt = photo.description;
    photoDescription.textContent = photo.description;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;

    renderComments(photo);
    window.util.showElement(previewPhoto);
  };

  window.preview = {
    bigPhoto: renderBigPicture
  };

})();

