let font;
let vehicles = [];
let text = 'marleo.';

function preload(){
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup(){

  createCanvas(800, 300);
  background(51);

  textFont(font);
  textSize(192);
  //fill(255);
  //noStroke();
  //text('marleo', 85, 200);

  //Trace Text
  let points = font.textToPoints(text, 85, 200, 192, {
    sampleFactor: .2
  })

  // Draw points on text line
  for(let i = 0; i < points.length; i++){
    let pt = points[i];
    let vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }

}

function draw(){
  background(51);
  for(var i = 0; i < vehicles.length; i++){
    var v = vehicles[i];
    v.behaviours();
    v.update();
    v.show();
  }
}
