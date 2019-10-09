'use strict';

// модуль, который работает с формой редактирования изображения

(function () {

  // Загрузка изображения и показ формы редактирования

  var uploadElement = document.querySelector('.img-upload');
  var uploadFileInput = uploadElement.querySelector('#upload-file');
  var imageEditingForm = uploadElement.querySelector('.img-upload__overlay');
  var editablePhoto = uploadElement.querySelector('img');
  var btnCloseEditionForm = uploadElement.querySelector('.cancel');

  var scaleValue = uploadElement.querySelector('.scale__control--value');
  var SCALE_DEFAULT = 100;

  var setDefaultSettings = function () {
    scaleValue.value = SCALE_DEFAULT + '%';
    editablePhoto.style.transform = 'scale(' + SCALE_DEFAULT / 100 + ')';
    editablePhoto.classList = '';
    editablePhoto.style.filter = '';
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, closeWindow);
  };

  var closeWindow = function () {
    window.util.hideElement(imageEditingForm);
    uploadFileInput.value = '';
    document.removeEventListener('keydown', onEscPress);
  };

  var openWindow = function () {
    window.util.showElement(imageEditingForm);
    document.addEventListener('keydown', onEscPress);
  };

  uploadFileInput.addEventListener('change', function () {
    openWindow();
    window.util.hideElement(effectLevel);
    setDefaultSettings();
  });

  btnCloseEditionForm.addEventListener('click', function () {
    closeWindow();
    hashtags.style.outline = '';
    descriptionElement.style.outline = '';
  });

  // Применение эффекта для изображения

  var DEFAULT_EFFECT = 'none';
  var DEFAULT_EFFECT_LEVEL = 100;
  var MAX_EFFECT_LEVEL = 100;
  var effectsList = uploadElement.querySelector('.effects__list');
  var effectPinElement = uploadElement.querySelector('.effect-level__pin');
  var effectDepth = uploadElement.querySelector('.effect-level__depth');
  var effectLevel = uploadElement.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');

  var EffectParameter = {
    chrome: {
      CLASS: 'effects__preview--chrome',
      PROPERTY: 'grayscale',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    sepia: {
      CLASS: 'effects__preview--sepia',
      PROPERTY: 'sepia',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    marvin: {
      CLASS: 'effects__preview--marvin',
      PROPERTY: 'invert',
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      UNIT: '%'
    },
    phobos: {
      CLASS: 'effects__preview--phobos',
      PROPERTY: 'blur',
      MIN_VALUE: 0,
      MAX_VALUE: 3,
      UNIT: 'px'
    },
    heat: {
      CLASS: 'effects__preview--heat',
      PROPERTY: 'brightness',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      UNIT: ''
    }
  };

  var currentEffectName;
  var onImageEffectClick = function (evt) {
    if (!evt.target.matches('input')) {
      return;
    }
    currentEffectName = evt.target.value;
    editablePhoto.classList = '';
    editablePhoto.classList.add('effects__preview--' + currentEffectName);
    setPinPosition(DEFAULT_EFFECT_LEVEL);
    applyEffect(DEFAULT_EFFECT_LEVEL);
  };

  var setPinPosition = function (value) {
    effectDepth.style.width = value + '%';
    effectPinElement.style.left = value + '%';
    effectLevelValue.value = Math.round(value);
  };

  var applyEffect = function (value) {
    if (currentEffectName === DEFAULT_EFFECT) {
      window.util.hideElement(effectLevel);
      editablePhoto.style.filter = '';
    } else {
      window.util.showElement(effectLevel);
      editablePhoto.style.filter = getEffect(value);
    }
    setPinPosition(value);
  };

  var getEffect = function (value) {
    return EffectParameter[currentEffectName].PROPERTY + '(' + getSaturationLevel(currentEffectName, value) + ')';
  };

  // определения уровня насыщенности эффекта = положения пина слайдера

  var getSaturationLevel = function (effect, value) {
    return (EffectParameter[effect].MAX_VALUE - EffectParameter[effect].MIN_VALUE) / MAX_EFFECT_LEVEL * value + EffectParameter[effect].UNIT;
  };

  effectsList.addEventListener('click', onImageEffectClick);

  effectPinElement.addEventListener('mouseup', function () {
    setPinPosition(effectLevelValue.value);
  });

  // Валидация хеш-тегов

  var HASH_SYMBOL = '#';
  var HASHTAGS_AMOUNT = 5;
  var HASHTAG_LENGTH = 20;

  var hashtags = uploadElement.querySelector('.text__hashtags');
  var btnSubmitForm = uploadElement.querySelector('.img-upload__submit');

  var checkRepeatHashtags = function (hashtagsList) {
    for (var i = 0; i < hashtagsList.length; i++) {
      var currentHashtag = hashtagsList[i];
      for (var j = 1; j < hashtagsList.length; j++) {
        if (hashtagsList[j] === currentHashtag && i !== j) {
          return true;
        }
      }
    }
    return false;
  };

  var validateHashtags = function () {
    var errorMessage = '';
    hashtags.style.outline = '';
    var hashtagsArray = hashtags.value.toLowerCase().replace(/[ ][ ]+/, ' ').split(' ');

    if (hashtags.value === '') {
      return;
    }
    if (hashtagsArray.length > HASHTAGS_AMOUNT) {
      errorMessage = 'Допустимое количество хэштегов не более ' + HASHTAGS_AMOUNT;
    }

    hashtagsArray.forEach(function (hashtagItem) {
      if (hashtagItem.indexOf(HASH_SYMBOL, 1) > 1) {
        errorMessage = 'Хэш-теги должны разделяться пробелами';
      } else if (hashtagItem.charAt(0) !== HASH_SYMBOL) {
        errorMessage = 'Хэштег должен начинаться с символа #';
      } else if (hashtagItem.charAt(0) === HASH_SYMBOL && hashtagItem.length === 1) {
        errorMessage = 'Хеш-тег не может состоять только из одного символа #';
      } else if (hashtagItem.length > HASHTAG_LENGTH) {
        errorMessage = 'Максимальная длина одного хэш-тега ' + HASHTAG_LENGTH + ' символов, включая решётку';
      } else if (checkRepeatHashtags(hashtagsArray)) {
        errorMessage = 'Хэштеги не должны повторяться';
      } else {
        hashtags.setCustomValidity('');
      }
    });

    hashtags.setCustomValidity(errorMessage);
  };

  var setHightlightOutline = function (field) {
    if (!field.validity.valid) {
      field.style.outline = '2px solid red';
    } else {
      field.style.outline = 'none';
    }
  };

  hashtags.addEventListener('input', validateHashtags);

  btnSubmitForm.addEventListener('click', function () {
    setHightlightOutline(hashtags);
    setHightlightOutline(descriptionElement);
  });

  hashtags.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onEscPress);
  });

  hashtags.addEventListener('focusout', function () {
    document.addEventListener('keydown', onEscPress);
  });

  // валидация комментариев

  var descriptionElement = uploadElement.querySelector('.text__description');
  var DESCRIPTION_LENGTH = 140;

  var validateComments = function () {
    var errorMessage = '';
    descriptionElement.style.outline = '';
    if (descriptionElement.value === '') {
      return;
    }

    if (descriptionElement.value.length > DESCRIPTION_LENGTH) {
      errorMessage = 'Длина комментария не может составлять больше 140 символов';
    }

    descriptionElement.setCustomValidity(errorMessage);
  };

  descriptionElement.addEventListener('input', validateComments);

  descriptionElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', onEscPress);
  });

  descriptionElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', onEscPress);
  });
})();
