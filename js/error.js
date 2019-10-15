'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var error = function (message) {
    var errorNode = errorTemplate.cloneNode(true);
    var errorButtons = errorNode.querySelectorAll('.error__button');
    errorNode.querySelector('.error__title').innerHTML = 'Ошибка соединения с сервером <br>' + message;
    main.appendChild(errorNode);

    var tryAgainButton = errorButtons[0];
    window.util.hideElement(errorButtons[1]);
    tryAgainButton.addEventListener('click', function () {
      window.timeout *= 10;
      // не придумала, как вызвать функцию загрузки из модуля load и не зациклить все
    });
  };

  window.error = {
    onError: error
  };
})();
