async function buildResultPage() {
  const promises = [];
  // построить страницы результатов каждого раунда
  const slides = document.querySelectorAll(".carousel-item");
  const parentSlide = document.querySelector(".carousel-inner");

  const indicators = document.querySelectorAll(".carousel-indicator");
  const parentIndicators = document.querySelector(".carousel-indicators");

  for (let i = 1; i < rounds.length; i++) {
    // клонируем страницу
    const elCloneSlide = slides[0].cloneNode(true);
    if (elCloneSlide.classList.contains("active")) {
      elCloneSlide.classList.remove("active");
    }
    parentSlide.appendChild(elCloneSlide);

    // клонируем индикатор-буллет
    const elCloneIndicator = indicators[0].cloneNode(true);
    if (elCloneIndicator.classList.contains("active")) {
      elCloneIndicator.classList.remove("active");
    }
    elCloneIndicator.setAttribute("data-slide-to", i);
    parentIndicators.appendChild(elCloneIndicator);
  }

  slides[0].classList.add("active");
  indicators[0].classList.add("active");

  for (let i = 0; i < rounds.length; i++) {
    // клонируем на каждой странице карточки картин
    const resultPicture = document.querySelectorAll(".result__pictures")[i];
    const resultPict = resultPicture.querySelector(".result__pict");
    for (let j = 1; j < rounds[0].questions.length; j++) {
      const el_clone = resultPict.cloneNode(true);
      resultPicture.appendChild(el_clone);
    }

    // заполняем страницу текущего раунда
    for (let j = 0; j < rounds[0].questions.length; j++) {
      const resultPicture = document.querySelectorAll(".result__pictures")[i];
      const resultPict = resultPicture.querySelectorAll(".result__pict")[j];

      const lQuestion = rounds[i].questions[j];

      let correctPicture = lQuestion;
      if (curTypeGame !== "artists") {
        correctPicture = lQuestion.picture;
      }
      resultPict.querySelector(".result__pict-name").innerHTML =
        correctPicture.name;
      resultPict.querySelector(".result__pict-author").innerHTML =
        correctPicture.author;
      resultPict.querySelector(".result__pict-year").innerHTML =
        correctPicture.year;

      const elImg = resultPict.querySelector(".result__img");
      promises.push(
        new Promise((resolve, reject) => {
          elImg.onload = resolve;
          elImg.onerror = reject;
          elImg.src = `./assets/img/${correctPicture.imageNum}.jpg`;
        })
      );

      resultPict.addEventListener("click", (e) => {
        const resultPictDescription = resultPict.querySelector(
          ".result__pict-description"
        ); // .
        if (resultPictDescription.classList.contains("up")) {
          resultPictDescription.classList.remove("up");
        } else {
          resultPictDescription.classList.add("up");
        }
      });
    }
    // await Promise.all(promises);
  }
  await Promise.all(promises);

  fillAllResultPages();
}

function fillAllResultPages() {
  const resultPictures = document.querySelectorAll(".result__pictures");
  for (let i = 0; i < resultPictures.length; i++) {
    fillResultPage(i);
  }
}

async function fillResultPage(activeRound, pageSelection = false) {
  if (pageSelection) {
    // сделаем активной нужную страницу пагинатора
    const slides = document.querySelectorAll(".carousel-item");
    const indicators = document.querySelectorAll(".carousel-indicator");
    for (let j = 0; j < slides.length; j++) {
      if (j === activeRound) {
        slides[j].classList.add("active");
        indicators[j].classList.add("active");
      } else {
        slides[j].classList.remove("active");
        indicators[j].classList.remove("active");
      }
    }
  }
  // заполним результаты ответов
  const promises = [];
  const resultPictures = document.querySelectorAll(".result__pictures");

  for (let i = 0; i < resultPictures.length; i++) {
    const resultPicts = resultPictures[i].querySelectorAll(".result__pict");
    for (let j = 0; j < resultPicts.length; j++) {
      const resultPict = resultPicts[j];
      const curQuestion = rounds[i].questions[j];
      const pictScore = resultPict.querySelector(".result__pict-score");

      const resultPictDescription = resultPict.querySelector(
        ".result__pict-description"
      );
      if (resultPictDescription.classList.contains("up")) {
        resultPictDescription.classList.remove("up");
      }

      promises.push(
        new Promise((resolve, reject) => {
          pictScore.onload = resolve;
          pictScore.onerror = reject;
          if (curQuestion.score) {
            pictScore.src = "./assets/svg/green_score.png";
            resultPict.querySelector(".result__img").style =
              "filter: grayscale(0%); opacity: 1";
          } else {
            pictScore.src = "./assets/svg/red_score.png";
            resultPict.querySelector(".result__img").style =
              "filter: grayscale(100%); opacity: 0.9";
          }
        })
      );
      if (!curQuestion.score) {
        resultPict.querySelector(".result__img").style =
          "filter: grayscale(100%); opacity: 0.9";
      }
    }
  }
  await Promise.all(promises);
}

document.querySelector(".result__home__btn").addEventListener("click", (e) => {
  changePage(".result", ".main");
});

document.querySelector(".result__cat__btn").addEventListener("click", (e) => {
  changePage(".result", ".categories");
});
