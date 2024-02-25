let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

function playSound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");

  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;

  $("#level-title").text(`Level ${level}`);
}

function checkPatters(level) {
  if (userClickedPattern[level - 1] === gamePattern[level - 1]) {
    console.log("Advance");
    console.log("userClickedPattern >>> " + userClickedPattern);
    console.log("gamePattern >>> " + gamePattern);
    userClickedPattern = [];
    setTimeout(() => {
      nextSequence();
    }, 1000);
  } else {
    console.log("Failed");
    console.log("userClickedPattern >>> " + userClickedPattern);
    console.log("gamePattern >>> " + gamePattern);
  }
}

$(document).on("click", ".btn", function (e) {
  let userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);

  playSound(userChosenColour);

  if (level >= 1 && userClickedPattern.length === gamePattern.length) {
    checkPatters(level);
  }
});

$(document).keydown(function (e) {
  if (level === 0) {
    nextSequence();
  }
});
