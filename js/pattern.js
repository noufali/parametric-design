var canvas;
var x = 10;
var y = 10;
var colours = ["#420F38", "#D6D3CC", "#E89FB2", "#2359A2"];
var div, size, sizeText, division, divisionText, animateButton, saveButton, gifButton;
var xt, yt, xp, yp;
var isAnimate = false;
var capturer = new CCapture( {
  format: 'gif',
  workersPath: 'js/',
	framerate: 60,
	verbose: true
} );


function setup () {
  canvas = createCanvas(1450,600);
  canvas.parent("myContainer");

  gui();
}

function draw () {
  background("#2359A2");
  y = 10;
  // colour palette
  // for (let i=0; i<4; i++) {
  //   push();
  //   fill(colours[i]);
  //   noStroke();
  //   rect(x, y, 15, 15);
  //   pop();
  //   y += 20;
  // }
  // curvy thingies from Matthias Wandel's Shingles
  push();
  strokeWeight(2);
  stroke(255);
  noFill();
  beginShape();
  let t;
  for(let theta = 0; theta < size.value(); theta += 0.01) {
    if (isAnimate == false) {
      t = 0;
    } else {
      t = sin( frameCount/1000. ) * 200;
    }
    
    xt = sin(theta + t) * (theta) + 750;
    yt = cos(theta + t) * (theta) + 300;

    let nthet = xt/division.value() + yt/division.value();
    let othet = xt/division.value() - yt/division.value();

    yp = yt + sin(nthet + t)*15 + sin(othet) * 15;
    xp = xt + cos(nthet)*15 + cos(othet) * 15;
    curveVertex(xp,yp);
  }
  endShape();
  pop();
}

function gui() {
  // div
  div = createDiv();
  div.position(0,600);
  div.style('background-color', 'white');
  div.style('width', '1450px');
  div.style('height', '200px');
  //div.style('z-index', '-1');
  div.id('gui');

  // parameter 1
  sizeText = createP("theta");
  sizeText.position(20, 5)
  sizeText.style('font-family', " 'Nunito', monospace ");
  sizeText.parent('gui');

  size = createSlider(100, 800, 300, 1);
  size.position(150,20);
  size.parent('gui');

  // parameter 2
  divisionText = createP("division");
  divisionText.position(20, 40);
  divisionText.style('font-family', 'Nunito');
  divisionText.parent('gui');

  division = createSlider(30, 80, 30, 1);
  division.position(150,55);
  division.parent('gui');

  // animate
  animateButton = createButton('animate');
  animateButton.position(20, 100);
  animateButton.id('animate');
  animateButton.class('bt');
  animateButton.parent('gui');
  animateButton.mousePressed(changeStatus);

  // save canvas
  saveButton = createButton('save png');
  saveButton.position(150, 100);
  saveButton.id('save');
  saveButton.class('bt');
  saveButton.parent('gui');
  saveButton.mousePressed(saveCanvas);

  // save gif
  gifButton = createButton('save gif');
  gifButton.position(280, 100);
  gifButton.id('giffy');
  gifButton.class('bt');
  gifButton.parent('gui');
  gifButton.mousePressed(saveGIF);
}

function changeStatus() {
  if (isAnimate == true) {
    isAnimate = false;
    $("#animate").text("animate");
  } else if (isAnimate == false) {
    isAnimate = true;
    $("#animate").text("stop");
  }
}

function saveCanvas() {
  saveCanvas(canvas, 'myPattern', 'png');
}

function saveGIF() {
  capturer.capture(canvas);

}
