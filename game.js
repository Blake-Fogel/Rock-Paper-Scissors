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

}