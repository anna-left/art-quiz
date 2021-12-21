window.addEventListener("DOMContentLoaded", async () => {
  startProgressor();
  // восстанавливаем сохраненные глобальные значения
  getLocalStorage();
  // звук
  progressVolume.value = curVolume;
  changeVolume();
  // время
  document.querySelector(".timer__checkbox").checked = playForTime;
  document.querySelector(".duration").innerText = curDuration;
  main_start();
  images = await getJson();
  stopProgressor();
});

function getValue(name) {
  if (localStorage.getItem(name)) {
    return localStorage.getItem(name);
  }
}

function getLocalStorage() {
  if (getValue("curVolume")) {
    curVolume = getValue("curVolume");
  }
  if (getValue("playForTime")) {
    playForTime = getValue("playForTime") === "true";
  }
  if (getValue("curDuration")) {
    curDuration = getValue("curDuration");
  }
}

console.log(`
220 / 220
Выполнены все пункты формы для кросс-чека
\u{2705} Стартовая страница и навигация +20
\u{2705} Настройки +40
\u{2705} Страница категорий +30
\u{2705} Страница с вопросами +50
\u{2705} Страница с результатами +50
\u{2705} Одновременная загрузка и плавная смена изображений +10
\u{2705} Анимация +20
\u{2705} Дополнительный функционал на выбор +20
Анимация, дополнительный функционал:
\u{1F6A9} карточки картин изменяются в размерах при наведении
\u{1F6A9} анимированная заливка цветом кнопки ответа на вопрос
\u{1F6A9} на странице результатов при клике на карточку выезжает информация о картине
\u{1F6A9} на главной странице во время фоновой загрузки изображений отображается прогрессор
\u{1F6A9} на странице результатов реализован слайдер с пагинатором. При клике на результат в карточке категории открывается соответствующая страница слайдера
\u{1F6A9} разные уведомления по окончании раунда в зависимости от результата
`);
