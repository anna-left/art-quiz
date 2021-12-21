// const images = [];
let curTypeGame = "";
let curRound = 0;
let curQuestion = 0;
let rounds = [];
let playForTime = false;
let curDuration = 5;
let audio;
let curVolume = 0.1;
let interval;
let images = [];
const passedRounds = [];

const main = document.querySelector(".main");
const categories = document.querySelector(".categories");

// перемешивание массива
function shuffle(arr) {
  let j;
  let temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// рандомное значение
function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// смена страницы
function changePage(oldPage, newPage) {
  if (interval) {
    clearInterval(interval);
  }
  document.querySelector(oldPage).classList.remove("active");
  document.querySelector(oldPage).classList.add("no__active");

  document.querySelector(newPage).classList.remove("no__active");
  document.querySelector(newPage).classList.add("active");
}
