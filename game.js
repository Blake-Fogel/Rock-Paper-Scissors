
/* 
    This function will start a game that will play for
    a passed in amount of rounds.
*/
function playGame(round) {
    //number of correct guesses by human
    let humanScore = 0;
    //number of wrong guesses by human
    let computerScore = 0;
    if (typeof round === 'number' && round > 0) {
        for (let a = 0; a < round; a++) {
            console.log(playRound(getHumanChoice(),getComputerChoice()));
        }
        if (humanScore > computerScore) {
            console.log("Congrats! You beat the computer");
        } else {
            console.log("Oh no! You lost!");
        }
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
        return ["Rock","Paper","Scissors"][(Math.random() * 3) | 0]
    }
    /* 
        Get human choice.
        Keep prompting until the choice is valid.
    */
    function getHumanChoice() {
        /* 
            Create an empty initial variable.
            Enter the do while and set the variable equal to use input
            check that user input against a regex and if it doesn't match
            the regex will return zero and continue looping.
            The regex is case insensitive
        */
        let humanChoice;
        do {
            humanChoice = prompt("Do you choose rock, paper, or scissors?");
        } while (!(/^(Rock)|(Paper)|(Scissors)$/i.test(humanChoice)));
        return humanChoice;
    }
    /* 
        this function will take in computer choice
        and human choice then determine who won
    */
    function playRound(humanChoice, computerChoice) {
        /* 
            I know that only one other choice can be beaten per option.
            I am checking to see if the computer choice is that one case.
            If not, then the player loses.
        */
        function isComputerBeatable(beatableComputerChoice) {
            if (computerChoice===beatableComputerChoice) {
                humanScore += 1;
                return `You win! ${humanChoice}-${humanScore} beats ${computerChoice}-${computerScore}`;
            } else {
                computerScore += 1;
                return `You lose! ${humanChoice}-${humanScore} beats ${computerChoice}-${computerScore}`;
            }
        }
        //pass in the correct beatable value for what the user chose
        switch (humanChoice.toLowerCase()) {
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