var myData;
var astronauts = [];
var italy;
var usa;
var russia;
var mouseLasciato = false;
var mousePremuto = false;
var mouseSopra = false

function preload() {
  myData = loadJSON('assets/peopleinspace.json');
  sfondo = loadImage('./assets/spacebackground.jpg');
  deathstar = loadImage('./assets/morte_nera.png');
  astronauti = loadImage('./assets/sentinel.png');
  italy = loadImage("assets/flag-italy.jpg");
  usa = loadImage("assets/flag-usa.jpg");
  russia = loadImage("assets/flag-russia.jpg");
  mySong=loadSound('./assets/The Imperial March.mp3');
}

function setup() {

  createCanvas(500, 500);
  mySong.play();

  for (var i = 0; i < myData.people.length; i++) {
    var astroData = myData.people[i];
    var newAstronaut = new Astronaut(astroData.name, astroData.launchdate, astroData.country,astroData.bio);
    astronauts.push(newAstronaut);
  }
}

function draw() {
  image(sfondo, 0, 0, 500, 500);
  image(deathstar, 0, 0, 120, 120);

  textAlign(CENTER);
  fill(255);
  textSize(13);
  textFont('Geostar');
  text('land all the sentinels on the death star', 300, 60);


  for (var i = 0; i < astronauts.length; i++) {
    var astro = astronauts[i];
    astro.move();
    astro.display();
  }
}

function Astronaut(name, date, country,lines) {

  this.name = name;
  this.launchDate = date;
  this.country = country;
  this.bio = lines

  var daysInSpace = (Date.now() - Date.parse(this.launchDate)) / 1000 / 60 / 60 / 24;

  this.radius = daysInSpace;

  this.x = random(this.radius, width - this.radius);
  this.y = random(this.radius, height - this.radius);

  this.incrementX = 1;
  this.incrementY = 1;

  this.taken = false;

  this.display = function() {

    image(astronauti, this.x, this.y, this.radius, this.radius)
    

    this.gerarchia = false;
    for (var i = 0; i < astronauts.length; i++) {
      if (astronauts[i].taken)
        this.gerarchia = true;
    }

//if(dist(this.x, this.y, mouseX, mouseY) < this.radius && !this.gerarchia){
if (mouseX > this.x && mouseX < this.x+this.radius && mouseY > this.y && mouseY < this.y+this.radius){
      textAlign(CENTER);
      fill(255);
      textSize(12);
      textFont('Oswald');
      text(this.bio, 150, 100,350,300);
    }

    if (mouseIsPressed) {
      if (dist(this.x, this.y, mouseX, mouseY) < this.radius && !this.gerarchia)
        this.taken = true;
    }
    
    

    if (this.taken && mouseIsPressed) {
      this.x = mouseX;
      this.y = mouseY;

      if (this.country == "usa") {
        image(usa, this.x - this.radius, this.y, this.radius, this.radius - this.radius / 3);
      } else if (this.country == "russia") {
        image(russia, this.x - this.radius, this.y, this.radius, this.radius - this.radius / 3);

      } else if (this.country == "italy") {
        image(italy, this.x - this.radius, this.y, this.radius, this.radius - this.radius / 3);
      }

      text(this.name, this.x + 20, this.y + this.radius + 5);
      
    } else
    if (this.taken && mouseLasciato && (this.x >= 120 || this.y >= 120)) {
      this.taken = false;
      this.x = random(this.radius, width - this.radius);
      this.y = random(this.radius, width - this.radius);

      this.incrementX = 1;
      this.incrementY = 1;
    } else
    if (this.taken && mouseLasciato && (this.x < 120 && this.y < 120)) {
      this.taken = false;
      this.x = -this.radius;
      this.y = -this.radius;
    }
  }

  this.move = function() {

    this.x += this.incrementX;
    this.y += this.incrementY;

    if (this.x > width - this.radius || this.x < this.radius) {
      this.incrementX *= -1
    }

    if (this.y > height - this.radius || this.y < this.radius) {
      this.incrementY *= -1
    }
  }
}

function mousePressed() {
  mousePremuto = true;
}

function mouseReleased() {
  mouseLasciato = true;
}

function mouseOver() {
  mouseSopra = true;
}