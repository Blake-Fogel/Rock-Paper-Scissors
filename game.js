let start_game_btn = document.querySelector(".start-game");
let body = document.querySelector("body");
let scoreLabel = createScoreTracker();
let resultLabel = document.createElement('div');
resultLabel.fontSize = '16px';
//prompt user for round amount and start game
start_game_btn.addEventListener('click',() => {
    let amount = +prompt("How many rounds do you want to play?");
    if (!isNaN(amount) && amount > 0) {
        start_game_btn.remove();
        resultLabel.remove();
        document.body.appendChild(scoreLabel);
        playGame(amount);
    }
});

//make button method - cleaning up playGame code
function makeButton(svgPath,parentContainer,className) {
    let button = document.createElement('button');
    let img = document.createElement('img');
    img.src = svgPath;
    img.style.height = '50px';
    img.classList.add(className);
    button.appendChild(img);
    button.classList.add(className);
    parentContainer.appendChild(button);
    return button;
}
/* 
    Add label that contains humanScore - drawScore - computerScore
*/
function createScoreTracker() {
    let scoreLabel = document.createElement('div');
    scoreLabel.classList.add('score-label');
    scoreLabel.style.fontSize = '30px';
    scoreLabel.style.display = 'flex';
    let humanScoreDiv = document.createElement('div');
    humanScoreDiv.innerText = 0;
    humanScoreDiv.classList.add("human-score");
    let separator1 = document.createElement('div');
    separator1.innerText = '-';
    let drawScoreDiv = document.createElement('div');
    drawScoreDiv.innerText = 0;
    drawScoreDiv.classList.add("draw-score");
    let separator2 = document.createElement('div');
    separator2.innerText = '-';
    let computerScoreDiv = document.createElement('div');
    computerScoreDiv.innerText = 0;
    computerScoreDiv.classList.add("computer-score");
    scoreLabel.append(humanScoreDiv,separator1,drawScoreDiv,separator2,computerScoreDiv);
    return scoreLabel;
}



/* 
    This function will start a game that will play for
    a passed in amount of rounds.
*/
function playGame(round) {
    //number of correct guesses by human
    let humanScore = 0;
    //humanScoreContainer
    let humanScoreDiv = undefined;
    //number of wrong guesses by human
    let computerScore = 0;
    //computerScoreContainer
    let computerScoreDiv = undefined;
    //number of draws
    let drawScore = 0;
    //drawScoreContainer
    let drawScoreDiv = undefined;
    if (typeof round === 'number' && round > 0) {
        document.querySelector('.computer-score').innerText = 0;
        document.querySelector('.human-score').innerText = 0;
        document.querySelector('.draw-score').innerText = 0;
        let playerOptions = document.createElement('div');
        computerScoreDiv = document.querySelector('.computer-score');
        humanScoreDiv = document.querySelector('.human-score');
        drawScoreDiv = document.querySelector('.draw-score');
        playerOptions.style.display = 'flex';
        playerOptions.style.gap = '10px';
        playerOptions.classList.add('player-options');
        makeButton('/images/scissors.svg',playerOptions,"scissors");
        makeButton('/images/rock.svg',playerOptions,"rock");
        makeButton('/images/paper.svg',playerOptions,"paper");
        playerOptions.addEventListener('click',(event) => {
            switch (event.target.className) {
                case "scissors":
                    updateScore(playRound("scissors",getComputerChoice()));
                    break;
                case "rock":
                    updateScore(playRound("rock",getComputerChoice()));
                    break;
                case "paper":
                    updateScore(playRound("paper",getComputerChoice()));
                    break;
                default:
                    break;
            }
            round -= 1;
            if (round==0) {
                scoreLabel.remove();
                playerOptions.remove();
                determineResult();
                body.appendChild(resultLabel);
                body.appendChild(start_game_btn);
            }
        });
        body.appendChild(playerOptions);
    }
    //#region game code stuff

/* 
    Check who won and set resultLabel accordingly
*/
function determineResult() {
    if (humanScore > computerScore) {
        resultLabel.innerText = "You win!";
    } else {
        if (computerScore>humanScore) {
            resultLabel.innerText = "You lose!";
        } else {
            resultLabel.innerText = "You tied with the computer";
        }
    }
}

    /*
        Update score and scorediv based on result passed in
    */
    function updateScore(result) {
        switch (result) {
            case "draw":
                drawScore += 1;
                drawScoreDiv.innerText = drawScore;
                break;
            case "win":
                humanScore += 1;
                humanScoreDiv.innerText = humanScore;
                break;
            case "lose":
                computerScore += 1;
                computerScoreDiv.innerText = computerScore;
                break;
        }
    }

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
            return "draw";
       }
        function isComputerBeatable(beatableComputerChoice) {
            if (computerChoice===beatableComputerChoice) {
                return `win`;
            } else {
                return `lose`;
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