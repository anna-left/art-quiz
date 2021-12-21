function main_start() {
  function deleteElements() {
    const categoriesPict = document.querySelectorAll(".categories__pict");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const carouselIndicators = document.querySelectorAll(".carousel-indicator");
    const resultPict = carouselItems[0].querySelectorAll(".result__pict");
    const categoriesPictLength = categoriesPict.length;
    if (categoriesPictLength > 1) {
      for (let i = categoriesPictLength - 1; i > 0; i--) {
        categoriesPict[i].remove();
      }
    }
    const carouselItemsLength = carouselItems.length;
    if (carouselItemsLength > 1) {
      for (let i = carouselItemsLength - 1; i > 0; i--) {
        carouselItems[i].remove();
        carouselIndicators[i].remove();
      }
    }
    const resultPictLength = resultPict.length;
    if (resultPictLength > 1) {
      for (let i = resultPictLength - 1; i > 0; i--) {
        resultPict[i].remove();
      }
    }
  }
  function startQuiz(typeGame, func) {
    if (typeGame !== curTypeGame) {
      deleteElements();
      curTypeGame = typeGame;
      rounds.length = 0;
      curRound = 0;
      startProgressor();
      func();

      buildResultPage();
    } else {
      setScoreCategories();
      changePage(".main", ".categories");
    }
  }

  document
    .querySelector(".main__artists__quiz")
    .addEventListener("click", (e) => {
      startQuiz("artists", startQuizArtists);
    });
  document
    .querySelector(".main__pictures__quiz")
    .addEventListener("click", (e) => {
      startQuiz("pictures", startQuizPictures);
    });
  document
    .querySelector(".main__settings__btn")
    .addEventListener("click", (e) => {
      changePage(".main", ".settings");
    });
}

function startProgressor() {
  document.querySelector(".overlay").classList.add("overlay__yes");
  document.querySelector(".overlay").classList.remove("overlay__no");
  document.querySelector(".progressor").classList.add("active");
  document.querySelector(".progressor").classList.remove("no__active");
}
function stopProgressor() {
  document.querySelector(".overlay").classList.add("overlay__no");
  document.querySelector(".overlay").classList.remove("overlay__yes");
  document.querySelector(".progressor").classList.add("no__active");
  document.querySelector(".progressor").classList.remove("active");
}
