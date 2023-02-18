const searchedWord = document.querySelector('.searched-word');
const popupBox = document.querySelector('.popup');
const warningPopup = document.querySelector('.popup-warning');
const wrongLettersContainer = document.querySelector('.wrong-letters');
const hangMan = document.querySelectorAll('.man');
const playAgainBtn = document.getElementById("play-again")
let correctLetters = [];
let wrongLetters = [];

const randomWord = () => {
    const words = ['ALI', 'DOLUNAY', 'MAGDALENA'];
    return words[Math.floor(Math.random() * words.length)]
}
let selectedWord = randomWord().toLowerCase();

window.addEventListener("keydown", function (e) {
    if (e.keyCode = 35 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();
        if (selectedWord.includes(letter) && !correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        } else if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
            displayWarningPopup();
        } else {
            wrongLetters.push(letter);
            displayWrongLetters();
        }
    }
});

const displayPopup = (type, message) => {
    popupBox.innerHTML = `<h1>${type}</h1>
    <p> ${message} </p>
    <button> Play Again </button>`
    popupBox.style.visibility = "visible"
}

const displayWarningPopup = () => {
    warningPopup.style.visibility = "visible"
    setTimeout(function () {
        warningPopup.style.visibility = "hidden"
    }, 2500)
}

const displayWord = () => {
    searchedWord.innerHTML = `${selectedWord.split('').map(letter => `
        <div class="letter"> ${correctLetters.includes(letter) ? letter : ''
        } </div> `
    ).join('')}`;

    const w = searchedWord.innerText.replace(/\n/g, '').toLowerCase();
    if (w == selectedWord) {
        displayPopup("Congratulations", "Congratulations you found the hidden word.");
    }
}

const displayWrongLetters = () => {
    wrongLettersContainer.innerHTML = `<h2> Wrong Letters </h2>
    <p>${wrongLetters}</p>`
    displayHangman();
}

const displayHangman = () => {
    hangMan.forEach((item, index) => {
        let countWrongLetters = wrongLetters.length;

        if (index < countWrongLetters) {
            item.style.visibility = "visible"
        } else { item.style.visibility = "hidden" }
        if (wrongLetters.length === hangMan.length) {
            displayPopup("You Lost", "You couldn't find the hidden word.");
        }
    })

}

popupBox.addEventListener('click', function (e) {
    if (e.target.matches("button")) {
        wrongLetters.splice(0);
        correctLetters.splice(0);

        selectedWord = randomWord().toLowerCase();
        displayHangman();
        displayWord();
        displayWrongLetters();
        popupBox.style.visibility = "hidden"
    }
});

displayWord();



