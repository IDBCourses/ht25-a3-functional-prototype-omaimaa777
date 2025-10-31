
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


// Game loop - This runs many times per second (like 60 times per second)
function loop() {
    // If game is not playing, stop the loop
    if (!state.isPlaying) {
        return;  // Exit the function
    }
    
    // Randomly spawn new letters (2% chance each frame)
    const randomNumber = Math.random();  // Get random number between 0 and 1
    if (randomNumber < 0.02) {  // 2% chance
        spawnLetter();  // Create a new letter
    }
    
    // Loop through all falling letters (this is a FOR LOOP with an ARRAY)
    for (let i = 0; i < state.letters.length; i++) {
        const letter = state.letters[i];  // Get the letter at position i
        
        // Move the letter down by 2 pixels
        letter.y = letter.y + 2;  // Add 2 to its y position
        letter.element.style.top = letter.y + "px";  // Update its position on screen
        
        // Check if letter went past the bottom (400 pixels)
        if (letter.y > 400) {
            // Player missed this letter!
            
            // Add one to misses
            state.misses = state.misses + 1;
            missesDisplay.textContent = state.misses;  // Update display
            
            // Remove the letter from the screen
            letter.element.remove();
            
            // Remove the letter from our array
            state.letters.splice(i, 1);  // Remove 1 item at position i
            i = i - 1;  // Go back one position because array is now shorter
            
            // Show a message to the player
            messageDisplay.textContent = "MISSED!";
            messageDisplay.style.color = "red";
            
            // Check if player missed too many (10 misses = game over)
            if (state.misses >= 10) {
                gameOver();  // End the game
            }
        }
    }
    
    // Call this function again next frame (makes the loop keep going)
    requestAnimationFrame(loop);
}


// Create a new falling letter
function spawnLetter() {
    // Create an array of possible lanes
    const lanes = ["left", "middle", "right"];
    
    // Pick a random lane
    const randomIndex = Math.floor(Math.random() * lanes.length);  // Random number 0, 1, or 2
    const lane = lanes[randomIndex];  // Get that lane from array
    
    // Variables to hold the letter and its x position
    let letter = "";
    let xPosition = 0;
    
    // Choose letter and position based on which lane was picked
    if (lane === "left") {
        // Pick a random key from left keys
        const randomIndex = Math.floor(Math.random() * settings.leftKeys.length);
        letter = settings.leftKeys[randomIndex];
        xPosition = 75;  // Left lane x position
        
    } else if (lane === "middle") {
        // Pick a random key from middle keys
        const randomIndex = Math.floor(Math.random() * settings.middleKeys.length);
        letter = settings.middleKeys[randomIndex];
        xPosition = 275;  // Middle lane x position
        
    } else {
        // Must be right lane - pick a random key from right keys
        const randomIndex = Math.floor(Math.random() * settings.rightKeys.length);
        letter = settings.rightKeys[randomIndex];
        xPosition = 475;  // Right lane x position
    }
    
    // Create a new div element for the letter
    const letterDiv = document.createElement("div");
    letterDiv.className = "falling-letter";  // Give it the CSS class
    letterDiv.textContent = letter.toUpperCase();  // Show the letter in uppercase
    letterDiv.style.left = xPosition + "px";  // Position it horizontally
    letterDiv.style.top = "-50px";  // Start it above the screen
    
    // Add the div to the game container
    gameContainer.appendChild(letterDiv);
    
    // Create an object to remember information about this letter
    const letterObject = {
        element: letterDiv,  // The HTML element
        letter: letter,  // The letter character (lowercase)
        lane: lane,  // Which lane it's in
        x: xPosition,  // Its x position
        y: -50  // Its y position (starts at -50)
    };
    
    // Add this object to our array of letters
    state.letters.push(letterObject);
}