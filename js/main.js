'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Отдыхали как могли!', 'Отдыхать - не работать)))', 'Новый опыт, новые ощущения', 'Это просто праздник!)', 'Приключения - наше все!!', 'Всё отлично!', 'Just VAU!!!', 'Отдых - он такой)'];
var NAMES = ['Иван', 'Антон', 'Мария', 'Ксюша', 'Виктор', 'Юлия', 'Лолита', 'Вахтанг'];
var ARRAYLENGTH = 25; /* колличество элементов массива с описанием фотографии*/

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

  for (var i = 1; i <= ARRAYLENGTH; i++) {
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

