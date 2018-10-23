'use strict';
/*
* Enemies our player must avoid
*/
var Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

/*
* Updates the enemy's position, required method for game
* Parameter: dt, a time delta between ticks
*/ 
Enemy.prototype.update = function(dt) {
    //Multiplies any movement by dt to make sure movement is the same for all computers
    if(this.x < this.boundary) {
        this.x += this.speed * dt;    
    }
    else {
        this.x = this.resetPos;
    }
};

/*
* Draws the enemy on the screen, required method for game
*/ 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
* Player Class
*/
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
        
    }

    // Draws the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Moves the player across the gameboard by accepting the arrow keys input
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                    this.x -= this.step;    
                }
                
                break;
            case 'up':
                if (this.y > this.jump) {
                    this.y -= this.jump;    
                }
                break;
            case 'right':
                if (this.x < this.step * 4) {
                     this.x += this.step;    
                }
                break;
            case 'down':
                if (this.y < this.jump * 4) {
                this.y += this.jump;    
                }
                break;
            }

        }

    // Updates the position of the player if there is a collision or if the player wins
    update() {
        for(let enemy of allEnemies) {
            if(this.y === enemy.y && (enemy.x + enemy.step/1.36 > this.x && enemy.x < this.x + this.step/1.36) ) {
                this.reset();
            }
        }
            if(this.y === 55) {
                this.victory = true;
            }    
    }

    // Resets the player in the starting position
    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }
}

// Objects are instantiated
const player = new Player();
const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 400);
const bug3 = new Enemy(-101, 83, 300);
const bug4 = new Enemy(-101, 166, 200);
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});