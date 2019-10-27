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

  var getPopularPhotos = function () {
    return window.data.get();
  };

  var getRandomPhotos = function () {
    var PHOTOS_RANDOM_COUNT = 10;

    var photosArray = [];
    var totalNumbers = window.data.get().length;
    var arrayTotalNumbers = [];
    var arrayRandomNumbers = [];
    var tempRandomNumber;
    while (totalNumbers--) {
      arrayTotalNumbers.push(totalNumbers);
    }
    while (arrayTotalNumbers.length) {
      tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
      arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
      arrayTotalNumbers.splice(tempRandomNumber, 1);
    }
    var num = arrayRandomNumbers.slice(0, PHOTOS_RANDOM_COUNT);
    for (var i = 0; i < num.length; i++) {
      var index = num[i];
      photosArray.push(window.data.get()[index]);
    }
    return photosArray;
  };

  var getDiscussPhotos = function () {
    var tempArray = window.data.get().slice();
    tempArray.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      } else if (a.comments.length > b.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    return tempArray;
  };

  window.filters = {
    remove: removePhotos,
    popularPhotos: getPopularPhotos,
    randomPhotos: getRandomPhotos,
    discussPhotos: getDiscussPhotos
  };
})();
