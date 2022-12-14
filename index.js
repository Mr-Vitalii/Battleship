

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



//!???????????????????? ?????????? ????????????????!

function showVideoLaunch() {
    const showShot = document.getElementById("showShot_videoLaunch");
    showShot.classList.add('active')
    setTimeout("hideVideoLaunch();", 8550);
    document.getElementById('showShot_videoLaunch').style.display = "block";
}

//!???????????? ?????????? ????????????????
function hideVideoLaunch() {
    document.getElementById('showShot_videoLaunch').style.display = "none";
}




//!???????????????????? Start ???? ????????????!
function showMessageAreaStart() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "START";
    return messageArea.innerHTML
}

//!???????????????? Start ???? ????????????!
function messageAreaNoneStart() {
    document.getElementById('messageArea').style.display = "none";
}


//!???????????????????? All battleships are sunk ???? ????????????!
function showMessageAreaAllSunk() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "All battleships are sunk";
    return messageArea.innerHTML
}

//!???????????????? All battleships are sunk ???? ????????????!
function messageAreaNoneAllSunk() {
    document.getElementById('messageArea').style.display = "none";
}


//!???????????????????? MISS ???? ????????????!
function showMessageAreaMiss() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "MISS"
    return messageArea.innerHTML
}



//!???????????????? MISS ???? ????????????!
function messageAreaNoneMiss() {
    document.getElementById('messageArea').style.display = "none";
}




//!???????????????????? HIT! ???? ???????????? + display = "block"
function showMessageAreaHit() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "HIT";
    return messageArea.innerHTML
}

//!???????????????? HIT!! ???? ????????????
function messageAreaNoneHit() {
    document.getElementById('messageArea').style.display = "none";
}





//!???????????????????? You sank my battleship!!! ???? ???????????? + display = "block"
function showMessageAreaSank() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "Ship destroyed";
    return messageArea.innerHTML
}

//!???????????????? You sank my battleship!!!!! ???? ????????????
function messageAreaNoneSank() {
    document.getElementById('messageArea').style.display = "none";
}




//!???????????????????? (???????? ???????????????? ??????????) ???? ???????????? + display = "block"
function showMessageInvalidDate() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "Invalid Coordinate Data";
    return messageArea.innerHTML
}

//!???????????????? (???????? ???????????????? ??????????) ???? ????????????
function messageAreaNoneInvalidDate() {
    document.getElementById('messageArea').style.display = "none";
}



//!???????????????????? (???????? ???????? ?? ???????? ??????????) ???? ???????????? + display = "block"
function showMessageAlreadyUsed() {
    document.getElementById('messageArea').style.display = "block";
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = "Coordinates already used";
    return messageArea.innerHTML
}

//!???????????????? (???????? ???????? ?? ???????? ?????????? ??????????) ???? ????????????
function messageAreaNoneAlreadyUsed() {
    document.getElementById('messageArea').style.display = "none";
}




//!???????????????????? ???????????????? Hit!!!
function showHit(location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
}

//!???????????????????? ???????????????? Miss!!!
function showMiss(location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "miss",);
}




//!???????????????????? ?????????? ??????????????
function showVideoMiss() {
    const showVideoMiss = document.getElementById('showShot_videoMiss');
    showVideoMiss.classList.add('active')
    setTimeout(hideVideoMiss, 6900);
    document.getElementById('showShot_videoMiss').style.display = "block";
}

//!???????????? ?????????? ??????????????
function hideVideoMiss() {
    document.getElementById('showShot_videoMiss').style.display = "none";
}




//!???????????????????? ?????????? ??????????????????
function showVideoHit() {
    const showVideoHit = document.getElementById('showShot_videoHit');
    showVideoHit.classList.add('active')
    setTimeout(hideVideoHit, 10100);
    document.getElementById('showShot_videoHit').style.display = "block";
}

//!???????????? ?????????? ??????????????????
function hideVideoHit() {
    document.getElementById('showShot_videoHit').style.display = "none";
}



//!???????????????????? ?????????? ????????????????????
function showVideoSank() {
    const showVideoSank = document.getElementById('showVideo_Sank');
    showVideoSank.classList.add('active')
    setTimeout(hideVideoSank, 13000);
    document.getElementById('showVideo_Sank').style.display = "block";
}

//!???????????? ?????????? ????????????????????
function hideVideoSank() {
    document.getElementById('showVideo_Sank').style.display = "none";
}




//!???????????????????? gif Warning
function showWarning() {
    const showWarning = document.getElementById("warning");
    showWarning.classList.add('active')
    setTimeout(hideWarning, 10000);
    document.getElementById('warning').style.display = "block";
}

//!???????????????? gif Warning
function hideWarning() {
    document.getElementById('warning').style.display = "none";
}

//! ???????? Warning
const audioAlarm = new Audio("./audio/alarm1.mp3");
document.querySelector(".buttonFire").addEventListener('click', function (guess) {
    audioAlarm.play();
})





//!???????????????????? gif countdown
function showCountdown() {
    const showCountdown = document.getElementById("countdown");
    showCountdown.classList.add('active')
    setTimeout(hideCountdown, 10000);
    document.getElementById('countdown').style.display = "block";
}

//!???????????????? gif countdown
function hideCountdown() {
    document.getElementById('countdown').style.display = "none";
}