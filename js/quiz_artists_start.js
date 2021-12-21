async function startQuizArtists() {
  class Round {
    constructor(id, questions) {
      this.id = id;
      this.questions = questions;
      this.isStarted = false;
    }
  }

  class Question {
    constructor(el, answers) {
      this.author = el.author;
      this.name = el.name;
      this.year = el.year;
      this.imageNum = el.imageNum;
      this.answers = answers;
      this.score = 0;
    }
  }

  // создаем 12 раундов викторины
  for (let i = 0; i < 12; i++) {
    // массив вопросов для раунда
    const questions = [];

    // создаем массив художников
    const art = Array.from(new Set(images.map((a) => a.author)));

    for (let j = i * 10; j < i * 10 + 10; j++) {
      const el = images[j];
      let index = art.indexOf(el.author);
      if (index > -1) {
        art.splice(index, 1);
      }
      // создаем массив ответов
      const answers = [];
      answers.push(el.author);
      for (let k = 0; k < 3; k++) {
        index = getRandomArbitrary(0, art.length);
        answers.push(art[index]);
        art.splice(index, 1);
      }
      // объект - один вопрос викторины
      const question = new Question(el, shuffle(answers));

      questions.push(question);
    }
    rounds.push(new Round(i, questions));
  }

  await buildCategoriesPage();
  stopProgressor();
  changePage(".main", ".categories");
}
