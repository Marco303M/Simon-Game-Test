var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).on('keypress', function(e) {
  if (started == false) {
    if (e.which == 13) {
      started = true;
      $("#level-title").text("Level 0");
      nextSequence();
    }
  }
  else{
    switch (e.key) {
      case "w":
      gameGoing("green");
      break;

      case "e":
      gameGoing("red");
      break;

      case "a":
      gameGoing("yellow");
      break;

      case "s":
      gameGoing("blue");
      break;

      default: console.log(e.key);
    }
  }
});




$(".btn").click(function() {
  var userClickedColour = $(this).attr("id");
gameGoing(userClickedColour);
})

function gameGoing(userChosenColour){
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }

}

function startOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200);
  $("#level-title").text("Game Over! You reached Level " + level + " ! Press Enter to Start again");
  started = false;
  gamePattern = [];
  level = 0;
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level + "!");
  var randomNumber = Math.floor((Math.random() * 4));

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  setTimeout(function() {
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, 100);
  userClickedPattern = [];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
