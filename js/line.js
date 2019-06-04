var canvas;
var slider;
var x = 10;
var y = 10;
var colours = ["#420F38", "#D6D3CC", "#E89FB2", "#2359A2"];

var noiseStep = 0;
var sinPath;

function setup () {
  canvas = createCanvas(1300,600);
  canvas.parent("myContainer");

  slider = createSlider(0, 0.09, 0, 0.001);
}

function draw () {
  //console.log(slider.value());
  background(255);
  y = 10;
  noiseDetail(2,0.9);
  // colour palette
  // for (let i=0; i<4; i++) {
  //   push();
  //   fill(colours[i]);
  //   noStroke();
  //   rect(x, y, 15, 15);
  //   pop();
  //   y += 20;
  // }

  for (let num = 0; num < 900; num += 10) {
    beginShape();
    let t = noise( frameCount/100. );
    let xoff = 0;
    let yoff = num;
    for (let x = 0; x < width; x++) {
      stroke(0);
      noFill();
      strokeWeight(1);

      let y = noise(xoff) * height + yoff;
      let n = noise(x * 0.005, y * 0.005, frameCount * 0.05);
      vertex(x, (y - 50));

      xoff += 0.01;
    }
    endShape();
  }

  //drawPath(0,-300,0,600);
}

function drawPath(x,y,radius,noiseMult) {
  beginShape();
  stroke(0);
  strokeWeight(10);
  //sinPath = r.path(x,y)

  for (var j=0; j<100; j = j + 30) {
    for (var i=0; i<100; i++) {
      var x = i*6;
      var y = radius + noise(noiseStep)*noiseMult;
      let n = noise(x * 0.005, y * 0.005, frameCount * 0.005);
      curveVertex(x,y+j);
      //noiseStep += 0.01; //the less the smoother
    }
  }
  endShape();
}



// var r = new Rune({
//   container: "#canvas",
//   width: 600,
//   height: 600,
//   // debug: true,
// });
//
// r.rect(0,0,600,800).fill(255).stroke(false);
//
// function drawPath(x,y,radius,noiseMult) {
//   sinPath = r.path(x,y)
//   .fill(false)
//
//   for(var j=0; j<600; j = j + 30) {
//     for(var i=0; i<110; i++) {
//       var x = i*6
//       var y = radius + noise.get(noiseStep)*noiseMult;
//
//       if(x==0) {
//         sinPath.moveTo(x,y+j);
//       } else {
//         sinPath.lineTo(x,y+j).stroke(0).strokeWidth(10)
//       }
//       noiseStep += 0.01; //the less the smoother
//     }
//   }
// }
//
