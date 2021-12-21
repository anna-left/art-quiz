let timeCounter;
const timerSec = document.querySelector(".timer-sec");

function stopQuestion(oldPage) {
  clearInterval(interval);
  rounds[curRound].questions[curQuestion].score = 0;
  playSound(4);
  curQuestion += 1;
  askNewQuestion();
}

function checkTime() {
  timeCounter -= 1;
  timerSec.innerHTML = timeCounter;
  if (timeCounter === 0) {
    stopQuestion();
  }
}

async function askNewQuestion(quest = "") {
  rounds[curRound].isStarted = true;
  const el = rounds[curRound].questions[curQuestion];

  const imgParent = document.querySelector(".question__art-picture");

  const promises = [];
  function onloadImg(src) {
    // создаем новый элемент
    const newImg = document.createElement("img");
    if (curTypeGame === "artists") {
      newImg.classList.add("question__art-img1");
    } else {
      newImg.classList.add("question__art-img4");
    }
    imgParent.appendChild(newImg);
    // загружаем изображение
    promises.push(
      new Promise((resolve, reject) => {
        newImg.onload = resolve;
        newImg.onerror = reject;
        newImg.src = src;
      })
    );
  }

  await Promise.all(promises);

  if (playForTime && curDuration) {
    timeCounter = Number(curDuration);
    timerSec.innerHTML = curDuration;

    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(checkTime, 1000);
  } else {
    timerSec.innerHTML = "";
  }
  if (quest !== "") {
    curQuestion = quest;
  }

  while (imgParent.firstChild) {
    imgParent.removeChild(imgParent.firstChild);
  }

  if (curTypeGame === "artists") {
    // художники - одно изображение
    document
      .querySelector(".question__art-picture")
      .classList.remove("question__art-picture4");
    // const src = `./assets/full/${rounds[curRound].questions[curQuestion].imageNum}full.jpg`;
    const src = `./assets/img/${rounds[curRound].questions[curQuestion].imageNum}.jpg`;
    onloadImg(src);
    document.querySelector(".question__art-title").innerHTML = `${
      curQuestion + 1
    }. Кто автор этой картины ?`;
  } else {
    // картины - четыре изображения
    const questionPicture = document.querySelector(".question__art-picture");
    const elContainer = document.querySelector(".question__art-container");
    const elSize =
      Math.min(elContainer.clientHeight, elContainer.clientWidth) * 0.98;
    questionPicture.style = `height: ${elSize}px; width: ${elSize}px;`;
    questionPicture.classList.add("question__art-picture4");
    for (let i = 0; i < 4; i++) {
      const src = `./assets/img/${rounds[curRound].questions[curQuestion].answers[i].imageNum}.jpg`;
      onloadImg(src);
    }

    document.querySelector(".question__art-title").innerHTML = `${
      curQuestion + 1
    }. Какую картину написал ${
      rounds[curRound].questions[curQuestion].artist
    } ?`;
  }
  // ответы
  const answers = document.querySelector(".question__art-answers");
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild);
  }
  for (let i = 0; i < el.answers.length; i += 1) {
    const answ = document.createElement("div");
    answ.classList.add("question__art-answ");
    answers.appendChild(answ);

    answ.style = "background-color: none";
    if (curTypeGame === "artists") {
      answ.innerHTML = el.answers[i];
      answ.classList.add("question__art-answ1");
    } else {
      answ.innerHTML = i + 1;
      answ.classList.add("question__art-answ4");
    }
    answ.addEventListener("click", (e) => {
      // анимация при выборе ответа (риппл-эффект)
      const button = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - (button.offsetLeft + radius)} px`;

      circle.style.top = `${e.clientY - (button.offsetTop + radius)} px`;
      circle.classList.add("circle");

      const ripple = button.getElementsByClassName("circle")[0];

      // проверка ответа
      let isCorrectAnswer = false;
      if (curTypeGame === "artists" && el.answers[i] === el.author) {
        isCorrectAnswer = true;
      } else if (
        curTypeGame === "pictures" &&
        el.answers[i].name === el.picture.name
      ) {
        isCorrectAnswer = true;
      }

      if (isCorrectAnswer) {
        answ.style = "background: rgba(0, 102, 53, 0.5); color: white;";
        rounds[curRound].questions[curQuestion].score = 1;
        playSound(1);
        circle.classList.add("circle-green");
      } else {
        answ.style = "background: rgba(201, 125, 144, 0.5); color: white;";
        rounds[curRound].questions[curQuestion].score = 0;
        playSound(0);
        circle.classList.add("circle-red");
      }
      if (ripple) {
        ripple.remove();
      }
      button.appendChild(circle);

      if (interval) {
        clearInterval(interval);
      }
      setTimeout(openModalBlock, 800);
    });
  }
}

document
  .querySelector(".question__categories__btn")
  .addEventListener("click", (e) => {
    setScoreCategories();
    changePage(".question__art", ".categories");
  });
