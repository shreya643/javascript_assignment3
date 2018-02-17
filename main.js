// setup canvas

var para = document.querySelector('p');
var count = 0;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = 800;
var height = canvas.height = 600;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//---------------------------------------------

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

//---------------------------------------------

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

//---------------------------------------------

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

//---------------------------------------------

blackHole = function() {
  ctx.beginPath();
  ctx.strokeStyle = 'white' ;
  ctx.arc(400, 300, 10, 0, 2 * Math.PI);
  ctx.stroke();
};

blackHole.prototype.collisionDetect = function() {
    for(var j = 0; j < balls.length; j++) {
        if( balls[j].exists ) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                count--;
                para.textContent = 'Ball count: ' + count;
            }
        }
    }
};

var balls = [];

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);


  var BlackHole = new blackHole();

  while (balls.length < 50) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
    count++;
  }
  }

  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();

  }

  BlackHole.collisionDetect();
  requestAnimationFrame(loop);
}

loop();


