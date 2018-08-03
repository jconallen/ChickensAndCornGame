function makeEvalContext (declarations){
    eval(declarations);
    return function (str) { eval(str); }
}

class Piece {
	
	constructor( id, position, code ) {
		this._active = true;
		this._id = id;
		this._algorithm = code;
		this._position = position;
	}
	
	id(){
		return this._id;
	}
	
	position(){
		return this._position;
	}
	
	capture( piece ) {
		if( piece instanceof Piece ) {
		   if( (this._id == "Farmer" || this._id == "Wife") &&  (piece._id == "Rooster" || piece._id == "Hen") ) {
			   if( this.isNextTo( piece ) ){
				   	this._active = false;
				   	this._position = piece.position();
				   	piece._active = false;
				   	return "X";
			   } else {
				   throw this._id + " not next to " + this._id + ", can not capture.";
			   }
		   }
		   throw "Invalid argument types.  " + this._id + " can not capture " + piece._id + ".";
		};
		throw "Invalid argument for capture: " + piece.constructor.name;
	}
	
	isActive(){
		return this._active;
	}
	
	next(){
		
		var availableMoves = Game.availableMoves(this.position());
		
		var result;
		try{
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
				
				var row = this._position.row();
				var col = this._position.col();
				
				switch( move ) {
				case 'U': row = row - 1; break;
				case 'D': row = row + 1; break;
				case 'L': col = col - 1; break;
				case 'R': col = col + 1; break;
				}
				
				this._position  = new Position(row, col);
				
			} else {
				throw "Invalid move " + result + " for " + this._id ; 
			}
			
			
		} else {
			throw this._id + " must make a move.";  
		}
		
		
	}
	
	isNextTo(peice) {
		
		return peice.position().isNextTo(this._position);
	}
	
	distanceTo( row, col ) {
		var r = this._position._row;
		var c = this._position._col;
		
		var d = Math.abs( row - r ) + Math.abs( col - c ) ;
		return d;
	}
	
	algorithm(){
		return this._algorithm; 
	}
	
	setAlgorithm(algorithm){
		this._algorithm = algorithm;
	}
}


class Position {
	constructor( row, col ) {
		this._row = row;
		this._col = col;
	};
	
	row(){
		return this._row;
	}
	
	col(){
		return this._col;
	}

	setRow(r){
		this._row = r;
	}
	
	setCol(c){
		this._col = c;
	}
	
	move(direction){
		switch(direction){
		case 'U': {
			if( this._col>0 && !_game.isOccupied(this._row, this._col-1) ) {
				this._col -= 1;
			} else {
				throw "Invalid move up";
			}
			break;
		}
		case 'D': {
			if( this._col<7 && !_game.isOccupied(this._row, this._col+1) ) {
				this._col += 1;
			} else {
				throw "Invalid move down";
			}
			break;
		}
		case 'L': {
			if( this._row>0 && !_game.isOccupied(this._row-1, this._col) ) {
				this._row -= 1;
			} else {
				throw "Invalid move left";
			}
			break;
		}
		case 'R': {
			if( this._row<7 && !_game.isOccupied(this._row+1, this._col) ) {
				this._row += 1;
			} else {
				throw "Invalid move right";
			}
			break;
		}
		}
		
	};
	
	isNextTo(otherPosition) {
		if( this._row == otherPosition.row() ) {
			return ( this._col == otherPosition.col()+1 || this._col == otherPosition.col()-1 );
		} else if( this._col == otherPosition.col() ) {
			return ( this._row == otherPosition.row()+1 || this._row == otherPosition.row()-1 );
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
	
	moves(){
		return this._moves;
	}
	
	
	setBoard(table) {

		// first clear all rows/cols
		for( var r = 2; r<table.rows.length; r++){
			for( var c = 1; c<=table.rows[r].cells.length; c++ ) {
				if( table.rows[r].cells[c] ) {
					table.rows[r].cells[c].innerHTML = " ";
				}
			}
		}
		
		if( this._rooster.isActive() ) {
			table.rows[this._rooster.position().row()+2].cells[this._rooster.position().col()+1].innerHTML = "R";
		} else {
			table.rows[this._rooster.position().row()+2].cells[this._rooster.position().col()+1].innerHTML = "X";
		}

		if( this._farmer.isActive() ) {
			table.rows[this._farmer.position().row()+2].cells[this._farmer.position().col()+1].innerHTML = "F";
		} else {
			table.rows[this._farmer.position().row()+2].cells[this._farmer.position().col()+1].innerHTML = "X";
		}
		
		if( this._wife.isActive() ) {
			table.rows[this._wife.position().row()+2].cells[this._wife.position().col()+1].innerHTML = "W";
		} else {
			table.rows[this._wife.position().row()+2].cells[this._wife.position().col()+1].innerHTML = "X";
		}

		if( this._hen.isActive() ) {
			table.rows[this._hen.position().row()+2].cells[this._hen.position().col()+1].innerHTML = "H";
		} else {
			table.rows[this._hen.position().row()+2].cells[this._hen.position().col()+1].innerHTML = "X";
		}

	}
	
	isOccupied(arg1, arg2){
		var row;
		var col;
		
		if( typeof arg1 === 'object' ) {
			row = arg1.row();
			col = arg1.col();
		} else {
			row = arg1;
			col = arg2;
		}
		
		if( this._rooster.position().row()==row && this._rooster.position().col()==col ) return true;
		if( this._farmer.position().row()==row && this._farmer.position().col()==col ) return true;
		if( this._wife.position().row()==row && this._wife.position().col()==col ) return true;
		if( this._hen.position().row()==row && this._hen.position().col()==col ) return true;
		return false;
	}

	availableMoves(fromRow,fromCol){
		var moves = [];
		var row;
		var col;
		
		if( typeof fromRow === 'object' ) {
			row = fromRow.row();
			col = fromRow.col();
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
	
	reset(){
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
	
	next(){
		// first farmer moves
		if( this._farmer.isActive() ){
			this._farmer.next();
		}
		if( this._wife.isActive() ) {
			this._wife.next();
		}
		if( this._rooster.isActive() ) {
			this._rooster.next();
		}
		if( this._hen.isActive() ) {
			this._hen.next();
		}
		this._moves += 1;
		
		return ( this._farmer.isActive() || this._wife.isActive() );
	};
	
	run(){
		
	};
	
	name(){
		return 'Chicken and Corn';
	};
	
	updateRooster(algorithm){
		this._rooster.setAlgorithm( algorithm );
	}

	updateFarmer(algorithm){
		this._farmer.setFarmerAlgorithm( algorithm );
	}

	updateWife(algorithm){
		this._wife.setWifeAlgorithm( algorithm );
	}

	updateHen(algorithm){
		this._hen.setHenAlgorithm( algorithm );
	}
	
	distanceBetween( p1, p2 ) {
		// returns the taxi distance between the two pieces
	}

	randomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	randomMove(arg1){
		var am;
		
		if( typeof arg1 === 'array' && arg1.length>0 ) {
			
			am = arg1;
			
		} else if( typeof arg1 === 'object' ){
			var position = arg1.position();
			am = this.availableMoves( position.row(), position.col() );
		}
		
		var i = this.randomInt(0,am.length-1);
		return am[i];
		
	}

	
}


