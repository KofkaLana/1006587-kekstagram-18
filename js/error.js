'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  window.main = document.querySelector('main');

  var error = function (message) {
    window.errorNode = errorTemplate.cloneNode(true);
    window.errorNode.querySelector('.error__title').innerHTML = 'Ошибка соединения с сервером <br>' + message;
    window.main.appendChild(window.errorNode);
  };

  window.error = {
    onError: error
  };
})();
