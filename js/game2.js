
class _Game {
	
	constructor( ) {
		this._curMove = 0;
		this._boardPositions = [];
	}

	totalMoves(){
		return this._boardPositions.length;
	}
	
	currentMove(){
		return this._curMove;
	}
	
	isActive(){
		return ( Farmer.isActive() || Wife.isActive() );
	}
	
	isOccupied(arg1, arg2){
		var row;
		var col;
		
		if( arg1 instanceof Position  ) {
			row = arg1.row;
			col = arg1.col;
		} else {
			row = arg1;
			col = arg2;
		}
		
		if( Rooster.position.row==row && Rooster.position.col==col ) return true;
		if( Farmer.position.row==row && Farmer.position.col==col ) return true;
		if( Wife.position.row==row && Wife.position.col==col ) return true;
		if( Hen.position.row==row && Hen.position.col==col ) return true;
		return false;
	}

	availableMoves(arg1,arg2){
		var moves = [];
		var row;
		var col;
		
		if( arg1 instanceof Position ) {
			row = arg1.row;
			col = arg1.col;
		} else {
			row = arg1;
			col = arg2;
		}
		
		if( row>0 && !this.isOccupied(row-1, col) ) moves.push("U");
		if( row<7 && !this.isOccupied(row+1, col) ) moves.push("D");
		if( col>0 && !this.isOccupied(row, col-1) ) moves.push("L");
		if( col<7 && !this.isOccupied(row, col+1) ) moves.push("R");	
		
		return moves;
	}
	
	name(){
		return 'Chickens and Corn Game';
	};

	randomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	
	// Private methods not expected to be used by pieces.

	_cacheBoardPositions(){
		var positions = {
				"Rooster": { "row": Rooster.position.row, "col": Rooster.position.col, "active": Rooster.isActive(), "visible": Rooster.isVisible() },
				"Farmer": { "row": Farmer.position.row, "col": Farmer.position.col, "active": Farmer.isActive(), "visible": Farmer.isVisible() },
				"Wife": { "row": Wife.position.row, "col": Wife.position.col, "active": Wife.isActive(), "visible": Wife.isVisible() },
				"Hen": { "row": Hen.position.row, "col": Hen.position.col, "active": Hen.isActive(), "visible": Hen.isVisible() }
		};
		this._boardPositions.push(positions);
	}
	
	_gameState(){
		var gameState = {
				"ready": this.isActive(),
				"totalMoves": this.totalMoves(),
				"currentMove": this.currentMove(),
				"pieces": { 
					"rooster": {
						"row": Rooster.position.row,
						"col": Rooster.position.col,
						"active": Rooster.isActive()						
					},
					"farmer": {
						"row": Farmer.position.row,
						"col": Farmer.position.col,
						"active": Farmer.isActive()						
					},
					"wife": {
						"row": Wife.position.row,
						"col": Wife.position.col,
						"active": Wife.isActive()						
					},
					"hen": {
						"row": Hen.position.row,
						"col": Hen.position.col,
						"active": Hen.isActive()						
					}
				}
		}
		return gameState;
	}

	_reset(){
		// put farmers and chickens in place
		Rooster.position = new Position(4,0);
		Rooster._active = true;

		Farmer.position = new Position(4,2);
		Farmer._active = true;

		Wife.position = new Position(4,5);
		Wife._active = true;

		Hen.position = new Position(4,7);
		Hen._active = true;
		
		this._curMove = 0;
		this._boardPositions = [];
		this._cacheBoardPositions();
		
	};
		
	_getBoard(){

		if( this._curMove < this.totalMoves() ) {
			// dig one out of the cache
			var positions = this._boardPositions[this._curMove];
			
			Rooster.position.row = positions["Rooster"].row;
			Rooster.position.col = positions["Rooster"].col;
			Rooster._active = positions["Rooster"].active;
			
			Farmer.position.row = positions["Farmer"].row;
			Farmer.position.col = positions["Farmer"].col;
			Farmer._active = positions["Farmer"].active;
			
			Wife.position.row = positions["Wife"].row;
			Wife.position.col = positions["Wife"].col;
			Wife._active = positions["Wife"].active;
			
			Hen.position.row = positions["Hen"].row;
			Hen.position.col = positions["Hen"].col;
			Hen._active = positions["Hen"].active;

			
		} else {

			// we have new position to compute
			// first farmer moves
			if( Farmer.isActive() ){
				Farmer._next();
			}
			if( Wife.isActive() ) {
				Wife._next();
			}
			if( Rooster.isActive() ) {
				Rooster._next();
			}
			if( Hen.isActive() ) {
				Hen._next();
			}
			
			this._cacheBoardPositions();
			
		} 
		
		return ( Farmer.isActive() || Wife.isActive() );
	};
	


	_next(){
		this._curMove += 1;
		return this._getBoard();
	}

	_prev( ) {
		if( this._curMove> 0 ){
			this._curMove -= 1;
		}
		return this._getBoard();
	}
	
}
