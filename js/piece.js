class Piece {
	
	constructor( name, human ) {
		this._isHuman = human;
		this.name = name;
	}
	
	init( row, col, algorithm, active, visible ){
		this._active = active;
		this._algorithm = algorithm;
		this._visible = visible;
		this.position = new Position(row, col);		
	}
	
	setPosition( row, col ){
		this.position = new Position(row, col);		
	}
	
	capture( piece ) {
		if( piece instanceof Piece ) {
		   if( (this.name == "Farmer" || this.name == "Wife") &&  (piece.name == "Rooster" || piece.name == "Hen") ) {
			   if( this.isNextTo( piece ) ){
				   	this._active = false;
				   	this.position.row = piece.position.row;
				   	this.position.col = piece.position.col;
				   	piece._active = false;
				   	return "X";
			   } else {
				   throw this.name + " not next to " + this.name + ", can not capture.";
			   }
		   }
		   throw "Invalid argument types.  " + this.name + " can not capture " + piece.name + ".";
		}
		throw "Invalid argument for capture: " + piece.constructor.name;
	}
	
	isActive(){
		return this._active;
	}

	isVisible(){
		return this._visible;
	}

	isHuman(){
		return this._human;
	}
	
	isChicken(){
		return !this._human;
	}
	
	_next(){
		
		if( Game.availableMoves.length>100 ) {
			throw 'number of moves exceeded 1000, canceling simulation';
		}
		
		var availableMoves = Game.availableMoves(this.position);
		
		var result;
		try{
			Me = this;
			result = eval(this._algorithm);
		} catch( err ) {
			var msg = "Error thrown from " + Me.name + " algorithm\n" + err;
			throw msg;
		}
		
		if( result.charAt(0) == 'X' ) {
			// a capture!
			return;
		}
		
		if( result  && result.length>0 ) {
			var move = result.charAt(0).toUpperCase();
			
			if( availableMoves.indexOf(move) >= 0 ){
				
				var row = this.position.row;
				var col = this.position.col;
				
				switch( move ) {
				case 'U': row = row - 1; break;
				case 'D': row = row + 1; break;
				case 'L': col = col - 1; break;
				case 'R': col = col + 1; break;
				}
				
				this.position  = new Position(row, col);
				
			} else {
				throw "Invalid move " + result + " for " + this.name ; 
			}
			
			
		} else {
			throw this.name + " must make a move.";  
		}
		
	}
	
	isNextTo(peice) {
		if( peice.isActive() ) {
			return peice.position.isNextTo(this.position);
		} 
		return false;
	}
	
	moveRandom(){
		return Game._randomMove(this);
	}
	
	distanceTo( arg1, arg2 ) {
		
		var row;
		var col;
		
		if( arg1 instanceof Position ) {
			row = arg1.row;
			col = arg1.col;
		} else {
			row = arg1;
			col = arg2;
		}
		
		var r = this.position.row;
		var c = this.position.col;
		
		var d = Math.abs( row - r ) + Math.abs( col - c ) ;
		return d;
	}
	
}
