var fr = Rooster.position().row;
var fc = Rooster.position().col;

var maxDistance = 0;
var maxDirection;

if( fc+1<=7 && !Game.isOccupied(fr, fc+1) ) {
    var distance = Wife.distanceTo(fr, fc+1 );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "R";
    }
}
  
if( fc-1>=0 && !Game.isOccupied(fr, fc-1) ) {
    distance = Wife.distanceTo(fr, fc-1 );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "L";
    }
}

if( fr+1<=7 && !Game.isOccupied(fr+1, fc) ) {
    distance = Wife.distanceTo(fr+1, fc );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "D";
    }
}

if( fr-1>=0 && !Game.isOccupied(fr-1, fc) ) {
    distance = Wife.distanceTo(fr-1, fc );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "U";
    }
}

maxDirection;
