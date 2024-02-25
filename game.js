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

function checkPatters(currentlevel) {
  if (userClickedPattern.toString() === gamePattern.toString()) {
    userClickedPattern = [];
    setTimeout(() => {
      nextSequence();
    }, 1000);
  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}

$(document).on("click", ".btn", function (e) {
  let userChosenColour = this.id;

  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);

  playSound(userChosenColour);

  if (level >= 1 && userClickedPattern.length == gamePattern.length) {
    checkPatters(level);
  }
});

$(document).keydown(function (e) {
  if (level === 0) {
    nextSequence();
  }
});
