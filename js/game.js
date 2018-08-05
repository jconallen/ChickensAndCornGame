class Piece {
	
	constructor( name, position, code ) {
		this._active = true;
		this.name = name;
		this._algorithm = code;
		this.position = position;
	}
	
	capture( piece ) {
		if( piece instanceof Piece ) {
		   if( (this.name == "Farmer" || this.name == "Wife") &&  (piece.name == "Rooster" || piece.name == "Hen") ) {
			   if( this.isNextTo( piece ) ){
				   	this._active = false;
				   	this.position = piece.position;
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
	
	_next(){
		
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
		
		return peice.position.isNextTo(this.position);
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


class Position {
	constructor( row, col ) {
		this.row = row;
		this.col = col;
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
	
	constructor( ) {
		
		this._curMove = 0;
		this._boardPositions = [];

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

	
	totalMoves(){
		return this._boardPositions.length;
	}
	
	currentMove(){
		return this._curMove;
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
	
	_randomMove(arg1){
		var am;
		
		if( typeof arg1 === 'array' && arg1.length>0 ) {
			
			am = arg1;
			
		} else if( arg1 instanceof Piece ){
			var position = arg1.position;
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
		
		if( Rooster.isActive() ) {
			table.rows[Rooster.position.row+2].cells[Rooster.position.col+1].innerHTML = "R";
		} else {
			table.rows[Rooster.position.row+2].cells[Rooster.position.col+1].innerHTML = "X";
		}

		if( Farmer.isActive() ) {
			table.rows[Farmer.position.row+2].cells[Farmer.position.col+1].innerHTML = "F";
		} else {
			table.rows[Farmer.position.row+2].cells[Farmer.position.col+1].innerHTML = "X";
		}
		
		if( Wife.isActive() ) {
			table.rows[Wife.position.row+2].cells[Wife.position.col+1].innerHTML = "W";
		} else {
			table.rows[Wife.position.row+2].cells[Wife.position.col+1].innerHTML = "X";
		}

		if( Hen.isActive() ) {
			table.rows[Hen.position.row+2].cells[Hen.position.col+1].innerHTML = "H";
		} else {
			table.rows[Hen.position.row+2].cells[Hen.position.col+1].innerHTML = "X";
		}

	}
	
	// Private methods not expected to be used by pieces.

	_reset(){
		// put farmer and chicken in place
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
	
	_cacheBoardPositions(){
		var positions = {
				"Rooster": { "row": Rooster.position.row, "col": Rooster.position.col, "active": Rooster.isActive() },
				"Farmer": { "row": Farmer.position.row, "col": Farmer.position.col, "active": Farmer.isActive() },
				"Wife": { "row": Wife.position.row, "col": Wife.position.col, "active": Wife.isActive() },
				"Hen": { "row": Hen.position.row, "col": Hen.position.col, "active": Hen.isActive() },
		};
		this._boardPositions.push(positions);

	}
	
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


