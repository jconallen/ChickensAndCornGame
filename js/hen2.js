var fr = Me.position.row;
var fc = Me.position.col;

var maxDistance = 0; // farthest possible distance
var maxDirection;

if( fc+1<=7 && !Game.isOccupied(fr, fc+1) ) {
    var distance = Farmer.distanceTo(fr, fc+1 );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "R";
        }
    }
  
if( fc-1>=0 && !Game.isOccupied(fr, fc-1) ) {
        distance = Farmer.distanceTo(fr, fc-1 );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "L";
    }
}

if( fr+1<=7 && !Game.isOccupied(fr+1, fc) ) {
    distance = Farmer.distanceTo(fr+1, fc );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "D";
    }
}

if( fr-1>=0 && !Game.isOccupied(fr-1, fc) ) {
    distance = Farmer.distanceTo(fr-1, fc );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "U";
    }
}

Game.log(Me.name + ": " + " -> " + maxDirection + "[" + maxDistance + "]");

maxDirection;
