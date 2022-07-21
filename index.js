// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1numThrows = 0
let player2numThrows = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const container = document.getElementsByClassName('container')
const checkBox = document.getElementById('doubleOrNothing')
let nums = []

function numberAnimation(player, test) {
    nums = []
    test.classList.add('animation')
    for (let i = 0; i < 6; i++) {
        nums.push(Math.floor(Math.random() * 6) + 1)
        }
    for (let i = 0; i < 6; i++) {
        setTimeout(function(j) {
            player.textContent = nums[j]
        }, i * 125, i)

    } 
}

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {

// Double or nothing checkbox 
function doubleOrNothing() {
    if (checkBox.checked === true && nums[5] > 3) {
        nums[5] *= 2
    } else if (checkBox.checked === true && nums[5] <=3) {
        nums[5] = 0
    }
}

    if (player1Turn) {
        numberAnimation(player1Dice, player1Scoreboard)
        doubleOrNothing()
        player1numThrows++
        player1Score += nums[5]
        player1Scoreboard.textContent = player1Score
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
        player2Scoreboard.classList.remove('animation')
        
    } else {
        numberAnimation(player2Dice, player2Scoreboard)
        doubleOrNothing()
        player2numThrows++
        player2Score += nums[5]
        player2Scoreboard.textContent = player2Score
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
        player1Scoreboard.classList.remove('animation')
    }
    
    if (player1Score >= 20 && player1numThrows === player2numThrows && player1Score > player2Score) {
        message.textContent = "Player 1 win 🥳"
        container[0].setAttribute("id", "inverse") 
        showResetButton()
    }  else if (player2Score >= 20 && player1numThrows === player2numThrows && player2Score > player1Score) {
        message.textContent = "Player 2 win 🎉"
        container[0].setAttribute("id", "inverse") 
        showResetButton()
    }
        else if (player1Score >= 20 && player2Score >= 20 && player2Score === player1Score) {
            message.textContent = "Draw"
            showResetButton()
        }
    
    
    checkBox.checked = false;
    player1Turn = !player1Turn
    
})
 
resetBtn.addEventListener("click", function(){
    reset()
})

function reset() {
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1numThrows = 0
    player2numThrows = 0
    player1Dice.textContent = "-"
    player2Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtn.style.display = "block"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    container[0].removeAttribute("id", "inverse")
}
