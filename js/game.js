class Piece {
	
	constructor( id, position, code ) {
		this._active = true;
		this.id = id;
		this._algorithm = code;
		this._position = position;
	}
	
	
	position(){
		return this._position;
	}
	
	capture( piece ) {
		if( piece instanceof Piece ) {
		   if( (this.id == "Farmer" || this.id == "Wife") &&  (piece.id == "Rooster" || piece.id == "Hen") ) {
			   if( this.isNextTo( piece ) ){
				   	this._active = false;
				   	this._position = piece.position();
				   	piece._active = false;
				   	return "X";
			   } else {
				   throw this.id + " not next to " + this.id + ", can not capture.";
			   }
		   }
		   throw "Invalid argument types.  " + this.id + " can not capture " + piece.id + ".";
		}
		throw "Invalid argument for capture: " + piece.constructor.name;
	}
	
	isActive(){
		return this._active;
	}
	
	_next(){
		
		var availableMoves = Game.availableMoves(this.position());
		
		var result;
		try{
			Me = this;
			result = eval(this._algorithm);
		} catch( err ) {
			throw err;
		}
		
		if( result.charAt(0) == 'X' ) {
			// a capture!
			return;
		}
		
		if( result  && result.length>0 ) {
			var move = result.charAt(0).toUpperCase();
			
			if( availableMoves.indexOf(move) >= 0 ){
				
				var row = this._position.row;
				var col = this._position.col;
				
				switch( move ) {
				case 'U': row = row - 1; break;
				case 'D': row = row + 1; break;
				case 'L': col = col - 1; break;
				case 'R': col = col + 1; break;
				}
				
				this._position  = new Position(row, col);
				
			} else {
				throw "Invalid move " + result + " for " + this.id ; 
			}
			
			
		} else {
			throw this.id + " must make a move.";  
		}
		
		
	}
	
	isNextTo(peice) {
		
		return peice.position().isNextTo(this._position);
	}
	
	moveRandom(){
		return Game.randomMove(this);
	}
	
	distanceTo( row, col ) {
		var r = this._position.row;
		var c = this._position.col;
		
		var d = Math.abs( row - r ) + Math.abs( col - c ) ;
		return d;
	}
	
}


class Position {
	constructor( row, col ) {
		this.row = row;
		this.col = col;
	};
	
	
	move(direction){
		switch(direction){
		case 'U': {
			if( this.col>0 && !_game.isOccupied(this.row, this.col-1) ) {
				this.col -= 1;
			} else {
				throw "Invalid move up";
			}
			break;
		}
		case 'D': {
			if( this.col<7 && !_game.isOccupied(this.row, this.col+1) ) {
				this.col += 1;
			} else {
				throw "Invalid move down";
			}
			break;
		}
		case 'L': {
			if( this.row>0 && !_game.isOccupied(this.row-1, this.col) ) {
				this.row -= 1;
			} else {
				throw "Invalid move left";
			}
			break;
		}
		case 'R': {
			if( this.row<7 && !_game.isOccupied(this.row+1, this.col) ) {
				this.row += 1;
			} else {
				throw "Invalid move right";
			}
			break;
		}
		}
		
	};
	
	isNextTo(otherPosition) {
		if( this.row == otherPosition.row ) {
			return ( this.col == otherPosition.col+1 || this.col == otherPosition.col-1 );
		} else if( this.col == otherPosition.col ) {
			return ( this.row == otherPosition.row+1 || this.row == otherPosition.row-1 );
		}
		return false;
	}
}

class _Game {
	
	constructor( rooster, farmer, wife, hen ) {
		
		this._rooster = rooster;
		this._farmer = farmer;
		this._wife = wife;
		this._hen = hen;
		
		this._moves = 0;

	}

	log(msg){
		var elm = document.getElementById("console");
		if( elm ) {
			var val = elm.value;
			if( val.length>0 ){
				val = val + '\n' + msg;
			} else {
				val = msg;
			}
			
			elm.value = val;
			elm.scrollTop = elm.scrollHeight;
		}
	}

	
	moves(){
		return this._moves;
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
		
		if( this._rooster.position().row==row && this._rooster.position().col==col ) return true;
		if( this._farmer.position().row==row && this._farmer.position().col==col ) return true;
		if( this._wife.position().row==row && this._wife.position().col==col ) return true;
		if( this._hen.position().row==row && this._hen.position().col==col ) return true;
		return false;
	}

	availableMoves(fromRow,fromCol){
		var moves = [];
		var row;
		var col;
		
		if( fromRow instanceof Position ) {
			row = fromRow.row;
			col = fromRow.col;
		} else {
			row = fromRow;
			col = fromCol;
		}
		
		if( row>0 && !this.isOccupied(row-1, col) ) moves.push("U");
		if( row<7 && !this.isOccupied(row+1, col) ) moves.push("D");
		if( col>0 && !this.isOccupied(row, col-1) ) moves.push("L");
		if( col<7 && !this.isOccupied(row, col+1) ) moves.push("R");	
		
		return moves;
	}
	
	name(){
		return 'Chicken and Corn Game';
	};

	randomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	randomMove(arg1){
		var am;
		
		if( typeof arg1 === 'array' && arg1.length>0 ) {
			
			am = arg1;
			
		} else if( arg1 instanceof Piece ){
			var position = arg1.position();
			am = this.availableMoves( position.row, position.col );
		}
		
		var i = this.randomInt(0,am.length-1);
		return am[i];
		
	}
	
	_setBoard(table) {

		// first clear all rows/cols
		for( var r = 2; r<table.rows.length; r++){
			for( var c = 1; c<=table.rows[r].cells.length; c++ ) {
				if( table.rows[r].cells[c] ) {
					table.rows[r].cells[c].innerHTML = " ";
				}
			}
		}
		
		if( this._rooster.isActive() ) {
			table.rows[this._rooster.position().row+2].cells[this._rooster.position().col+1].innerHTML = "R";
		} else {
			table.rows[this._rooster.position().row+2].cells[this._rooster.position().col+1].innerHTML = "X";
		}

		if( this._farmer.isActive() ) {
			table.rows[this._farmer.position().row+2].cells[this._farmer.position().col+1].innerHTML = "F";
		} else {
			table.rows[this._farmer.position().row+2].cells[this._farmer.position().col+1].innerHTML = "X";
		}
		
		if( this._wife.isActive() ) {
			table.rows[this._wife.position().row+2].cells[this._wife.position().col+1].innerHTML = "W";
		} else {
			table.rows[this._wife.position().row+2].cells[this._wife.position().col+1].innerHTML = "X";
		}

		if( this._hen.isActive() ) {
			table.rows[this._hen.position().row+2].cells[this._hen.position().col+1].innerHTML = "H";
		} else {
			table.rows[this._hen.position().row+2].cells[this._hen.position().col+1].innerHTML = "X";
		}

	}
	
	// Private methods not expected to be used by pieces.

	_reset(){
		// put farmer and chicken in place
		this._rooster._position = new Position(4,0);
		this._rooster._active = true;

		this._farmer._position = new Position(4,2);
		this._farmer._active = true;

		this._wife._position = new Position(4,5);
		this._wife._active = true;

		this._hen._position = new Position(4,7);
		this._hen._active = true;
		
		this._moves = 0;

	};
	
	_next(){
		// first farmer moves
		if( this._farmer.isActive() ){
			this._farmer._next();
		}
		if( this._wife.isActive() ) {
			this._wife._next();
		}
		if( this._rooster.isActive() ) {
			this._rooster._next();
		}
		if( this._hen.isActive() ) {
			this._hen._next();
		}
		this._moves += 1;
		
		return ( this._farmer.isActive() || this._wife.isActive() );
	};
	

	
}


