async function startQuizPictures() {
  class Round {
    constructor(id, questions) {
      this.id = id;
      this.imageNum = questions[0].answers[0].imageNum;
      this.questions = questions;
      this.isStarted = false;
    }
  }

  class Picture {
    constructor(el, answers) {
      this.author = el.author;
      this.name = el.name;
      this.year = el.year;
      this.imageNum = el.imageNum;
    }
  }

  class Question {
    constructor(artist, picture, answers) {
      this.artist = artist;
      this.picture = picture;
      this.answers = answers;
      this.score = 0;
    }
  }

  const startImages = images.slice();

  // создаем массив художников
  const artists = Array.from(new Set(images.map((a) => a.author)));
  const missingLength = 120 - artists.length;
  for (let i = 0; i < missingLength; i++) {
    artists.push(artists[i]);
  }

  // создаем 12 раундов викторины
  for (let i = 0; i < 12; i++) {
    // массив вопросов для раунда
    const questions = [];

    // создаем массив картин
    const images = startImages.slice();

    for (let j = i * 10; j < i * 10 + 10; j++) {
      const artist = artists[j];
      const picture = startImages.find((pict) => pict.author === artist);

      // создаем массив ответов
      const answers = [];
      answers.push(picture);
      while (answers.length < 4) {
        index = getRandomArbitrary(0, images.length);
        if (images[index].author !== artist) {
          answers.push(images[index]);
          images.splice(index, 1);
        }
      }
      // объект - один вопрос викторины
      const question = new Question(artist, picture, shuffle(answers));

      questions.push(question);
    }
    rounds.push(new Round(i, questions));
  }

  await buildCategoriesPage();
  stopProgressor();
  changePage(".main", ".categories");
}
