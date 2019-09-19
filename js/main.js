'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Отдыхали как могли!', 'Отдыхать - не работать)))', 'Новый опыт, новые ощущения', 'Это просто праздник!)', 'Приключения - наше все!!', 'Всё отлично!', 'Just VAU!!!', 'Отдых - он такой)'];
var NAMES = ['Иван', 'Антон', 'Мария', 'Ксюша', 'Виктор', 'Юлия', 'Лолита', 'Вахтанг'];

// генерация случайного целого числа

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// генерация случайного комментария

var getRandomComment = function () {
  var Comment = {
    avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
    message: COMMENTS[getRandomInRange(0, (COMMENTS.length - 1))],
    name: NAMES[getRandomInRange(0, (NAMES.length - 1))]
  };

  return Comment;
};

// генерация массива случайных комментариев

var getCommentsRandomList = function (comment) {
  var HowMuchComments = getRandomInRange(1, 5);
  var CommentsList = [];

  for (var i = 0; i < HowMuchComments; i++) {
    CommentsList.push(getRandomComment(comment));
  }

  return CommentsList;
};

// генерация объекта с описанием фотографии

var getPhotoDescription = function (i) {
  var PhotoDescription = {
    url: 'photos/' + (i + 1) + '.jpg',
    description: DESCRIPTION[getRandomInRange(0, (DESCRIPTION.length - 1))],
    likes: getRandomInRange(15, 200),
    comments: getCommentsRandomList(getRandomComment())
  };

  return PhotoDescription;
};

// создание DOM-элемента

var photosList = document.querySelector('.pictures');
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

var fragment = document.createDocumentFragment();

for (var i = 0; i < 25; i++) {
  fragment.appendChild(renderPhoto(getPhotoDescription(i)));
}
photosList.appendChild(fragment);

