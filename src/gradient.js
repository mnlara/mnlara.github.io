(function(){

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
  
    var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight;
  
    var ctx = canvas.getContext("2d");
  
    ctx.globalCompositeOperation = "saturation";
  
    //stats.js
    var stats = new Stats();
    document.body.appendChild( stats.dom );
  
    var particles = [];
  
    var pIndex = 0;
    var frameId;
  
  
    //particles
  
    function Particle(color,x,y,circleSize,radius){
      this.color = color;
      this.x = 0;
      this.y = 0;
      this.posX = x;
      this.posY = y;
  
      this.circleSize = circleSize;
  
      this.direction = getRandom(-1,1);
  
      this.wave;
      this.amplitude = getRandom(-50,50);
      this.waveSpeed = getRandom(2,3);
      this.speed = getRandom(0.5,1);
  
      particles[pIndex] = this;
      this.id = pIndex;
      pIndex++;
  
      this.radius = radius;
      this.count = 0;
    };
  
    Particle.prototype.draw = function(){
      this.radius += Math.sin(this.count*0.1);
  
      this.wave = Math.sin( Math.PI/180*this.count*this.waveSpeed * this.direction ) * this.amplitude;
  
      this.x = Math.sin( Math.PI/180*this.count * this.speed * this.direction ) * this.circleSize - this.radius/2 + this.wave + this.posX;
      this.y = Math.cos( Math.PI/180*this.count * this.speed * this.direction) * this.circleSize - this.radius/2 + this.wave + this.posY;
  
      this.count += 1;
  
      var colA = hex2rgba(this.color,1);
      var colB = hex2rgba(this.color,0);
  
      var grd = ctx.createRadialGradient( this.x+this.radius/2,  this.y+this.radius/2,  0,  this.x+this.radius/2,  this.y+this.radius/2, this.radius/2);
      grd.addColorStop(0, colA);
      grd.addColorStop(1,  colB);
   
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.fillRect( this.x, this.y, this.radius, this.radius );
      ctx.closePath();
      ctx.fill();
  
    }
  
  
  
    var colorTips = [
      '#F13832',
      '#FD6F3E',
      '#47E892',
      '#41D6E5',
      '#FE2FA6'
    ]
  
    //function Particle(color,x,y,circleSize,radius){
    for(var i = 0; i < 30; i++){
      var r = Math.floor( getRandom(0,colorTips.length) );
      new Particle( colorTips[r], getRandom(0,canvas.width/2), getRandom(0,canvas.height), getRandom(-canvas.width,canvas.width),getRandom(500,1000));
    }
  
  
  
    //function Particle(circleSize,radius,x,y,direction,speed,amplitude,waveSpeed){
    
    function loop(){
      ctx.clearRect(0,0, canvas.width, canvas.height);  
  
      //Particle
      for(var i in particles){
        particles[i].draw();
      }
  
      frameId = requestAnimationFrame(loop);
      if(frameId % 2 == 0) { return; }
      stats.update();
    }
  
    loop();
  
    
    window.addEventListener("resize", function(){
      // canvas.width = window.innerWidth;
      // canvas.height = window.innerHeight;
      // x = canvas.width / 2;
      // y = canvas.height / 2;
    });
  
    
    function getRandom(min, max) {
      return Math.random() * (max - min) + min;
    }
  
  
   function hex2rgba (hex, alpha = 1) {
  
    
    let r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
    let c = null
    if (r) {
        c = r.slice(1,4).map(function(x) { return parseInt(x, 16) })
    }
    
    r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
    if (r) {
        c = r.slice(1,4).map(function(x) { return 0x11 * parseInt(x, 16) })
    }
    
    if (!c) {
        return null
    }
    return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`
  }

  })();