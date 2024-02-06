const letters = 'abcdefghijklmnopqrstuvwxyz#+.';
let ltrsArr = Array.from(letters);
let ltrsContainer = document.querySelector('.letters');
ltrsArr.forEach(letter => {
    let span = document.createElement('span');
    let letterTxt = document.createTextNode(letter);
    span.appendChild(letterTxt);
    span.className = 'letter-box';
    ltrsContainer.appendChild(span);
});


const words = {
    programming: ['generic programming', 'oop', 'functional programming'],
    language: ['c++', 'java', 'python', 'typescript', 'javascript', 'c#', 'php', 'ruby', 'go'],
    framework: ['stl', 'django', 'express.js','next.js', 'react', 'angular', 'vue.js', 'node.js'],
    algorithm: ['dynamic programming', 'greedy algorithms', 'divide and conquer algorithms', 'backtracking algorithms', 'breadth-first search', 'depth-first search']
};

let allKeys = Object.keys(words);
let randomNum = Math.floor(Math.random() * allKeys.length);
let randomName = allKeys[randomNum];
let randomPropValue = words[randomName];
let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
let random_VALUE = randomPropValue[randomValueNum];

document.querySelector('.info .category span').innerHTML = `${randomName}`;

let guessLetterContainer = document.querySelector('.letters-guess');
let letter_space = Array.from(random_VALUE);
letter_space.forEach(letter => {
    let emptySpan = document.createElement('span');
    if (letter === ' ') {
        emptySpan.className = 'has-space';
    }
    guessLetterContainer.appendChild(emptySpan);
});

let guessSpan = document.querySelectorAll('.letters-guess span');
let wrongTry = 0;
let draw = document.querySelector('.hangman-draw');

document.addEventListener('click', (e) => {
    let status = false;

    if (e.target.className === 'letter-box') {
        e.target.classList.add('clicked');
        let ltrClicked = e.target.innerHTML.toLowerCase();
        
        let chossenWord = Array.from(random_VALUE.toLowerCase());

        letter_space.forEach((wordLtr, wordIdx) => {
            if (ltrClicked == wordLtr) {
                status = true;
                guessSpan.forEach((span, spanIdx)=> {
                    if (wordIdx === spanIdx) {
                        span.innerHTML = ltrClicked;
                    }
                })
            }
        })  // end loop
        if (status !== true) { 
            wrongTry++;
            draw.classList.add(`wrong-${wrongTry}`);
            document.getElementById('game-over').play();
            if (wrongTry === 8) {
                endGame();
                ltrsContainer.classList.add('finished');
            }
        } else {
            document.getElementById('win').play();
            let allLettersGuessed = Array.from(guessSpan).every(span => span.innerHTML !== '');
            if (allLettersGuessed) {
                ltrsContainer.classList.add('finished');
                winGame();
            }

        }
    }
})


endGame = () => {
    let div = document.createElement('div');
    let divTxt = document.createTextNode(`Game  Over! The Word was : ${random_VALUE} `);
    div.appendChild(divTxt);
    div.className = 'popup';
    document.body.appendChild(div);
    setTimeout(() => {
        alert('اتشنقت يـ معلم');
    }, 1000);
}

winGame = () => {
    let div = document.createElement('div');
    let divTxt = document.createTextNode(`Nice ,  You Guess the word true`);
    div.appendChild(divTxt);
    div.className = 'popupWin';
    document.body.appendChild(div);
    
}