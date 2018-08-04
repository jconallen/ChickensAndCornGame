if( Farmer.isNextTo(Hen) ){
	Game.log("Farmer captures Hen");
	Farmer.capture(Hen);
} else {
	
    var msg = "Farmer: ";
   
	var fr = Farmer.position().row();
	var fc = Farmer.position().col();

    var minDistance = 14; // farthest possible distance
    var minDirection;

    if( fc+1<=7 && !Game.isOccupied(fr, fc+1) ) {
        var distance = Hen.distanceTo(fr, fc+1 );
        msg += " R: " + distance;
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "R";
        }
    }
  
    if( fc-1>=0 && !Game.isOccupied(fr, fc-1) ) {
        distance = Hen.distanceTo(fr, fc-1 );
        msg += " L: " + distance;
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "L";
        }
    }
    
    if( fr+1<=7 && !Game.isOccupied(fr+1, fc) ) {
        distance = Hen.distanceTo(fr+1, fc );
        msg += " D: " + distance;
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "D";
        }
    }
    
    if( fr-1>=0 && !Game.isOccupied(fr-1, fc) ) {
        distance = Hen.distanceTo(fr-1, fc );
        msg += " U: " + distance;
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "U";
        }
    }
    
    Game.log(msg + " -> "+minDirection + "[" + minDistance + "]");
    minDirection;
}