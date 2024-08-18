var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

$(document).on("keypress", function(){
    if(!start){
        //$("h1").text("Level" + " " + level);
        start = true;
        nextSequence();
    }
});

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    level++;
    $("#level-title").text("Level" + " " + level);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    $('#' + userChosenColour).fadeOut(100).fadeIn(100);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    var colour = '#' + currentColor;
    $(colour).addClass("pressed");
    setTimeout(function(){
        $(colour).removeClass("pressed");
    }, 200);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel == gamePattern.length-1){
            userClickedPattern = [];
            nextSequence();
        }
    }
    else {
        //game over
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 150);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    start = false;
    gamePattern = [];
    userClickedPattern = [];    
}
