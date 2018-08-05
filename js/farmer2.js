if( Me.isNextTo(Hen) ){
	Game.log(Me.name + " captures Hen");
	Me.capture(Hen);
} else {
   
	var fr = Me.position.row;
	var fc = Me.position.col;
	var distance;

    var minDistance = 14; // farthest possible distance
    var minDirection;

    if( fc+1<=7 && !Game.isOccupied(fr, fc+1) ) {
        distance = Hen.distanceTo(fr, fc+1 );
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "R";
        }
    }
  
    if( fc-1>=0 && !Game.isOccupied(fr, fc-1) ) {
        distance = Hen.distanceTo(fr, fc-1 );
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "L";
        }
    }
    
    if( fr+1<=7 && !Game.isOccupied(fr+1, fc) ) {
        distance = Hen.distanceTo(fr+1, fc );
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "D";
        }
    }
    
    if( fr-1>=0 && !Game.isOccupied(fr-1, fc) ) {
        distance = Hen.distanceTo(fr-1, fc );
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "U";
        }
    }
    
    Game.log(Me.name + " -> "+minDirection + "[" + minDistance + "]");
    minDirection;
}