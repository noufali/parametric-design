var canvas;
var x = 10;
var strokeCol = 255;
var col = "#2359A2";
var xt, yt, xp, yp;
var title, style, geometry;
var div, size, division, strokeSlider, widthSlider, heightSlider;
var blue, purple, grey, pink;
var sizeText, divisionText, strokeText, widthText, heighText, colText;
var animateButton, saveButton, gifButton;
var isAnimate = false;



function setup () {
  canvas = createCanvas(1450,600);
  canvas.parent("myContainer");

  gui();
}

function draw () {
  resizeCanvas(widthSlider.value(), heightSlider.value());
  background(col);
  y = 10;
  push();
  strokeWeight(strokeSlider.value());
  stroke(strokeCol);
  noFill();
  beginShape();
  let t;
  for(let theta = 0; theta < size.value(); theta += 0.01) {
    if (isAnimate == false) {
      t = 0;
    } else {
      t = sin( frameCount/1000. ) * 200;
    }

    xt = sin(theta + t) * (theta) + (width/2);
    yt = cos(theta + t) * (theta) + (height/2);

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
  div.id('gui');

  // CHANGE CANVAS
  title = createP("canvas parameters");
  title.position(20, 0);
  title.id("title");
  title.parent('gui');

  // parameter 1
  widthText = createP("width");
  widthText.position(20,25);
  widthText.parent('gui');

  widthSlider = createInput('1450');
  widthSlider.position(80,44);
  widthSlider.style('width', '70px');
  widthSlider.parent('gui');

  // parameter 2
  heighText = createP("height");
  heighText.position(20,50);
  heighText.parent('gui');

  heightSlider = createInput('600');
  heightSlider.position(80,67);
  heightSlider.style('width', '70px');
  heightSlider.parent('gui');

  // colours
  colText = createP("colour");
  colText.position(20,80);
  colText.parent('gui');

  purple = createDiv();
  purple.mousePressed(function() {
    col = '#420F38';
  });
  purple.position(80,100);
  purple.class('colours');
  purple.style('background-color', '#420F38');
  purple.parent('gui');

  grey = createDiv();
  grey.mousePressed(function() {
    col = '#D6D3CC';
  });
  grey.position(100,100);
  grey.class('colours');
  grey.style('background-color', '#D6D3CC');
  grey.parent('gui');

  pink = createDiv();
  pink.mousePressed(function() {
    col = '#E89FB2';
  });
  pink.position(120,100);
  pink.class('colours');
  pink.style('background-color', '#E89FB2');
  pink.parent('gui');

  blue = createDiv();
  blue.mousePressed(function() {
    col = '#2359A2';
  });
  blue.position(140,100);
  blue.class('colours');
  blue.style('background-color', '#2359A2');
  blue.parent('gui');

  // CHANGE STYLE
  style = createP("style parameters");
  style.position(190, 0);
  style.id("title");
  style.parent('gui');

  // parameter 3
  strokeText = createP("stroke");
  strokeText.position(190, 25);
  strokeText.parent('gui');

  strokeSlider = createSlider(0.25, 2, 1, 0.25);
  strokeSlider.position(240,43);
  strokeSlider.parent('gui');

  // colours
  colText = createP("colour");
  colText.position(190,50);
  colText.parent('gui');

  purple = createDiv();
  purple.mousePressed(function() {
    strokeCol = '#420F38';
  });
  purple.position(250,70);
  purple.class('colours');
  purple.style('background-color', '#420F38');
  purple.parent('gui');

  grey = createDiv();
  grey.mousePressed(function() {
    strokeCol = '#D6D3CC';
  });
  grey.position(270,70);
  grey.class('colours');
  grey.style('background-color', '#D6D3CC');
  grey.parent('gui');

  pink = createDiv();
  pink.mousePressed(function() {
    strokeCol = '#E89FB2';
  });
  pink.position(290,70);
  pink.class('colours');
  pink.style('background-color', '#E89FB2');
  pink.parent('gui');

  blue = createDiv();
  blue.mousePressed(function() {
    strokeCol = '#2359A2';
  });
  blue.position(310,70);
  blue.class('colours');
  blue.style('background-color', '#2359A2');
  blue.parent('gui');

  // CHANGE GEOMETRY
  geometry = createP("geometry parameters");
  geometry.position(400, 0);
  geometry.id("title");
  geometry.parent('gui');

  // parameter 4
  sizeText = createP("theta");
  sizeText.position(400, 25);
  sizeText.parent('gui');

  size = createSlider(100, 800, 300, 1);
  size.position(446,43);
  size.parent('gui');

  // parameter 5
  divisionText = createP("division");
  divisionText.position(400, 50);
  divisionText.parent('gui');

  division = createSlider(30, 80, 30, 1);
  division.position(460,69);
  division.parent('gui');

  // animate
  animateButton = createButton('animate');
  animateButton.position(20, 130);
  animateButton.id('animate');
  animateButton.class('bt');
  animateButton.parent('gui');
  animateButton.mousePressed(changeStatus);

  // save canvas
  saveButton = createButton('save png');
  saveButton.position(140, 130);
  saveButton.id('save');
  saveButton.class('bt');
  saveButton.parent('gui');
  saveButton.mousePressed(saveCanvas);

  // save gif
  gifButton = createButton('save gif');
  gifButton.position(260, 130);
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
