// закрыть модальное окно
function closeModalBlock() {
  document.querySelector(".overlay").classList.add("overlay__no");
  document.querySelector(".overlay").classList.remove("overlay__yes");
  document.querySelector(".score__question__art").classList.add("no__active");
  document.querySelector(".score__question__art").classList.remove("active");
}

// открыть модальное окно
function openModalBlock() {
  const curQuest = rounds[curRound].questions[curQuestion];
  let correctPicture = curQuest;
  if (curTypeGame !== "artists") {
    correctPicture = curQuest.picture;
  }
  document.querySelector(
    ".score__question__art-img"
  ).src = `./assets/img/${correctPicture.imageNum}.jpg`;
  document.querySelector(".score__question__art-name").innerHTML =
    correctPicture.name;
  document.querySelector(".score__question__art-author").innerHTML =
    correctPicture.author;
  document.querySelector(".score__question__art-year").innerHTML =
    correctPicture.year;

  if (curQuest.score) {
    document.querySelector(".score__question__art-score").src =
      "./assets/svg/green_score.png";
  } else {
    document.querySelector(".score__question__art-score").src =
      "./assets/svg/red_score.png";
  }

  // если это последний вопрос в данной категории
  if (curQuestion === 9) {
    document.querySelector(".next__btn").innerHTML = "Результат";
  } else {
    document.querySelector(".next__btn").innerHTML = "Следующий";
  }

  document.querySelector(".overlay").classList.add("overlay__yes");
  document.querySelector(".overlay").classList.remove("overlay__no");
  document.querySelector(".score__question__art").classList.add("active");
  document
    .querySelector(".score__question__art")
    .classList.remove("no__active");
}

// перейти на страницу категорий
document
  .querySelector(".categories__btn")
  .addEventListener("click", goToCategories);

function goToCategories() {
  setScoreCategories();
  closeModalBlock();
  changePage(".question__art", ".categories");
}

// следующий вопрос / или посмотреть результат
document.querySelector(".next__btn").addEventListener("click", (e) => {
  // результат
  if (curQuestion === 9) {
    showResult();
  } else {
    // следующий вопрос
    curQuestion += 1;
    if (curQuestion === 10) {
      curQuestion = 0;
      curRound += 1;
      playSound(2);
      goToCategories();
    }
    askNewQuestion();
    closeModalBlock();
    document.querySelector(".question__art").classList.remove("no__active");
    document.querySelector(".question__art").classList.add("active");
  }
});

// вывести результат
function showResult() {
  playSound(3);
  changePage(".score__question__art", ".сongratulations");

  const sum = rounds[curRound].questions.reduce(
    (prev, curr) => prev + curr.score,
    0
  );
  document.querySelector(".сongratulations__title").innerHTML = `${sum} / 10`;
  let message = "";
  if (sum >= 8) {
    message = "Поздравляем!";
  } else if (sum >= 5) {
    message = "Хороший результат!";
  } else {
    message = "Попробуйте еще раз!";
  }
  document.querySelector(".сongratulations__message").innerHTML = message;

  document
    .querySelector(".сongratulations__btn")
    .addEventListener("click", (e) => {
      document.querySelector(".question__art").classList.add("no__active");
      document.querySelector(".question__art").classList.remove("active");
      document.querySelector(".overlay").classList.add("overlay__no");
      document.querySelector(".overlay").classList.remove("overlay__yes");
      setScoreCategories();
      changePage(".сongratulations", ".categories");
    });
}
