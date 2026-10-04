let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let bestScore = localStorage.getItem("bestScore");

if (bestScore) {
    document.getElementById("bestScore").textContent = bestScore;
}

const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");

guessBtn.addEventListener("click", () => {

    const guess = Number(guessInput.value);

    // Validate input
    if (!guess || guess < 1 || guess > 100) {
        message.textContent = "Enter a number between 1-100";
        message.style.color = "#facc15";
        return;
    }

    attempts++;
    attemptsEl.textContent = attempts;

    // Correct answer
    if (guess === randomNumber) {

        message.textContent = `🎉 Correct! Number was ${randomNumber}`;
        message.style.color = "#22c55e";

        if (!bestScore || attempts < bestScore) {
            localStorage.setItem("bestScore", attempts);
            document.getElementById("bestScore").textContent = attempts;
            bestScore = attempts;
        }
    }

    // Guess is higher
    else if (guess > randomNumber) {

        const difference = guess - randomNumber;

        if (difference <= 5) {
            message.textContent = "🔥 High! You're very close";
            message.style.color = "#a78bfa";
        }
        else if (difference <= 15) {
            message.textContent = "📈 Very High! You're getting close";
            message.style.color = "#fb7185";
        }
        else {
            message.textContent = "🚀 Too High! Try a much lower number";
            message.style.color = "#ef4444";
        }
    }
    else {

        const difference = randomNumber - guess;

        if (difference <= 5) {
            message.textContent = "🔥 Low! You're very close";
            message.style.color = "#a78bfa";
        }
        else if (difference <= 15) {
            message.textContent = "📉 Very Low! You're getting close";
            message.style.color = "#38bdf8";
        }
        else {
            message.textContent = "❄️ Too Low! Try a much higher number";
            message.style.color = "#06b6d4";
        }
    }

    guessInput.value = "";
});


// New Game
restartBtn.addEventListener("click", () => {

    randomNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;

    attemptsEl.textContent = 0;

    message.textContent = "Start Guessing...";
    message.style.color = "#fff";

    guessInput.value = "";

    guessInput.focus();
});
