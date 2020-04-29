function Vehicle(x, y){
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxSpeed = 5;
  this.maxForce = 0.3;
}

Vehicle.prototype.behaviours = function(){
  var arrive = this.arrive(this.target);
  this.applyForce(arrive);
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
  strokeWeight(5);
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

Vehicle.prototype.seek = function(target){
  var desired = p5.Vector.sub(target, this.pos);
  desired.setMag(this.maxSpeed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}
