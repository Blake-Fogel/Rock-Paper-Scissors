let start_game_btn = document.querySelector(".start-game");
//prompt user for round amount and start game
start_game_btn.addEventListener('click',() => {
    let amount = +prompt("How many rounds do you want to play?");
    if (!isNaN(amount)) {
        playGame(amount);
    }
});
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
        let height = start_game_btn.height;
        start_game_btn.remove();
        let scoreLabel = document.createElement('div');
        scoreLabel.height = height;
        scoreLabel.classList.add('score-label');
        scoreLabel.style.fontSize = '30px';
        scoreLabel.innerText = `${humanScore} - ${drawScore} - ${computerScore}`
        document.querySelector('body').appendChild(scoreLabel);
        let playerOptions = document.createElement('div');
        playerOptions.classList.add('player-options');
        let scissorsButton = document.createElement('button');
        let rockButton = document.createElement('button');
        let paperButton = document.createElement('button');
    }
    //#region game code stuff

    //display results message
    function displayResultsMessage() {
        if (humanScore > computerScore) {
            alert(`Congrats! You beat the computer! ${humanScore}-${computerScore}`);
        } else {
            if (humanScore==computerScore) {
                alert("You tied with the computer!");
            } else {
                alert(`Oh no! You lost the game! ${humanScore}-${computerScore}`);
            }
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