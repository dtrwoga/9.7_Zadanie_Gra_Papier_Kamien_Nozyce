// scripts.js

//Przycisk zainicjowania nowej gry

var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

//Wybór gracza

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

//Wartosci poczatkowe

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };
    
//Wyswietlanie elementow gry

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem1 = document.getElementById('js-resultsWindow1'),
    resultsElem2 = document.getElementById('js-resultsWindow2'),
    imgStartedElem = document.getElementById('js-imgStarted'),
    imgNotStartedElem = document.getElementById('js-imgNotStarted');
 
function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem1.style.display = 'block';
        resultsElem2.style.display = 'block';
        imgStartedElem.style.display = 'block';
        imgNotStartedElem.style.display = 'none';
    break;
    case 'ended':
        imgStartedElem.style.display = 'none';
        imgStartedElem.style.display = 'none';
        playerResultElem.innerHTML = 'Player Score'
        computerResultElem.innerHTML = 'Computer Score';
        playerPickElem.innerHTML = 'Player selection'
        computerPickElem.innerHTML = 'Computer selection';
        newGameBtn.innerText = 'Play again';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem1.style.display = 'none';
        resultsElem2.style.display = 'none';
        imgStartedElem.style.display = 'none';
        imgNotStartedElem.style.display = 'block';
    }
};
setGameElements();

//Rozpoczecie gry

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
    
function newGame() {
  player.name = prompt('Please enter your name', 'Player name');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;
    console.log(playerNameElem)
    setGamePoints(); 
  }
};

//Wybor gracza

function playerPick(playerPick) {
    console.log(playerPick);
};

//Losowanie wyboru komputera

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
};

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');
  
  
function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
};

//Logika gry i przyznawanie punktów

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
        playerResultElem.innerHTML = 'Remis!';
        computerResultElem.innerHTML = 'Remis!';
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
        
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
    setGamePoints();
    finishedGame(); 
};

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
};

//Aktualizacja wyniku

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
};


//Ogłoszenie wyników i zachęta do nowej gry

function finishedGame() {
    
    if (player.score == 10) {
        setGamePoints()
        gameState = 'ended';
        $("#myModal").modal({show: true});
        document.getElementById('js-modalWinner').innerHTML = player.name;
    } 

    else if (computer.score == 10){
        setGamePoints()
        gameState = 'ended'; 
        $("#myModal").modal({show: true});  
        document.getElementById('js-modalWinner').innerHTML = 'Computer';
    }
    setGameElements(); 

};

