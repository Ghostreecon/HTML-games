let level = 1;
let lives = 3;
let score = 0;
let timeLimit = 10; // Temps limite en secondes
let secretNumber;
let timer;

function initializeGame() {
    const range = Math.pow(10, level); // Définit l'intervalle selon le niveau
    secretNumber = Math.floor(Math.random() * range) + 1;

    document.getElementById("instructions").textContent =
        `Niveau ${level} : Devinez un nombre entre 1 et ${range}.`;
    document.getElementById("feedback").textContent = "";
    document.getElementById("score").textContent = `Score : ${score}`;
    document.getElementById("lives").textContent = `Vies restantes : ${lives}`;
    document.getElementById("guess").value = "";

    startTimer();
}

function startTimer() {
    let timeRemaining = timeLimit;
    timer = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            lives--;
            updateLives();
            if (lives > 0) {
                alert("Temps écoulé ! Vous perdez une vie.");
                initializeGame();
            }
        }
    }, 1000);
}

function makeGuess() {
    clearInterval(timer);

    const guess = parseInt(document.getElementById("guess").value);
    if (isNaN(guess)) {
        document.getElementById("feedback").textContent =
            "Veuillez entrer un nombre valide.";
        startTimer(); // Reprendre le chrono
        return;
    }

    if (guess === secretNumber) {
        score += level * 10; // Points basés sur le niveau
        level++;
        alert("Bravo ! Vous avez trouvé le nombre.");
        initializeGame();
    } else {
        lives--;
        updateLives();
        if (lives > 0) {
            document.getElementById("feedback").textContent =
                guess < secretNumber ? "C'est plus !" : "C'est moins !";
            startTimer(); // Reprendre le chrono
        }
    }
}

function updateLives() {
    document.getElementById("lives").textContent = `Vies restantes : ${lives}`;
    if (lives <= 0) {
        alert(`Partie terminée ! Votre score final est de ${score}.`);
        resetGame();
    }
}

function resetGame() {
    level = 1;
    lives = 3;
    score = 0;
    initializeGame();
}

// Lancer le jeu
initializeGame();