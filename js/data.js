'use strict';

// модуль для хранения загруженных данных

(function () {
  var photosData = [];
  var SaveData = function (data) {
    photosData = data;
  };

  var getPopularPhotos = function () {
    return photosData;
  };

  var getRandomPhotos = function () {
    var PHOTOS_RANDOM_COUNT = 10;

    var photosArray = [];
    var totalNumbers = photosData.length;
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
      photosArray.push(photosData[index]);
    }
    return photosArray;
  };

  var getDiscussPhotos = function () {
    var tempArray = photosData.slice();
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

  window.data = {
    get: function () {
      return photosData;
    },
    save: SaveData,
    popularPhotos: getPopularPhotos,
    randomPhotos: getRandomPhotos,
    discussPhotos: getDiscussPhotos
  };
})();
