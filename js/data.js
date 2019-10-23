'use strict';

// модуль для хранения загруженных данных

(function () {
  var photosData = [];
  var SaveData = function (data) {
    photosData = data;
  };

  window.data = {
    photos: photosData,
    save: SaveData
  };
})();
