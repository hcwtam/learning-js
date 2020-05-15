/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, currentPlayer, gameState, roll6Twice;

// Initialise game
init();

// Roll button
document.querySelector('.btn-roll').addEventListener('click',function() {
    if (gameState) {
        var score1 = Math.floor(Math.random() * 6) + 1;
        var score2 = Math.floor(Math.random() * 6) + 1;
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-2').style.display = 'block';
        document.querySelector('#dice-1').src = "dice-" + score1 + '.png';
        document.querySelector('#dice-2').src = "dice-" + score2 + '.png';

        /*
        if (score === 6) roll6Twice++;
        if (roll6Twice === 2) {
            scores[currentPlayer] = 0;
            document.getElementById('score-' + currentPlayer).textContent = 0;
            roundEnd();
        }
        
        */
        
        if (score1 > 1 && score2 > 1) {
            roundScore += score1 + score2;
            document.getElementById('current-' + currentPlayer).textContent = roundScore;
        } else {
            roundScore = 0;
            roundEnd();
        }
    }  
})
document.querySelector


// Hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gameState) {
        scores[currentPlayer] += roundScore;
        roundScore = 0;
        document.getElementById('score-' + currentPlayer).textContent = scores[currentPlayer];
        var scoreToWin = document.querySelector('.input').value;
        if (!scoreToWin) scoreToWin = 100;

        if (scores[currentPlayer] >= scoreToWin) {
            document.querySelector('.player-'+ currentPlayer + '-panel').classList.add('winner');
            document.getElementById('name-'+ currentPlayer).textContent = 'WINNER!';
            document.querySelector('.player-'+ currentPlayer + '-panel').classList.remove('active');
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            gameState = false;
        } else {
        roundEnd();
        }
    }
})

// Restart button
document.querySelector('.btn-new').addEventListener('click', init)

// Initialisation function
function init() {
    scores = [0, 0];
    roundScore = 0;
    currentPlayer = 0;
    gameState = true;
    roll6Twice = 0;

    document.getElementById('score-0').textContent = scores[0];
    document.getElementById('score-1').textContent = scores[1];
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}

// Round end function
function roundEnd() {
    (currentPlayer === 0) ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;
    roll6Twice = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
}