'use strict';

(function () {
  var LAOD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  window.TIMEOUT = 3000;
  var ERROR_STATUS = 200;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === ERROR_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.TIMEOUT;

    xhr.open('GET', LAOD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.TIMEOUT;

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.load = {
    loadData: load,
    uploadData: upload
  };
})();
