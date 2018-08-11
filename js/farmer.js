if( Me.isNextTo(Hen) ){
	log(Me.name + ": captured Hen!");
	Me.capture(Hen);
} else {
   
    var row = Me.position.row;
    var col = Me.position.col;
	
    var distances = [];
    var distance;

    var minDistance = 14; // farthest possible distance

    if( col+1<=7 && !Game.isOccupied(row, col+1) ) {
        distance = Hen.distanceTo(row, col+1 );
        distances.push( { "direction": "R", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
  
    if( col-1>=0 && !Game.isOccupied(row, col-1) ) {
        distance = Hen.distanceTo(row, col-1 );
        distances.push( { "direction": "L", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    
    if( row+1<=7 && !Game.isOccupied(row+1, col) ) {
        distance = Hen.distanceTo(row+1, col );
        distances.push(  { "direction": "D", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    
    if( row-1>=0 && !Game.isOccupied(row-1, col) ) {
        distance = Hen.distanceTo(row-1, col );
        distances.push(  { "direction": "U", "distance": distance } );
        if( distance < minDistance ){
        	minDistance = distance;
        }
    }
    log( Me.name + ": " + JSON.stringify(distances) );
    
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
    
    
    log(Me.name + " -> "+minDirection + "[" + minDistance + "]");
    minDirection;
}