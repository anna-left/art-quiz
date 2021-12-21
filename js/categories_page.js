async function buildCategoriesPage() {
  const categoriesCard = document.querySelector(".categories__pict");
  const categoriesPictures = document.querySelector(".categories__pictures");


  for (let i = 0; i < 11; i++) {
    const el_clone = categoriesCard.cloneNode(true);
    categoriesPictures.appendChild(el_clone);
  }

  const promises = [];

  const categoriesPict = document.querySelectorAll(".categories__pict");
  for (let i = 0; i < categoriesPict.length; i++) {
    const el = categoriesPict[i];
    const elImg = el.querySelector(".categories__img");

    promises.push(
      new Promise((resolve, reject) => {
        elImg.onload = resolve;
        elImg.onerror = reject;
        if (curTypeGame === "artists") {
          elImg.src = `./assets/img/${rounds[i].questions[0].imageNum}.jpg`;
        } else {
          elImg.src = `./assets/img/${rounds[i].imageNum}.jpg`;
        }
      })
    );

    el.addEventListener("click", (e) => {
      if (e.target.classList.contains("categories__pict-score")) {
        return;
      }

      curQuestion = 0;
      curRound = i;
      // если повторная игра - перемешиваем варианты ответов, очищаем результаты
      if ((rounds[i].isStarted = true)) {
        for (let i = 0; i < rounds[curRound].questions.length; i++) {
          const el = rounds[curRound].questions[i];
          const arr = shuffle(el.answers.slice());
          el.answers = arr;
          el.score = 0;
        }
      }
      askNewQuestion();
      changePage(".categories", ".question__art");
    });
  }
  await Promise.all(promises);
  setScoreCategories();
}

function setScoreCategories() {
  const categoriesPict = document.querySelectorAll(".categories__pict");

  for (let i = 0; i < categoriesPict.length; i++) {
    const el = categoriesPict[i];
    const img = el.querySelector(".categories__img");
    el.querySelector(".categories__pict-number").innerHTML = i + 1;

    // если раунд не пройден - фильтр на изображения
    const sum = rounds[i].questions.reduce(
      (prev, curr) => prev + curr.score,
      0
    );
    if (!rounds[i].isStarted) {
      img.style = "filter: grayscale(100%); opacity: 0.9";
      el.querySelector(".categories__pict-score").innerHTML = "";
    } else {
      img.style = "filter: none; opacity: 1;";
      el.querySelector(
        ".categories__pict-score"
      ).innerHTML = `${sum} / ${rounds[i].questions.length}`;
      el.querySelector(".categories__pict-score").addEventListener(
        "click",
        async () => {
          await fillResultPage(i, true);
          changePage(".categories", ".result");
        }
      );
    }
  }
}

document
  .querySelector(".categories__home__btn")
  .addEventListener("click", (e) => {
    changePage(".categories", ".main");
  });

document
  .querySelector(".categories__score__btn")
  .addEventListener("click", async () => {
    await fillResultPage(curRound);
    changePage(".categories", ".result");
  });
