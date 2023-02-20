const searchedWord = document.querySelector('.searched-word');
const popupBox = document.querySelector('.popup');
const warningPopup = document.querySelector('.popup-warning');
const wrongLettersContainer = document.querySelector('.wrong-letters');
const hangMan = document.querySelectorAll('.man');
const playAgainBtn = document.getElementById("play-again")
const keyboard = document.querySelector('.keyboard');
let correctLetters = [];
let wrongLetters = [];

// choosing random word and showing on screen
const randomWord = () => {
    const words = ['dolunay', 'magdalena', 'peeing', 'wroclaw', 'water', 'street', 'tie', 'absolute', 'beer', 'category',
        'wall', 'burger', 'sauce', 'lahmacun', 'wood', 'board', 'keyboard', 'earthquake', 'table', 'wedding', 'mouse', 'australia', 'polish', 'madagascar',
        'carnival', 'sheet', 'function', 'element', 'relative', 'dragon', 'train', 'silks', 'pole', 'turkish', 'marriage', 'meat', 'halal',
        'meeting', 'busy', 'busstop', 'umbrella', 'teach', 'teacher', 'bearing', 'honeymoon', 'honey', 'baby', 'kids', 'children', 'babe', 'phobia', 'catastrophe',
        'holocaust', 'disaster', 'tragedy', 'misfortune', 'underground', 'painkiller', 'blowing', 'mindset', 'change', 'clothes', 'tickling', 'tumble', 'thunder',
        'grain', 'size', 'materials', 'engineer', 'zoo', 'machine', 'veterinary', 'medicine', 'pharmacy', 'translator', 'ruins',
        'wednesday', 'thursday', 'tuesday', 'monday', 'sunflower', 'nuts', 'cologne', 'glass', 'cup', 'mercedes', 'football', 'basketball', 'friendship',
        'friends', 'bebek', 'lock', 'treasure', 'hidden', 'word', 'program', 'programming', 'class', 'orderlist', 'joke', 'devil', 'easily', 'harder', 'beautiful',
        'convoy', 'covboy', 'hat', 'trick', 'offside', 'penalty', 'hungry', 'death', 'check', 'belly', 'front', 'start', 'finish', 'end', 'movie', 'series',
        'serial', 'killer', 'kill', 'multilanguage', 'language', 'motherlanguage', 'bilingual', 'learn', 'sticky', 'sticker', 'youtube', 'what', 'which',
        'whatsapp', 'heater', 'system', 'heatingsystem', 'clothespan', 'pan', 'candle', 'hug', 'cuddle', 'rope', 'gift', 'dancing', 'bardzo', 'goodnight',
        'goodmorning', 'morning', 'halsey', 'washington', 'newyork', 'poznan', 'flight', 'ticket', 'computer', 'science', 'software', 'szortyka', 'money',
        'richbitch', 'reach', 'mountain', 'romantic', 'sadpotato', 'tomato', 'banana', 'kiwi', 'fruits', 'vegetables', 'sorry', 'ask', 'later', 'earlier',
        'pumpkin', 'lettuce', 'orange', 'bread', 'apricot', 'peach', 'beach', 'sunny', 'funny', 'best', 'licking', 'hitting', 'fight',
        'vocabulary', 'handsome', 'drink', 'cooker', 'chef', 'loose', 'game', 'hangman', 'bomb', 'packing', 'destroy', 'distrub', 'numbers', 'padding', 'paste',
        'trimmer', 'trigger', 'lowercase', 'capitalize', 'train', 'visual', 'studio', 'scale', 'frighten', 'shock', 'alarm', 'scaring', 'package',
        'damn', 'validate', 'birthday', 'fullmoon', 'rocket', 'fullmoon', 'trend', 'letters', 'postcard', 'bunny', 'careful', 'care', 'carriage', 'simple',
        'postman', 'cargo', 'delivery', 'hanging', 'brutal', 'cruel', 'savage', 'axis', 'heart', 'shopping', 'centre', 'central', 'point', 'view', 'murder', 'skii',
        'direct', 'doctor', 'teeth', 'toothpaste', 'realize', 'scissors', 'pen', 'eraser', 'paper', 'three', 'bubble', 'grinding', 'sand', 'cable', 'telephone',
        'magical', 'natural', 'nature', 'translate', 'kidding', 'ultra', 'awesome', 'spectacular', 'amazing', 'impossible', 'margin', 'bottom', 'handle',
        'problem', 'laptop', 'bakery', 'pastry', 'turtle', 'turn', 'lightning', 'streak', 'strike', 'attack', 'symptom', 'parasite', 'sickness', 'apparent',
        'zloty', 'grocery', 'butcher', 'surgery', 'survey', 'sunbath', 'creamy', 'jealous', 'jelly', 'leather', 'landscape', 'command', 'submissive', 'comfortable',
        'yield', 'fluent', 'kissing', 'write', 'elephant', 'elevator', 'aubergine', 'hotwine', 'carrothead', 'wardrobe', 'master', 'divide', 'divison', 'account',
        'humanistic', 'germany', 'strength', 'armor', 'printer', 'wolf', 'frog', 'confuse', 'complain', 'compatible', 'gangster', 'thief', 'wrap', 'cactus',
        'onion', 'bathtube', 'astronaut', 'travel', 'diary', 'dystopia', 'witcher', 'claustrophobia', 'quality', 'quote', 'quiet'];
    return words[Math.floor(Math.random() * words.length)]
}

let selectedWord = randomWord().toLowerCase().trim();

const displayWord = () => {
    searchedWord.innerHTML = `${selectedWord.split('')
        .map(letter => ` <div class="letter"> ${correctLetters.includes(letter) ? letter : ''} </div> `).join('')}`;

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


//keydown event
window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
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

//Display popup
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

//Show parts of HangMan
const displayHangman = () => {
    hangMan.forEach((item, index) => {
        let countWrongLetters = wrongLetters.length;
        if (index < countWrongLetters) {
            item.style.visibility = "visible"
        } else { item.style.visibility = "hidden" }
        if (wrongLetters.length === hangMan.length) {
            displayPopup("You Lost", "You hanged the man and he died :(");
        }
    });
}

//Play again
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

//Create KeyBoard
const keyboardKeys = () => {
    const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));
    alphabet.forEach(key => {
        keyboard.innerHTML += `<div class="key">${key}</div>`
    })
}

keyboardKeys();
displayWord();



