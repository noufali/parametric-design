var canvas;
var y, x = 10;
var strokeCol = 0;
var col = 255;
var title, style, geometry;
var div, size, division, strokeSlider, widthSlider, heightSlider;
var blue, purple, grey, pink;
var sizeText, divisionText, strokeText, widthText, heighText, colText;
var animateButton, saveButton, gifButton;
var isAnimate = false;

var noiseStep = 0;
var sinPath;

function setup () {
  canvas = createCanvas(1450,600);
  canvas.parent("myContainer");
  noiseDetail(2,0.9);

  gui();
}

function draw () {
  resizeCanvas(widthSlider.value(), heightSlider.value());
  background(col);
  y = 10;
  stroke(strokeCol);
  noFill();
  strokeWeight(strokeSlider.value());

  let t = sin( frameCount/100. );

  for (let num = -200; num < height; num += 80) {
    beginShape();
    let xoff = 0;
    let yoff = num;
    for (let x = 0; x < width; x++) {
      let y = noise(xoff) * height + yoff;
      let n = noise(x * 0.005, y * 0.005, frameCount * 0.005);
      vertex(x, (y-50));

      xoff += size.value();
    }
    endShape();
  }
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

  strokeSlider = createSlider(0.25, 20, 20, 0.25);
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
  sizeText = createP("noise");
  sizeText.position(400, 25);
  sizeText.parent('gui');

  size = createSlider(0, 0.01, 0, 0.001);
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
