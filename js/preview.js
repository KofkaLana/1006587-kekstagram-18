'use strict';

// модуль для отрисовки увеличенного изображения

(function () {
  var previewPhoto = document.querySelector('.big-picture');
  var bigPicture = previewPhoto.querySelector('img');
  var likesCount = previewPhoto.querySelector('.likes-count');
  var photoDescription = previewPhoto.querySelector('.social__caption');
  var commentsCount = previewPhoto.querySelector('.comments-count');
  var photoCommentsList = previewPhoto.querySelector('.social__comments');
  var commentsLoaderButton = previewPhoto.querySelector('.comments-loader');
  var commentsOnDisplayCount = previewPhoto.querySelector('.comments__display');

  var COMMENTS_START = 5;
  var COMMENTS_STEP = 5;

  var createCommentsElement = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var commentElement = document.querySelector('.social__comment').cloneNode(true);
      var commentAvatar = commentElement.querySelector('.social__picture');
      var commentText = commentElement.querySelector('.social__text');
      commentAvatar.src = comments[i].avatar;
      commentAvatar.alt = comments[i].name;
      commentText.textContent = comments[i].message;
      fragment.appendChild(commentElement);
    }
    return fragment;
  };

  var renderComments = function (comments) {
    var fragment = createCommentsElement(comments);
    photoCommentsList.innerHTML = '';
    photoCommentsList.appendChild(fragment);
  };

  var showComments = function (comments) {
    var displayComments = [];
    if (comments.length < COMMENTS_START) {
      commentsOnDisplayCount.textContent = comments.length;
      window.util.hideElement(commentsLoaderButton);
      displayComments = comments.slice();
    }
    if (comments.length >= COMMENTS_START) {
      commentsOnDisplayCount.textContent = COMMENTS_START;
      displayComments = comments.slice(0, COMMENTS_START);
      window.util.showElement(commentsLoaderButton);

      commentsLoaderButton.addEventListener('click', function () {
        var currentCommentsCount = previewPhoto.querySelectorAll('.social__comment').length;
        var newCount = currentCommentsCount + COMMENTS_STEP;
        if (newCount >= comments.length) {
          newCount = comments.length;
          displayComments = comments.slice();
          window.util.hideElement(commentsLoaderButton);
        } else {
          displayComments = comments.slice(0, newCount);
        }
        commentsOnDisplayCount.textContent = newCount;
        renderComments(displayComments);
      });
    }
    renderComments(displayComments);
  };

  var renderBigPicture = function (photo) {
    bigPicture.src = photo.url;
    bigPicture.alt = photo.description;
    photoDescription.textContent = photo.description;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;

    showComments(photo.comments);
    window.util.showElement(previewPhoto);
  };

  window.preview = {
    bigPhoto: renderBigPicture
  };

})();

