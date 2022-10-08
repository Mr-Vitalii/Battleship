

//*Object First

const model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
        { locations: [0, 0, 0], hits: ["", "", ""] },
    ],

    fire: function (guess) {
        for (let i = 0; i < this.numShips; i += 1) {
            const ship = this.ships[i];
            const index = ship.locations.indexOf(guess);


            if (ship.hits[index] === "hit") {
                showMessageAlreadyUsed()
                setTimeout(messageAreaNoneAlreadyUsed, 3200);
                return true;
            } else if (index >= 0) {
                ship.hits[index] = "hit";
                showCountdown()
                setTimeout(showMessageAreaStart, 10000)
                setTimeout(messageAreaNoneStart, 15000)
                setTimeout(showVideoLaunch, 10000);
                showWarning()
                setTimeout(showVideoHit, 21000);
                setTimeout(showHit, 29800, guess);
                setTimeout(showMessageAreaHit, 29800);
                setTimeout(messageAreaNoneHit, 31200);


                if (this.isSunk(ship)) {
                    setTimeout(showVideoSank, 32400)
                    setTimeout(showMessageAreaSank, 35400);
                    setTimeout(messageAreaNoneSank, 40400);
                    //setTimeout(showMessageAreaSank, 21300);
                    // setTimeout(messageAreaNoneSank, 27000);
                    this.shipsSunk++;
                }
                return true;
            }
        }
        showCountdown()
        setTimeout(showMessageAreaStart, 10000)
        setTimeout(messageAreaNoneStart, 15000)
        setTimeout(showVideoLaunch, 10000);
        showWarning()
        setTimeout(showVideoMiss, 21000);
        setTimeout(showMiss, 24800, guess);
        setTimeout(showMessageAreaMiss, 24800);
        setTimeout(messageAreaNoneMiss, 26200);


        return false;
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i += 1) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function () {
        let locations;
        for (let i = 0; i < this.numShips; i += 1) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },

    generateShip: function () {
        const direction = Math.floor(Math.random() * 2);
        let row, col;
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
            col = Math.floor(Math.random() * this.boardSize);
        }

        const newShipLocations = [];
        for (let i = 0; i < this.shipLength; i += 1) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push(row + i + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function (locations) {
        for (let i = 0; i < this.numShips; i += 1) {
            const ship = model.ships[i];
            for (let j = 0; j < locations.length; j += 1) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },
};

//*Object Second

const controller = {
    guesses: 0,

    processGuess: function (guess) {
        const location = parseGuess(guess);
        if (location) {
            this.guesses += 1;
            const hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                setTimeout(showMessageAreaAllSunk, 41400)
                setTimeout(messageAreaNoneAllSunk, 50400);
                //view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    },
};


function parseGuess(guess) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        showMessageInvalidDate();
        setTimeout(messageAreaNoneInvalidDate, 3200);
    } else {
        firstChar = guess.charAt(0);
        const row = alphabet.indexOf(firstChar);
        const column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            showMessageInvalidDate();
            setTimeout(messageAreaNoneInvalidDate, 3200);
        } else if (
            row < 0 ||
            row >= model.boardSize ||
            column < 0 ||
            column >= model.boardSize
        ) {
            showMessageInvalidDate();
            setTimeout(messageAreaNoneInvalidDate, 3200);
        } else {
            return row + column;
        }
    }
    return null;
}

function handleFireButton() {
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value.toUpperCase();
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    const fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;

function init() {
    const fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;


    const guessInput = document.getElementById("guessInput");
    guessInput.onkeydown = handleKeyPress;

    model.generateShipLocations();
}



//!Показывает видео выстрела!

function showVideoLaunch() {
    const showShot = document.getElementById("showShot_videoLaunch");
    showShot.classList.add('active')
    setTimeout("hideVideoLaunch();", 8550);
    document.getElementById('showShot_videoLaunch').style.display = "block";
}

//!Прячет видео выстрела
function hideVideoLaunch() {
    document.getElementById('showShot_videoLaunch').style.display = "none";
}




//!Показывает Start на экране!
function showMessageAreaStart() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "START";
    return messageArea.innerHTML
}

//!Скрывает Start на экране!
function messageAreaNoneStart() {
    document.getElementById('messageArea').style.display = "none";
}


//!Показывает All battleships are sunk на экране!
function showMessageAreaAllSunk() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "All battleships are sunk";
    return messageArea.innerHTML
}

//!Скрывает All battleships are sunk на экране!
function messageAreaNoneAllSunk() {
    document.getElementById('messageArea').style.display = "none";
}


//!Показывает MISS на экране!
function showMessageAreaMiss() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "MISS"
    return messageArea.innerHTML
}



//!Скрывает MISS на экране!
function messageAreaNoneMiss() {
    document.getElementById('messageArea').style.display = "none";
}




//!Показывает HIT! на экране + display = "block"
function showMessageAreaHit() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "HIT";
    return messageArea.innerHTML
}

//!Скрывает HIT!! на экране
function messageAreaNoneHit() {
    document.getElementById('messageArea').style.display = "none";
}





//!Показывает You sank my battleship!!! на экране + display = "block"
function showMessageAreaSank() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "Ship destroyed";
    return messageArea.innerHTML
}

//!Скрывает You sank my battleship!!!!! на экране
function messageAreaNoneSank() {
    document.getElementById('messageArea').style.display = "none";
}




//!Показывает (ввел неверное число) на экране + display = "block"
function showMessageInvalidDate() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "Invalid Coordinate Data";
    return messageArea.innerHTML
}

//!Скрывает (ввел неверное число) на экране
function messageAreaNoneInvalidDate() {
    document.getElementById('messageArea').style.display = "none";
}



//!Показывает (ввел одно и тоже число) на экране + display = "block"
function showMessageAlreadyUsed() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "Coordinates already used";
    return messageArea.innerHTML
}

//!Скрывает (ввел одно и тоже число число) на экране
function messageAreaNoneAlreadyUsed() {
    document.getElementById('messageArea').style.display = "none";
}




//!Показывает картинку Hit!!!
function showHit(location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
}

//!Показывает картинку Miss!!!
function showMiss(location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "miss",);
}




//!Показывает видео промаха
function showVideoMiss() {
    const showVideoMiss = document.getElementById('showShot_videoMiss');
    showVideoMiss.classList.add('active')
    setTimeout(hideVideoMiss, 6900);
    document.getElementById('showShot_videoMiss').style.display = "block";
}

//!Прячет видео промаха
function hideVideoMiss() {
    document.getElementById('showShot_videoMiss').style.display = "none";
}




//!Показывает видео попадания
function showVideoHit() {
    const showVideoHit = document.getElementById('showShot_videoHit');
    showVideoHit.classList.add('active')
    setTimeout(hideVideoHit, 10100);
    document.getElementById('showShot_videoHit').style.display = "block";
}

//!Прячет видео попадания
function hideVideoHit() {
    document.getElementById('showShot_videoHit').style.display = "none";
}



//!Показывает видео потопления
function showVideoSank() {
    const showVideoSank = document.getElementById('showVideo_Sank');
    showVideoSank.classList.add('active')
    setTimeout(hideVideoSank, 13000);
    document.getElementById('showVideo_Sank').style.display = "block";
}

//!Прячет видео потопления
function hideVideoSank() {
    document.getElementById('showVideo_Sank').style.display = "none";
}




//!Показывает gif Warning
function showWarning() {
    const showWarning = document.getElementById("warning");
    showWarning.classList.add('active')
    setTimeout(hideWarning, 10000);
    document.getElementById('warning').style.display = "block";
}

//!Скрывает gif Warning
function hideWarning() {
    document.getElementById('warning').style.display = "none";
}

//! Звук Warning
const audioAlarm = new Audio("./audio/alarm1.mp3");
document.querySelector(".buttonFire").addEventListener('click', function (guess) {
    audioAlarm.play();
})





//!Показывает gif countdown
function showCountdown() {
    const showCountdown = document.getElementById("countdown");
    showCountdown.classList.add('active')
    setTimeout(hideCountdown, 10000);
    document.getElementById('countdown').style.display = "block";
}

//!Скрывает gif countdown
function hideCountdown() {
    document.getElementById('countdown').style.display = "none";
}