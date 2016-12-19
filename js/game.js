var game = {
    count: 0,
    currentGame: [],
    player: [],
    newArr: []
};

//Declaring variables
var number;
var i = 0;
//*******************************************Select a Random number****************************************************
function randomNumber() {
    number = Math.floor(Math.random() * 4);
    currentgamearray();
    console.log(game.currentGame);
    return number
}
//********************************pushing random number to current game array for comparison********************************
var currentgamearray = function () {
    game.currentGame.push(number);
};
//*******************************************get squares and find one matching randomNumber*******************************************
//Creating an array of four boxes
var element = $(".box");
console.log(element);
//Assign a random number to a box
var assignBox = function () {
    randomNumber();
    game.newArr.push(element[number]);
    console.log(game.newArr)
};
//*******************************************illuminate squares with a seTimeout*******************************************
var illuminateBox = function () {
    assignBox();
    game.newArr.forEach(function (el, index) {
        setTimeout(function () {
            $(el).fadeOut().fadeIn();
        }, 1000 * index);

    });
};
//*******************************************Generating nextround function*******************************************
var nextround = function () {
    game.player = [];
    illuminateBox();
    console.log(game.player)
};

//***********************************Comparison box click and the animated box *****************************************
var comparison = function () {

      if (game.currentGame[game.count] == game.player[game.count]) {
        game.count += 1;
        if (game.currentGame.length == game.player.length) {
            //gamecount is for level incrementing
            game.count += 1;
            showlevel();
            //setimeout for  level to slideup
            setTimeout(function () {
                $("#level").slideUp();
            }, 500);
            game.count = 0;
            //setimeout for 4 boxes to show them
            setTimeout(function () {
                $("#gameboard").show();
                nextround();
            }, 1500);

        }
          $(".box").click(true);
        //console.log(game.count)
    }
    else {
        $('#play')[0].muted = true;
        $("#gameboard").hide();
        $("#gameover").show();

        setTimeout(function () {
            location.reload();
        }, 1000)
    }
};

//*************************************************play sound**********************************************************
var playsound = function () {
    $("#play")[0].play();
};
//***************************************************Show level *******************************************************
var showlevel = function () {
    $("#gameboard").hide();
    $("#level").show().html("Level: " + game.count);
};
//*************************************************Start button**********************************************************************
$('.btn').click(function () {
    $('#piano')[0].muted = true;
    playsound();
    //show the 4 boxes
    $("#gameboard").show();
//hide the button
    $(this).hide();
// hide the Simon game title
    $('#title').hide();
// illuminate boxes
    illuminateBox();
//when click a box we push his innerhtml to an array for comparison with the random number
    $(".box").click(function () {
        game.player.push(this.innerHTML);
        comparison();
        console.log('user array ' + game.player);
    });
});





