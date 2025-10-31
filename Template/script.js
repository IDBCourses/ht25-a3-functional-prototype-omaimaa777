
// Settings - these never change during the game (constant object)

const settings = {
  targetZoneHeight: 60, //How tall the target zone is in px
  leftKeys: ["q", "w", "e", "a", "s", "d"], // array of the left lane keys
  middleKeys: ["r", "t", "f","g"], // array of the middle lane keys
  rightKeys: ["y", "u", "h", "j", "n", "m"] //array of the right lane keys
};

//State - these change as the game is played
let state = {
  score: 0, //players current score
  misses: 0, //How many letters player missed
  isPlaying: false, // if the game is currently running
  letters: [], //array to hold all falling letter objects
  shiftHeld: false //if shift key is currently pressed
};

// DOM - getting elements from HTML
const gameContainer = document.getElementById("game-container");  // The game area
const scoreDisplay = document.getElementById("score");  // The score number
const missesDisplay = document.getElementById("misses");  // The misses number
const messageDisplay = document.getElementById("message");  // The feedback message
const startButton = document.getElementById("start-button");  // The start button

// Setup - This function runs once when the page loads
function setup() {
    // Add event listener to start button 
    startButton.addEventListener("click", function() {
        startGame();  // Call startGame when button is clicked
    });
    
    // Listen for any key being pressed down 
    document.addEventListener("keydown", function(event) {
        handleKeyPress(event);  // Call handleKeyPress when key is pressed
    });
    
    // Listen for any key being released 
    document.addEventListener("keyup", function(event) {
        handleKeyRelease(event);  // Call handleKeyRelease when key is released
    });
}

//start a new game