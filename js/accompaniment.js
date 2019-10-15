
var soundDrum = new Drum();
stop = true;
var seq ;
var seq2 ;
var turn = false;
var drumJson;
var currentDrum;

loadJSON(function(response) {
  // Parse JSON string into object
   drumJson = JSON.parse(response);
 });



/*function structTurn(styleDrum){
      seq2 = new Tone.Sequence(function(time,idx){   
        //hh.start()
        

        if(styleDrum.floorTom.indexOf(idx) >=0) {
            soundDrum.floorTom.start();
        }else {
          soundDrum.snare.stop();
        }
        if(styleDrum.snare.indexOf(idx) >=0){
            soundDrum.snare.start();
        } 
        if(styleDrum.lowTom.indexOf(idx) >=0){
            soundDrum.lowTom.start();
        } 
        if(styleDrum.hiTom.indexOf(idx) >=0){
            soundDrum.hiTom.start();
        } 
         
        },styleDrum.time,styleDrum.notes);
}

function structDrum(styleDrum){
  Tone.context.latencyHint = 'fastest'; 
  Tone.Transport.start('+0.2');
  seq = new Tone.Sequence(function(time,idx){
        if(styleDrum.closedHH.indexOf(idx) >=0)
           soundDrum.hh.start();    
        if(styleDrum.kick.indexOf(idx) >=0)
           soundDrum.kick.start();
        if(styleDrum.snare.indexOf(idx) >=0)
           soundDrum.snare.start();
        if(styleDrum.snareRim.indexOf(idx) >=0)
           soundDrum.snareRim.start(); 
        if(styleDrum.openHH.indexOf(idx) >=0) 
            soundDrum.openHH.start();
        if(styleDrum.splash.indexOf(idx) >=0) 
            soundDrum.splash.start();          
      event.humanize = true;
      if(turn){
        if(styleDrum.turn.start.indexOf(idx) >=0){
          seq2.start();
        } 
        if(styleDrum.turn.stop.indexOf(idx) >=0){
            soundDrum.splash.start();
            seq2.stop();
            turn = false; 
         }
      }
       styleDrum = selectedDrum();    
       
     },styleDrum.time,styleDrum.notes);
}

*/
function selectedDrum() {
  loadJSON(function(response) {
         drumJson = JSON.parse(response);
      });
   styleDrums = $('#select_drum option:selected').val();
     
    switch (styleDrums){
     case 'rock':
         currentDrum = drumJson.rock;
        break;
     case 'samba':
          currentDrum = drumJson.samba;
        break;
     }
     return currentDrum;
}


  function playDrum(){
    // var p1 = new Tone.Players({
    //   "kick": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3',
    //   "snare": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3',
    //   "hihat": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3'
    // }, function(){
    //   //console.log('loaded')
    // });
    //  kick.connect(soundFix.volume);
     //hh.connect(soundFix.volume);
    //  snare.connect(soundFix.volume);
      selectedDrum();
     
     
    
    if (!stop) {
      stop = true;
      //seq.stop();
       soundDrum.stop(soundDrum);
    }else{
      stop = false;
      bpm();
      //structDrum(currentDrum);
      //seq.start();
       soundDrum.play(currentDrum,this.soundDrum);
    }

    
  }



 function turns(){
   turn = true;
   //structTurn(currentDrum.turn);
   soundDrum.playTurn(currentDrum,this.soundDrum);
 }

 function bpm(){
  var bpm = $('#bpm').val();
     if(bpm && bpm >1 && bpm <1000){
      Tone.Transport.bpm.value = bpm;
     } else{
       Tone.Transport.bpm.value = 100;
     }
     
 }



 function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../notes/drumRhythm.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 