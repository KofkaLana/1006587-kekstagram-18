'use strict';

// модуль, собирающий все вместе

(function () {
  var onSuccess = function (data) {
    window.data.save(data);
    window.gallery.render(window.data.get());

    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var onError = function (message) {
    window.error.onError(message);
    var errorButtons = window.main.querySelectorAll('.error__button');
    var tryAgainButton = errorButtons[0];
    window.util.hideElement(errorButtons[1]);
    tryAgainButton.addEventListener('click', function () {
      window.errorNode.remove();
      window.TIMEOUT *= 10;
      window.load.loadData(onSuccess, onError);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.escKeydown) {
        window.errorNode.remove();
      }
    });
  };

  window.load.loadData(onSuccess, onError);
})();
