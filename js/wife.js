if( Me.isNextTo(Rooster) ){
	Game.log(Me.name + ": captured Rooster!");
	Me.capture(Rooster);
} else {
	
	var fr = Me.position.row;
	var fc = Me.position.col;
	
	var distances = [];
	var distance;

    var minDistance = 14; // farthest possible distance


    if( fc+1<=7 && !Game.isOccupied(fr, fc+1) ) {
        distance = Rooster.distanceTo(fr, fc+1 );
        distances.push( { "direction": "R", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
  
    if( fc-1>=0 && !Game.isOccupied(fr, fc-1) ) {
        distance = Rooster.distanceTo(fr, fc-1 );
        distances.push( { "direction": "L", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    
    if( fr+1<=7 && !Game.isOccupied(fr+1, fc) ) {
        distance = Rooster.distanceTo(fr+1, fc );
        distances.push(  { "direction": "D", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    
    if( fr-1>=0 && !Game.isOccupied(fr-1, fc) ) {
        distance = Rooster.distanceTo(fr-1, fc );
        distances.push(  { "direction": "U", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    
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

    minDirection;
}