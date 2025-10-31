
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
function startGame() {
    // Reset all state values to starting values
    state.score = 0;
    state.misses = 0;
    state.isPlaying = true;  // Game is now running
    state.letters = [];  // Empty the letters array
    state.shiftHeld = false;
    
    // Update what shows on screen
    scoreDisplay.textContent = "0";
    missesDisplay.textContent = "0";
    messageDisplay.textContent = "";  // Clear any old messages
    
    // Change the button text
    startButton.textContent = "Playing...";
    startButton.disabled = true;  // Can't click button during game
    
    // Remove any old letters that might still be on screen
    let oldLetters = document.querySelectorAll(".falling-letter");
    // Loop through all old letters 
    for (let i = 0; i < oldLetters.length; i++) {
        oldLetters[i].remove();  // Remove each one
    }
    
    // Start the game loop
    loop();
}

