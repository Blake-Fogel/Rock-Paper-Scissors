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