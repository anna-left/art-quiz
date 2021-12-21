const progressVolume = document.querySelector(".progress");
const volumeBtn = document.querySelector(".play-sound");
const settingsSave = document.querySelector(".settings__btn-save");
const settingsCancel = document.querySelector(".settings__btn-cancel");
const duration = document.querySelector(".duration");
let curVol;

// проигрывание звука
function playSound(param) {
  if (!curVolume) {
    return;
  }
  const audioClick = new Audio();
  audioClick.volume = curVolume;
  switch (param) {
    case 0:
      audioClick.src = "./assets/sounds/drop.mp3";
      break;
    case 1:
      audioClick.src = "./assets/sounds/sms.mp3";
      break;
    case 2:
      audioClick.src = "./assets/sounds/gong.mp3";
      break;
    case 3:
      audioClick.src = "./assets/sounds/fanfaryi.mp3";
      break;
    case 4:
      audioClick.src = "./assets/sounds/wrong_answer.mp3";
      break;
    default:
      break;
  }
  audioClick.play();
}

function toggleMute() {
  if (curVolume) {
    curVolume = 0;
    volumeBtn.src = "./assets/svg/volume-off.svg";
  } else {
    curVolume = 0.5;
    volumeBtn.src = "./assets/svg/volume-on.svg";
  }
  progressVolume.value = curVolume;
  changeVolume();
}

function changeGradient(value) {
  progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
}

function changeVolume() {
  curVol = progressVolume.value;

  if (curVol == 0) {
    volumeBtn.src = "./assets/svg/volume-off.svg";
  } else {
    volumeBtn.src = "./assets/svg/volume-on.svg";
  }
  changeGradient.call(progressVolume, curVol * 100);
}

changeVolume();

progressVolume.addEventListener("input", changeVolume);
volumeBtn.addEventListener("click", (e) => {
  toggleMute();
});

document.getElementById("countSDown").addEventListener("click", (e) => {
  changeValuesS(-5);
});
document.getElementById("countSUp").addEventListener("click", (e) => {
  changeValuesS(+5);
});

function changeValuesS(numb) {
  const n = Number(duration.innerText) + numb;
  if (n >= 5 && n <= 30) {
    duration.innerText = n;
  }
}

// сохранить изменения
settingsSave.addEventListener("click", (e) => {
  curVolume = progressVolume.value;
  localStorage.setItem("curVolume", curVolume);

  playForTime = document.querySelector(".timer__checkbox").checked;
  localStorage.setItem("playForTime", playForTime);

  curDuration = Number(document.querySelector(".duration").innerText);
  localStorage.setItem("curDuration", curDuration);

  changePage(".settings", ".main");
});

// не сохранять изменения
settingsCancel.addEventListener("click", (e) => {
  changePage(".settings", ".main");
});
