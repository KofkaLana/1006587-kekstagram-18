'use strict';

// Редактирование размера изображения

(function () {
  var uploadElement = document.querySelector('.img-upload');
  var editablePhoto = uploadElement.querySelector('img');
  var scaleValue = uploadElement.querySelector('.scale__control--value');
  var btnSmaller = uploadElement.querySelector('.scale__control--smaller');
  var btnBigger = uploadElement.querySelector('.scale__control--bigger');
  var SCALE_STEP = 25;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;

  var setScalePhoto = function (value) {
    var currentScale = parseInt(scaleValue.value, 10);
    currentScale += SCALE_STEP * value;
    if (currentScale >= SCALE_MIN && currentScale <= SCALE_MAX) {
      scaleValue.value = currentScale + '%';
      editablePhoto.style.transform = 'scale(' + currentScale / 100 + ')';
    }

    return currentScale;
  };

  btnSmaller.addEventListener('click', function () {
    setScalePhoto(-1);
  });

  btnBigger.addEventListener('click', function () {
    setScalePhoto(1);
  });
})();
