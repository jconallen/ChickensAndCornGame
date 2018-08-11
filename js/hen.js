var row = Me.position.row;
var col = Me.position.col;

var maxDistance = 0;
var maxDirection;

if( col+1<=7 && !Game.isOccupied(row, col+1) ) {
    var distance = Farmer.distanceTo(row, col+1 );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "R";
    }
}
  
if( col-1>=0 && !Game.isOccupied(row, col-1) ) {
    distance = Farmer.distanceTo(row, col-1 );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "L";
    }
}

if( row+1<=7 && !Game.isOccupied(row+1, col) ) {
    distance = Farmer.distanceTo(row+1, col );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "D";
    }
}

if( row-1>=0 && !Game.isOccupied(row-1, col) ) {
    distance = Farmer.distanceTo(row-1, col );
    if( distance > maxDistance ){
    	maxDistance = distance;
    	maxDirection = "U";
    }
}

maxDirection;
