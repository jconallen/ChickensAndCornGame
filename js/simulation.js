
function timedCount(){
	Game._next();
}

timedCount();


//	async function runStep(){
//		return await Game._next();
//	}
//	
//	async function avgRuns(runs){
//		var elm = document.getElementById("multirunConsole");
//		elm.value = "";
//    	var sum = 0;
//		for(var i=0; i<runs; i++) {
//			try{
//				var running = true;
//				while( running && !stopSimulations ){
//					running = await runStep();
//				};
//				m = Game.totalMoves();
//				alert(m);
//				log( 'run(' + i + ') -> ' + m );
//				Game._reset();
//			} catch( err ) {
//				alert(err);
//			}
//			sum = sum + m;				
//		}
//		log( '-----\nAverage run: ' + (sum/runs) );
//	}
//	
//	async function runMulti(){
//		var elm = document.getElementById("noRuns");
//		var runsStr = elm.value;
//		if(runsStr != null) {
//		    var runs = Number(runsStr);
//		    await avgRuns(runs);
//		}  
//	}
//	
//	async function log(msg){
//		var elm = document.getElementById("multirunConsole");
//		if( elm ) {
//			var val = elm.value;
//			if( val.length>0 ){
//				val = val + '\n' + msg;
//			} else {
//				val = msg;
//			}
//			
//			elm.value = val;
//			elm.scrollTop = elm.scrollHeight;
//		}
//	}
	