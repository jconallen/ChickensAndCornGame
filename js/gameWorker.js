self.importScripts('position.js', 'piece.js', 'game.js');

const Rooster = new Piece( "Rooster", false  );
const Farmer = new Piece( "Farmer", true );
const Wife = new Piece( "Wife", true );
const Hen = new Piece( "Hen", false );
var Me;

var Game = new _Game();

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
		
		var gameState = Game._gameState();
		postMessage( gameState );

		
	} else if( e.data.action == "next" ) {
		
		try{
			Game._next();
			var gameState = Game._gameState();
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
		Rooster.setPosition( player.row, player.col );
		player = e.data.farmer;
		Farmer.setPosition( player.row, player.col );
		player = e.data.wife;
		Wife.setPosition( player.row, player.col );
		player = e.data.hen;
		Hen.setPosition( player.row, player.col );
		var gameState = Game._gameState();
		postMessage( gameState );
	} 
};



