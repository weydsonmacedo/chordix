var kick = new Tone.Player("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3").toMaster();
var snare = new Tone.Player("notes/Korg-TR-Rack-Standard-Kit-Side-Stick.wav").toMaster();
var hh = new Tone.Player("notes/Closed-Hi-Hat-1.wav").toMaster(); 
var openHH = new Tone.Player("notes/hihat_004b.wav").toMaster();
var splash = new Tone.Player("notes/Kawai-K11-Bob-Splash-Cymbal.wav").toMaster();
var floorTom = new Tone.Player("notes/Floor-Tom-1.wav").toMaster();
var snareTurn = new Tone.Player("notes/Korg-TR-Rack-Standard-Kit-Snare-Drum.wav").toMaster();
var hiTom = new Tone.Player("notes/Hi-Tom-1.wav").toMaster();
var lowTom = new Tone.Player("notes/Low-Tom-1.wav").toMaster();



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



function structTurn(styleDrum){
    var noteTurn = 16;  //Math.floor(notes.split("n")[0]) * 2;
      seq2 = new Tone.Sequence(function(time,idx){   
        //hh.start()
        

        if(styleDrum.floorTom.indexOf(idx) >=0) {
            floorTom.start();
        }else {
          snareTurn.stop();
        }
        if(styleDrum.snare.indexOf(idx) >=0){
            snareTurn.start();
        } 
         
        },styleDrum.time,noteTurn+'n');
}

function structDrum(styleDrum){
  Tone.context.latencyHint = 'fastest'; 
  Tone.Transport.start('+0.2');
  seq = new Tone.Sequence(function(time,idx){
        if(styleDrum.closedHH.indexOf(idx) >=0)
           hh.start();    
        if(styleDrum.kick.indexOf(idx) >=0)
           kick.start();
        if(styleDrum.snare.indexOf(idx) >=0)
           snareTurn.start();
        if(styleDrum.openHH.indexOf(idx) >=0) 
            openHH.start();   
      event.humanize = true;
      if(turn){
        if(styleDrum.turn.start.indexOf(idx) >=0){
          seq2.start();
        } 
        if(styleDrum.turn.stop.indexOf(idx) >=0){
            splash.start();
            seq2.stop();
            turn = false; 
         }
                   

      } 
     },styleDrum.time,'8n');
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
   
      styleDrums = $('#select_drum option:selected').val();
     
    switch (styleDrums){
     case 'rock':
         currentDrum = drumJson.rock;
        break;
     case 'samba':
          currentDrum = drumJson.samba;
        break;
     }
     
    
    if (!stop) {
      stop = true;
      seq.stop();
    }else{
      stop = false;
      bpm();
      structDrum(currentDrum);
      seq.start();
    }

    
  }



 function turns(){
  turn = true;
   structTurn(currentDrum.turn);
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

 