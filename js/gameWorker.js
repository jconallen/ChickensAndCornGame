self.importScripts('position.js', 'piece.js', 'game2.js');

const Rooster = new Piece( "Rooster", false  );
const Farmer = new Piece( "Farmer", true );
const Wife = new Piece( "Wife", true );
const Hen = new Piece( "Hen", false );
var Me;

var Game = new _Game();

var initialized = false;

function log(msg){
	var msg = { "log": msg };
	postMessage(msg);
}

onmessage = function(e){
	
	if( e.data.action == "initialize" ) {
		
		Game._reset();

		var player;
		
		player = e.data.pieces.rooster;
		Rooster.init( player.row, player.col, player.algorithm, player.active, player.visible );
		player = e.data.pieces.farmer;
		Farmer.init( player.row, player.col, player.algorithm, player.active, player.visible );
		player = e.data.pieces.wife;
		Wife.init( player.row, player.col, player.algorithm, player.active, player.visible );
		player = e.data.pieces.hen;
		Hen.init( player.row, player.col, player.algorithm, player.active, player.visible );
		

		initialized = true;
		postMessage( { 
			"ready": Game.isActive(),
			"pieces": e.data.pieces,
			"currentMove": 0,
			"totalMoves": 1
		} );
		
	} else if( e.data.action == "next" ) {
		
		try{
			Game._next();
			var moves = Game.totalMoves();
			var gameState = Game._gameState();
			if( !Game.isActive() ) {
				gameState.totalMoves = Game.totalMoves();
			}
			postMessage( gameState );
		} catch( err ) {
			log( err );
		}
		
	} else if( e.data.action == "prev" ) {
		try{
			Game._prev();
			var gameState = Game._gameState();
			postMessage( gameState );
		} catch( err ) {
			log( err );
		}
	} else if( e.data.action == "set" ) {
		// set the pieces on the board
		player = e.data.rooster;
		Rooster.init( player.row, player.col, player.algorithm, player.active, player.visible );
		player = e.data.farmer;
		Farmer.init( player.row, player.col, player.algorithm, player.active, player.visible );
		player = e.data.wife;
		Wife.init( player.row, player.col, player.algorithm, player.active, player.visible );
		player = e.data.hen;
		Hen.init( player.row, player.col, player.algorithm, player.active, player.visible );
		var gameState = Game._gameState();
		postMessage( gameState );
	}

};



