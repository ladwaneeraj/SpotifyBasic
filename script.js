//iniialize
let songIndex = 0;
let audioElement = new Audio("Songs/1.mp3");
let masterPlay = document.getElementsByClassName(
  "fa-3x fa-regular fa-circle-play"
)[0];
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
  {
    songName: "Beats",
    filePath: "Songs/0.mp3",
    CoverPath: "images/Cover/1.jpg",
  },
  {
    songName: "Chaleya",
    filePath: "Songs/1.mp3",
    CoverPath: "images/Cover/2.jpg",
  },
  {
    songName: "kesariya",
    filePath: "Songs/2.mp3",
    CoverPath: "images/Cover/3.jpg",
  },
  {
    songName: "Pehle bhi",
    filePath: "Songs/3.mp3",
    CoverPath: "images/Cover/4.jpg",
  },
  {
    songName: "Sajne Re",
    filePath: "Songs/4.mp3",
    CoverPath: "images/Cover/5.jpg",
  },
  {
    songName: "Tauba",
    filePath: "Songs/5.mp3",
    CoverPath: "images/Cover/6.jpg",
  },
  {
    songName: "SomeTimes",
    filePath: "Songs/6.mp3",
    CoverPath: "images/Cover/7.jpg",
  },
];

songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].CoverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/Pause toggle
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

//progress bar

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

//songItems play pause

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("SongItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};

Array.from(document.getElementsByClassName("SongItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `Songs/${songIndex - 1}.mp3`;
      masterSongName.innerText = songs[songIndex - 1].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);
//previous button
document.getElementById("back").addEventListener("click", () => {
  if (songIndex < 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.src = `Songs/${songIndex - 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

//next button
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  masterSongName.innerText = songs[songIndex + 1].songName;
  audioElement.src = `Songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
