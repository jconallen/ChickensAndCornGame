if( Wife.isNextTo(Rooster) ){
	console.log("Farmer captures Hen");
	Wife.capture(Rooster);
} else {
	
	var msg = "Wife: ";
    
    var fr = Wife.position().row();
    var fc = Wife.position().col();

    var minDistance = 16;
    var minDirection;

    if( fc+1<=7 && !Game.isOccupied(fr, fc+1) ) {
        var distance = Rooster.distanceTo(fr, fc+1 );
        msg += " R: " + distance;
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "R";
        }
    }
  
    if( fc-1>=0 && !Game.isOccupied(fr, fc-1) ) {
        distance = Rooster.distanceTo(fr, fc-1 );
        msg += " L: " + distance;
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "L";
        }
    }
    
    if( fr+1<=7 && !Game.isOccupied(fr+1, fc) ) {
        distance = Rooster.distanceTo(fr+1, fc );
        msg += " D: " + distance;
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "D";
        }
    }
    
    if( fr-1>=0 && !Game.isOccupied(fr-1, fc) ) {
        distance = Rooster.distanceTo(fr-1, fc );
        msg += " U: " + distance;
        if( distance < minDistance ){
        	minDistance = distance;
            minDirection = "U";
        }
    }
    
    console.log(msg + " -> "+minDirection + "[" + minDistance + "]");
    minDirection;
}