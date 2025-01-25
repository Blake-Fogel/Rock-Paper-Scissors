let start_game_btn = document.querySelector(".start-game");
let body = document.querySelector("body");
//prompt user for round amount and start game
start_game_btn.addEventListener('click',() => {
    let amount = +prompt("How many rounds do you want to play?");
    if (!isNaN(amount)) {
        playGame(amount);
    }
});

//make button method - cleaning up playGame code
function makeButton(svgPath,parentContainer) {
    let button = document.createElement('button');
    let img = document.createElement('img');
    img.src = svgPath;
    img.style.height = '50px';
    button.appendChild(img);
    parentContainer.appendChild(button);
    return button;
}

function addScoreTracker(humanScore,drawScore,computerScore) {
    let scoreLabel = document.createElement('div');
    scoreLabel.classList.add('score-label');
    scoreLabel.style.fontSize = '30px';
    scoreLabel.style.display = 'flex';
    let humanScoreDiv = document.createElement('div');
    humanScoreDiv.innerText = humanScore;
    humanScoreDiv.classList.add("human-score");
    let separator1 = document.createElement('div');
    separator1.innerText = '-';
    let drawScoreDiv = document.createElement('div');
    drawScoreDiv.innerText = drawScore;
    drawScoreDiv.classList.add("draw-score");
    let separator2 = document.createElement('div');
    separator2.innerText = '-';
    let computerScoreDiv = document.createElement('div');
    computerScoreDiv.innerText = computerScore;
    computerScoreDiv.classList.add("computer-score");
    scoreLabel.append(humanScoreDiv,separator1,drawScoreDiv,separator2,computerScoreDiv);
    document.querySelector('body').appendChild(scoreLabel);
}

/* 
    This function will start a game that will play for
    a passed in amount of rounds.
*/
function playGame(round) {
    //number of correct guesses by human
    let humanScore = 0;
    //number of wrong guesses by human
    let computerScore = 0;
    //number of draws
    let drawScore = 0;
    if (typeof round === 'number' && round > 0) {
        start_game_btn.remove();
        let playerOptions = document.createElement('div');
        addScoreTracker(humanScore,drawScore,computerScore);
        playerOptions.style.display = 'flex';
        playerOptions.style.gap = '10px';
        playerOptions.classList.add('player-options');
        makeButton('/images/scissors.svg',playerOptions);
        makeButton('/images/rock.svg',playerOptions);
        makeButton('/images/paper.svg',playerOptions);
        body.appendChild(playerOptions);
    }
    //#region game code stuff

    /* 
        Get a random number between 0 inclusive and 3 exlusive
        Return "Rock", "Paper", or "Scissors" based on this number
    */
    function getComputerChoice() {
        /* 
            create an array object and index based on the provided random value
            the "| 0" is to truncate the floating point part
        */
        return ["rock","paper","scissors"][(Math.random() * 3) | 0]
    }
    /* 
        this function will take in computer choice
        and human choice then determine who won
        by returning a string saying so
    */
    function playRound(humanChoice, computerChoice) {
        /* 
            I know that only one other choice can be beaten per option.
            I am checking to see if the computer choice is that one case.
            If not, then the player loses.
        */
       //check for tie
       humanChoice = humanChoice.toLowerCase();
       if (humanChoice===computerChoice) {
            return "It's a draw!";
       }
        function isComputerBeatable(beatableComputerChoice) {
            if (computerChoice===beatableComputerChoice) {
                humanScore += 1;
                return `You win! ${humanChoice} beats ${computerChoice}`;
            } else {
                computerScore += 1;
                return `You lose! ${computerChoice} beats ${humanChoice}`;
            }
        }
        //pass in the correct beatable value for what the user chose
        switch (humanChoice) {
            case "rock":
                return isComputerBeatable("scissors");
                break;
            case "scissors":
                return isComputerBeatable("paper");
                break;
            case "paper":
                return isComputerBeatable("rock");
                break;
        }
    }
    //#endregion

}