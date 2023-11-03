// Initialize the score and a flag for collision detection
let score = 0;
let cross = true;

// Create Audio objects for the game audio and game over audio
const audio = new Audio("GameAudio.mp3");
const clashAudio = new Audio("gameover.mp3");

// Set the volume for both audio objects
audio.volume = 0.005;
clashAudio.volume = 0.008;

// Listen for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", () => {
  // Add a click event listener to the "Play" button
  document.getElementById("playBtn").addEventListener("click", startGame);

  // Function to start the game
  function startGame() {
    // Play the main game audio
    audio.play();

    // Get necessary elements and hide some of them
    const playBtn = document.getElementById("playBtn");
    const gameOverText = document.querySelector(".gameOver");
    const instructions = document.querySelector(".instructions");
    const audioOnOff = document.querySelector(".audioOnOff");
    playBtn.style.display = "none";
    gameOverText.style.display = "none";
    instructions.style.display = "none";
    audioOnOff.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;

    // Get the obstacle element and add an animation class
    const obstacle = document.querySelector(".obstacle");
    obstacle.classList.add("obstacleAni");

    // Add a click event listener to toggle audio on/off
    audioOnOff.addEventListener("click", () => {
      if (audio.paused) {
        audio.play(); // Play the audio
        audioOnOff.innerHTML = `<i class="fa-solid fa-volume-high"></i>`; // Update the icon
      } else {
        audio.pause(); // Pause the audio
        audioOnOff.innerHTML = `<i class="fa-solid fa-volume-off"></i>`; // Update the icon
      }
    });

    // Add a keydown event listener for game controls
    document.onkeydown = function (e) {
      if (e.keyCode == 38) {
        defender = document.querySelector(".defender");
        defender.classList.add("animateDefender");
        setTimeout(() => {
          defender.classList.remove("animateDefender");
        }, 700);
      }
      if (e.keyCode == 39) {
        defender = document.querySelector(".defender");
        defenderX = parseInt(
          window.getComputedStyle(defender, null).getPropertyValue("left")
        );
        defender.style.left = defenderX + 112 + "px";
      }
      if (e.keyCode == 37) {
        defender = document.querySelector(".defender");
        defenderX = parseInt(
          window.getComputedStyle(defender, null).getPropertyValue("left")
        );
        defender.style.left = defenderX - 112 + "px";
      }
    };
  }

  // Main game loop using setInterval
  setInterval(() => {
    // Get the defender and obstacle elements
    defender = document.querySelector(".defender");
    obstacle = document.querySelector(".obstacle");

    // Get positions and dimensions for collision detection
    dx = parseInt(
      window.getComputedStyle(defender, null).getPropertyValue("left")
    );
    dy = parseInt(
      window.getComputedStyle(defender, null).getPropertyValue("top")
    );

    ox = parseInt(
      window.getComputedStyle(obstacle, null).getPropertyValue("left")
    );
    oy = parseInt(
      window.getComputedStyle(obstacle, null).getPropertyValue("top")
    );

    // Calculate the offset between defender and obstacle
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    // Check for collision
    if (offsetX < 73 && offsetY < 52) {
      console.log("Collision");
      const gameOver = document.querySelector(".gameOver");
      const defender = document.querySelector(".defender");
      const audioOnOff = document.querySelector(".audioOnOff");
      gameOver.innerHTML = `GAME OVER!<br>Refresh to restart`;
      gameOver.style.display = "block";
      obstacle.classList.remove("obstacleAni");
      defender.classList.add("defenderDown");
      audioOnOff.innerHTML = `<i class="fa-solid fa-volume-off"></i>`;
      clashAudio.play();
      audio.pause();
      setTimeout(() => {
        clashAudio.pause();
        audio.pause();
      }, 1000);
    } else if (offsetX < 145 && cross) {
      // Increase the score and update it
      score += 1;
      updateScore(score);
      cross = false;
      setTimeout(() => {
        cross = true;
      }, 1000);
      setTimeout(() => {
        // Adjust obstacle animation duration to increase difficulty
        aniDur = parseFloat(
          window
            .getComputedStyle(obstacle, null)
            .getPropertyValue("animation-duration")
        );
        newDur = aniDur - 0.1;
        obstacle.style.animationDuration = newDur + "s";
      }, 500);
    }
  }, 10);

  // Function to update the score displayed on the page
  function updateScore(score) {
    const scoreCont = document.getElementById("scoreCont");
    scoreCont.innerHTML = "Your Score: " + score;
  }
});
