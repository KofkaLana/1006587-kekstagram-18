'use strict';

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Отдыхали как могли!', 'Отдыхать - не работать)))', 'Новый опыт, новые ощущения', 'Это просто праздник!)', 'Приключения - наше все!!', 'Всё отлично!', 'Just VAU!!!', 'Отдых - он такой)'];
var NAMES = ['Иван', 'Антон', 'Мария', 'Ксюша', 'Виктор', 'Юлия', 'Лолита', 'Вахтанг'];

// генерация адресов картинок

function generateArrayRandomNumber(min, max) {
  var totalNumbers = max - min + 1;
  var arrayTotalNumbers = [];
  var arrayRandomNumbers = [];
  var tempRandomNumber;
  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }
  while (arrayTotalNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }
  return arrayRandomNumbers;
}

var N = generateArrayRandomNumber(1, 25);

// генерация случайного целого числа

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// генерация случайных данных

var getPhotoDescription = function (i) {
  var PhotoDescription = {
    url: 'photos/' + N[i] + '.jpg',
    description: DESCRIPTION[Math.floor((Math.random() * DESCRIPTION.length))],
    likes: getRandomInRange(15, 200),
    comments: {
      avatar: 'img/avatar-' + getRandomInRange(1, 6) + '.svg',
      message: COMMENTS[Math.floor((Math.random() * COMMENTS.length))],
      name: NAMES[Math.floor((Math.random() * NAMES.length))]
    }
  };

  return PhotoDescription;
};

// заполнение массива случайными данными

for (var i = 0; i < N.length; i++) {
  var photos = Array;
  photos[i] = getPhotoDescription(i);
}

// создание DOM-элемента

var photosList = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  var image = photoElement.querySelector('img');

  image.src = photo.url;
  image.alt = photo.description;
  photoElement.querySelector('.picture__comments').textContent = photo.comments;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < N.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}
photosList.appendChild(fragment);

