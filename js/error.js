'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var error = function (message) {
    window.errorNode = errorTemplate.cloneNode(true);
    errorNode.querySelector('.error__title').innerHTML = 'Ошибка соединения с сервером <br>' + message;
    main.appendChild(errorNode);
  };

  window.error = {
    onError: error
  };
})();
