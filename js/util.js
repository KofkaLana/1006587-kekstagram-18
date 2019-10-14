'use strict';

// служебный модуль

(function () {
  var ESCAPE_KEYCODE = 27;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESCAPE_KEYCODE) {
      action();
    }
  };

  var showElement = function (element) {
    element.classList.remove('hidden');
  };

  var hideElement = function (element) {
    element.classList.add('hidden');
  };

  window.util = {
    escKeydown: ESCAPE_KEYCODE,
    isEscEvent: isEscEvent,
    showElement: showElement,
    hideElement: hideElement
  };

})();
