let currentIndex = 0;
let revealed = false;
let hiddenField = null;

let cards = [...flashcards];

const flashcardElement = document.getElementById("flashcard");
const cardContent = document.querySelector(".card-content");
const progressElement = document.getElementById("progress");
const clickHint = document.querySelector(".click-hint");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");


function chooseHiddenField() {
    const fields = Object.keys(cards[currentIndex]);

    // Pick a random field from this card's own fields.
    hiddenField = fields[Math.floor(Math.random() * fields.length)];
}


function renderCard() {
    const card = cards[currentIndex];

    cardContent.innerHTML = "";

    Object.entries(card).forEach(([key, value]) => {
        const row = document.createElement("div");
        row.className = "card-row";

        const label = document.createElement("div");
        label.className = "label";
        label.textContent = key;

        const content = document.createElement("div");
        content.className = "value";

        if (key === hiddenField && !revealed) {
            content.textContent = "••••••••";
            content.classList.add("hidden-value");
        } else {
            content.textContent = value;
        }

        row.appendChild(label);
        row.appendChild(content);
        cardContent.appendChild(row);
    });

    progressElement.textContent = `${currentIndex + 1} / ${cards.length}`;

    clickHint.textContent = revealed
        ? "Click to hide"
        : "Click to reveal";
}


function revealCard() {
    revealed = !revealed;
    renderCard();
}


function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    revealed = false;
    chooseHiddenField();
    renderCard();
}


function previousCard() {
    currentIndex =
        (currentIndex - 1 + cards.length) % cards.length;

    revealed = false;
    chooseHiddenField();
    renderCard();
}


function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    currentIndex = 0;
    revealed = false;
    chooseHiddenField();
    renderCard();
}


flashcardElement.addEventListener("click", revealCard);
nextBtn.addEventListener("click", nextCard);
prevBtn.addEventListener("click", previousCard);
shuffleBtn.addEventListener("click", shuffleCards);


document.addEventListener("keydown", (event) => {
    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {
        return;
    }

    switch (event.key) {
        case " ":
        case "Enter":
            event.preventDefault();
            revealCard();
            break;

        case "ArrowRight":
            nextCard();
            break;

        case "ArrowLeft":
            previousCard();
            break;
    }
});


// Initial card
chooseHiddenField();
renderCard();
