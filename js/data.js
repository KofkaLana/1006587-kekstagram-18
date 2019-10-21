'use strict';

// модуль для хранения загруженных данных

(function () {
  var getData = function (data) {
    window.photos = data;
  };

  window.data = {
    dataArray: getData
  };
})();
