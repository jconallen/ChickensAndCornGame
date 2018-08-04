if( Me.isNextTo(Hen) ){
	Game.log("Farmer: captured Hen!");
	Me.capture(Hen);
} else {
	
    var msg = "Farmer: ";
   
	var fr = Me.position().row;
	var fc = Me.position().col;
	
	var distances = []; 

    var minDistance = 14; // farthest possible distance
    var distance;

    if( fc+1<=7 && !Game.isOccupied(fr, fc+1) ) {
        distance = Hen.distanceTo(fr, fc+1 );
        distances.push( { "direction": "R", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
  
    if( fc-1>=0 && !Game.isOccupied(fr, fc-1) ) {
        distance = Hen.distanceTo(fr, fc-1 );
        distances.push( { "direction": "L", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    
    if( fr+1<=7 && !Game.isOccupied(fr+1, fc) ) {
        distance = Hen.distanceTo(fr+1, fc );
        distances.push(  { "direction": "D", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    
    if( fr-1>=0 && !Game.isOccupied(fr-1, fc) ) {
        distance = Hen.distanceTo(fr-1, fc );
        distances.push(  { "direction": "U", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    Game.log( "Faarmer: " + JSON.stringify(distances) );
    
    var minDistances = [];
    for(var i=0; i<distances.length; i++){
    	var d = distances[i];
    	if( d.distance == minDistance ) {
    		minDistances.push( d );
    	}
    }
    var minDirection;
    
    if( minDistances.length>1 ) {
    	// randomly pick a distance
    	var size = minDistances.length;
    	var i = Game.randomInt(0,size-1);
    	minDirection = minDistances[i].direction;
    } else {
    	minDirection = minDistances[0].direction;
    }
    
    
    Game.log(msg + " -> "+minDirection + "[" + minDistance + "]");
    minDirection;
}