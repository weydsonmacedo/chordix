
function Drum() {
	this.kick     =  new Tone.Player("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3").toMaster();
	this.snare    =  new Tone.Player("notes/Korg-TR-Rack-Standard-Kit-Snare-Drum.wav").toMaster();
	this.snareRim =  new Tone.Player("notes/Korg-TR-Rack-Standard-Kit-Side-Stick.wav").toMaster();
	this.hh       =  new Tone.Player("notes/Closed-Hi-Hat-1.wav").toMaster(); 
	this.openHH   =  new Tone.Player("notes/hihat_004b.wav").toMaster();
	this.splash   =  new Tone.Player("notes/Kawai-K11-Bob-Splash-Cymbal.wav").toMaster();
	this.floorTom =  new Tone.Player("notes/Floor-Tom-1.wav").toMaster();
	this.hiTom    =  new Tone.Player("notes/Hi-Tom-1.wav").toMaster();
	this.lowTom   =  new Tone.Player("notes/Low-Tom-1.wav").toMaster();

	this.seqDrum;
	this.seqTurn;
	this._turnTrue;
	this._toStructDrum =  function(styleDrum, drum){
		Tone.context.latencyHint = 'fastest'; 
  		Tone.Transport.start('+0.2');
  		return  new Tone.Sequence(function(time,idx){
	        if(styleDrum.closedHH.indexOf(idx) >=0){
	        	drum.hh.stop();	
	        	drum.hh.start();
	        }
	        if(styleDrum.kick.indexOf(idx) >=0){
	        	drum.kick.stop();
	       		drum.kick.start();
	        }	
	        if(styleDrum.snare.indexOf(idx) >=0){
	        	drum.snare.stop();	
	        	drum.snare.start();
	        }	
	        if(styleDrum.snareRim.indexOf(idx) >=0){
	        	drum.snareRim.stop();
	        	drum.snareRim.start(); 
	        }	
	        if(styleDrum.openHH.indexOf(idx) >=0){
	        	drum.openHH.stop();
	        	drum.openHH.start();
	        } 	
	        if(styleDrum.splash.indexOf(idx) >=0){
	        	drum.splash.stop();
	            drum.splash.start();
	        }         
	      	if(drum._turnTrue){
	       		if(styleDrum.turn.start.indexOf(idx) >=0){
	        		drum.seqTurn.start();
	       		} 
		        if(styleDrum.turn.stop.indexOf(idx) >=0){
		            drum.splash.start();
		            drum.seqTurn.stop();
		            drum._turnTrue = false; 
		         }
	      }
	       styleDrum = selectedDrum();    
	       
	     },styleDrum.time,styleDrum.notes);
	}

	this.play = function(styleDrum, drum){
		drum.seqDrum = this._toStructDrum(styleDrum,drum);
		drum.seqDrum.start();
	}

	this.stop = function(drum){
		drum.seqDrum.stop();
	}

	this._structTurn = function(styleDrum, drum){
     return new Tone.Sequence(function(time,idx){   
        //hh.start()
	        if(styleDrum.turn.floorTom.indexOf(idx) >=0) {
	            drum.floorTom.stop();
	            drum.floorTom.start();
	        }
	        if(styleDrum.turn.snare.indexOf(idx) >=0){
	        	drum.snare.stop();
	            drum.snare.start();
	        } 
	        if(styleDrum.turn.lowTom.indexOf(idx) >=0){
	            drum.lowTom.stop();
	            drum.lowTom.start();
	        } 
	        if(styleDrum.turn.hiTom.indexOf(idx) >=0){
	        	drum.hiTom.stop();
	            drum.hiTom.start();
	        } 
	         
	        },styleDrum.turn.time,styleDrum.turn.notes);
	}

	this.playTurn = function(styleDrum, drum){
		if(!drum._turnTrue){
			drum.seqTurn = this._structTurn(styleDrum,drum);
			drum._turnTrue = true;	
		}	
		
	}

	this._selectedDrum  = function(styleDrum){
		return styleDrum;
	}
	
}