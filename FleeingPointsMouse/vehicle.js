function Vehicle(x, y){
  this.pos = createVector(x, y);
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxSpeed = 7;
  this.maxForce = 1;
}

Vehicle.prototype.behaviours = function(){
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f){
  this.acc.add(f);
}

Vehicle.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function(){
  stroke(255);
  strokeWeight(1);
  point(this.pos.x, this.pos.y);
}

Vehicle.prototype.arrive = function(target){
  var desired = p5.Vector.sub(target, this.pos);
  var distance = desired.mag();
  var speed = this.maxSpeed;
  if(distance < 100) {
    var speed = map(distance, 0, 100, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

Vehicle.prototype.flee = function(target){
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag()
  if(d < 50){
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0,0);
  }

}
