// Variables globales
let scores, roundScore, activePlayer, gamePlaying;
const diceDOM = document.querySelector(".dice");
const rollBtn = document.getElementById("roll-btn");
const holdBtn = document.getElementById("hold-btn");
const playerPanels = document.querySelectorAll(".player-panel");

// Nouvelle partie
document.getElementById("new-btn").addEventListener("click", init);

// Initialisation du jeu
init();

// Lancer le dé
rollBtn.addEventListener("click", () => {
    if (gamePlaying) {
        // Générer un nombre aléatoire entre 1 et 6
        const dice = Math.floor(Math.random() * 6) + 1;
        // Afficher l'image correspondante au dé
        diceDOM.style.display = "block";
        diceDOM.src = `images/${dice}.png`;
        diceDOM.alt = `Image de dé par défaut ${dice}`;
        // Mettre à jour le score du tour actuel si le résultat est différent de 1
        if (dice !== 1) {
            roundScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent =
                roundScore;
        } else {
            // Passer au joueur suivant
            nextPlayer();
        }
    }
});

// Passer le tour
holdBtn.addEventListener("click", () => {
    if (gamePlaying) {
        // Ajouter le score du tour actuel au score global du joueur actif
        scores[activePlayer] += roundScore;
        // Mettre à jour l'affichage du score global du joueur actif
        document.getElementById(`score-${activePlayer}`).textContent =
            scores[activePlayer];
        // Vérifier si le joueur a gagné
        if (scores[activePlayer] >= 100) {
            document.getElementById(`name-${activePlayer}`).textContent =
                "Gagnant !";
            diceDOM.style.display = "none";
            playerPanels[activePlayer].classList.add("winner");
            playerPanels[activePlayer].classList.remove("active");
            gamePlaying = false;
            rollBtn.disabled = true; // Désactiver le bouton "Lancer le dé"
            holdBtn.disabled = true; // Désactiver le bouton "Hold"
        } else {
            // Passer au joueur suivant
            nextPlayer();
        }
    }
});

// Fonction pour passer au joueur suivant
function nextPlayer() {
    roundScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = "0";
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    playerPanels[0].classList.toggle("active");
    playerPanels[1].classList.toggle("active");
    diceDOM.style.display = "none";
    diceDOM.src = "images/de.png";
    diceDOM.alt = "Image de dé par défaut";
    diceDOM.style.display = "block";
}

// Fonction d'initialisation du jeu
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Score Joueur 1";
    document.getElementById("name-1").textContent = "Score Joueur 2";

    diceDOM.style.display = "block";
    diceDOM.src = "images/de.png";
    diceDOM.alt = "Image de dé par défaut";

    playerPanels[0].classList.remove("winner");
    playerPanels[1].classList.remove("winner");
    rollBtn.disabled = false; // Activer le bouton "Lancer le dé"
    holdBtn.disabled = false; // Activer le bouton "Hold"
}
