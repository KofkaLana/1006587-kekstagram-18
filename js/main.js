'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Отдыхали как могли!', 'Отдыхать - не работать)))', 'Новый опыт, новые ощущения', 'Это просто праздник!)', 'Приключения - наше все!!', 'Всё отлично!', 'Just VAU!!!', 'Отдых - он такой)'];
var NAMES = ['Иван', 'Антон', 'Мария', 'Ксюша', 'Виктор', 'Юлия', 'Лолита', 'Вахтанг'];
var ARRAY_LENGTH = 25; /* колличество элементов массива с описанием фотографии*/

// генерация случайного целого числа

var getRandomIntegerInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// генерация случайного комментария

var getRandomComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomIntegerInRange(1, 6) + '.svg',
    message: COMMENTS[getRandomIntegerInRange(0, (COMMENTS.length - 1))],
    name: NAMES[getRandomIntegerInRange(0, (NAMES.length - 1))]
  };
};

// генерация массива случайных комментариев

var getCommentsRandomList = function () {
  var randomCommentsQuantity = getRandomIntegerInRange(1, 5);
  var commentsList = [];

  for (var i = 0; i < randomCommentsQuantity; i++) {
    commentsList.push(getRandomComment());
  }

  return commentsList;
};

// генерация объекта с описанием фотографии

var getPhotoDescription = function (i) {
  return {
    url: 'photos/' + i + '.jpg',
    description: DESCRIPTIONS[getRandomIntegerInRange(0, (DESCRIPTIONS.length - 1))],
    likes: getRandomIntegerInRange(15, 200),
    comments: getCommentsRandomList(getRandomComment())
  };
};

// получение массива объектов

var getPhotosArray = function () {
  var photosArray = [];

  for (var i = 1; i <= ARRAY_LENGTH; i++) {
    photosArray.push(getPhotoDescription(i));
  }

  return photosArray;
};

var photosArray = getPhotosArray();

// создание DOM-элемента

var photosListElement = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  var image = photoElement.querySelector('img');

  image.src = photo.url;
  image.alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};

// заполнение блока DOM-элементами на основе массива объектов

var renderPhotos = function (photosList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photosList.length; i++) {
    fragment.appendChild(renderPhoto(photosList[i]));
  }
  photosListElement.appendChild(fragment);

  return photosListElement;
};

renderPhotos(photosArray);

// просмотр фотографий в полноразмерном режиме

var previewPhoto = document.querySelector('.big-picture');

var showElement = function (element) {
  element.classList.remove('hidden');
};

var closeElement = function (element) {
  element.classList.add('hidden');
};

// showElement(previewPhoto);
closeElement(previewPhoto.querySelector('.social__comment-count'));
closeElement(previewPhoto.querySelector('.comments-loader'));

var bigPicture = previewPhoto.querySelector('img');
var likesCount = previewPhoto.querySelector('.likes-count');
var photoDescription = previewPhoto.querySelector('.social__caption');
var commentsCount = previewPhoto.querySelector('.comments-count');
var picture = photosArray[0];

var renderBigPicture = function (photo) {
  bigPicture.src = photo.url;
  bigPicture.alt = photo.description;
  photoDescription.textContent = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
};

renderBigPicture(picture);

function createCommentsElement(photo) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photo.comments.length; i++) {
    var commentElement = document.querySelector('.social__comment').cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');
    commentAvatar.src = photo.comments[i].avatar;
    commentAvatar.alt = photo.comments[i].name;
    commentText.textContent = photo.comments[i].message;
    fragment.appendChild(commentElement);
  }
  return fragment;
}

var photoCommentsList = previewPhoto.querySelector('.social__comments');

function renderComments(photo) {
  var fragment = createCommentsElement(photo);
  photoCommentsList.innerHTML = '';
  photoCommentsList.appendChild(fragment);
}

renderComments(picture);

// задание 4

var ESCAPE_KEYCODE = 27;
var btnClosePreview = previewPhoto.querySelector('.cancel');

btnClosePreview.addEventListener('click', function () {
  closeElement(previewPhoto);
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    closeElement(previewPhoto);
  }
});

var uploadElement = document.querySelector('.img-upload');
var uploadFileInput = uploadElement.querySelector('#upload-file');
var imageEditingForm = uploadElement.querySelector('.img-upload__overlay');
var btnCloseEditionForm = uploadElement.querySelector('.cancel');

uploadFileInput.addEventListener('change', function () {
  showElement(imageEditingForm);
  closeElement(effectLevel);
});

btnCloseEditionForm.addEventListener('click', function () {
  closeElement(imageEditingForm);
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESCAPE_KEYCODE) {
    closeElement(imageEditingForm);
  }
});

// Редактирование размера изображения

var btnSmaller = uploadElement.querySelector('.scale__control--smaller');
var btnBigger = uploadElement.querySelector('.scale__control--bigger');
var editablePhoto = uploadElement.querySelector('img');
var scaleValue = uploadElement.querySelector('.scale__control--value');
var SCALE_STEP = 25;
var SCALE_DEFAULT = 100;
var SCALE_MIN = 25;
var SCALE_MAX = 100;

scaleValue.value = SCALE_DEFAULT + '%';

var setScalePhoto = function (value) {
  var currentScale = parseInt(scaleValue.value, 10);
  if (currentScale >= SCALE_MIN && currentScale <= SCALE_MAX) {
    currentScale += SCALE_STEP * value;
    scaleValue.value = currentScale + '%';
    editablePhoto.style.transform = 'scale(' + currentScale / 100 + ')';
  }

  return currentScale;
};

btnSmaller.addEventListener('click', function () {
  if (scaleValue.value === SCALE_MIN + '%') {
    alert('недопустимое значение');
  } else {
    setScalePhoto(-1);
  }
});

btnBigger.addEventListener('click', function () {
  if (scaleValue.value === SCALE_MAX + '%') {
    alert('недопустимое значение');
  } else {
    setScalePhoto(1);
  }
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

  if (currentEffectName === DEFAULT_EFFECT) {
    closeElement(effectLevel);
    editablePhoto.style.filter = '';
  } else {
    showElement(effectLevel);
  }
};

var setPinPosition = function (value) {
  effectDepth.style.width = value + '%';
  effectPinElement.style.left = value + '%';
  effectLevelValue.value = Math.round(value);
  applyEffect(value);
};

var applyEffect = function (value) {
  if (currentEffectName === DEFAULT_EFFECT) {
    editablePhoto.style.filter = '';
  } else {
    editablePhoto.style.filter = EffectParameter[currentEffectName].PROPERTY + '(' + getSaturationLevel(currentEffectName, value) + ')';
  }
};

// определения уровня насыщенности эффекта = положения пина слайдера

var getSaturationLevel = function (effect, value) {
  return (EffectParameter[effect].MAX_VALUE - EffectParameter[effect].MIN_VALUE) / MAX_EFFECT_LEVEL * value + EffectParameter[effect].UNIT;
};

effectsList.addEventListener('click', onImageEffectClick);

effectPinElement.addEventListener('mouseup', function () {
  setPinPosition(effectLevelValue.value);
  console.log('цапнули мышку');
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
      if (hashtagsList[i] === currentHashtag) {
        return true;
      }
    }
  }
  return false;
};

var validityHashtags = function () {
  var errorMessage = '';
  var hashtagsArray = hashtags.value.toLowerCase().split(' ');

  if (hashtags.value === '') {
    return;
  }

  hashtagsArray.forEach(function (hashtagItem) {
    if (hashtagItem.indexOf(HASH_SYMBOL, 1) > 1) {
      errorMessage = 'Хэш-теги должны разделяться пробелами';
    } else if (hashtagItem.charAt(0) !== HASH_SYMBOL) {
      errorMessage = 'Хэштег должен начинаться с символа #';
    } else if (hashtagItem.charAt(0) === HASH_SYMBOL && hashtagItem.length === 1) {
      errorMessage = 'Хеш-тег не может состоять только из одного символа #';
    } else if (hashtags.length > HASHTAGS_AMOUNT) {
      errorMessage = 'Допустимое количество хэштегов не более 5';
    } else if (hashtagItem.length > HASHTAG_LENGTH) {
      errorMessage = 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    } else if (checkRepeatHashtags(hashtagsArray)) {
      errorMessage = 'Хэштеги не должны повторяться';
    } else {
      hashtags.setCustomValidity('');
    }
  });

  hashtags.setCustomValidity(errorMessage);
};

// hashtags.addEventListener('input', validityHashtags());

btnSubmitForm.addEventListener('click', validityHashtags);
