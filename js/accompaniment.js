var kick = new Tone.Player("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3").toMaster();
var snare = new Tone.Player("notes/Korg-TR-Rack-Standard-Kit-Side-Stick.wav").toMaster();
var hh = new Tone.Player("notes/Closed-Hi-Hat-1.wav").toMaster(); 
var openHH = new Tone.Player("notes/hihat_004b.wav").toMaster();
var splash = new Tone.Player("notes/Kawai-K11-Bob-Splash-Cymbal.wav").toMaster();

stop = true;
var seq ;
var seq2 ;
var turn = false;
var notes;

function structTurn(){
    var noteTurn =   Math.floor(notes.split("n")[0]) * 2;
      seq2 = new Tone.Sequence(function(time,idx){   
     //   hh.start()
        snare.start();
        console.log('ta')
        },[0,1],noteTurn+'n');
}


function structDrum(){
  Tone.context.latencyHint = 'fastest'; 
  Tone.Transport.start('+0.2');
  seq = new Tone.Sequence(function(time,idx){
        hh.start();    
        if([0,4,7,8,12].indexOf(idx) >=0)
           kick.start();
        if([2,6,10,14].indexOf(idx) >=0)
           snare.start();
        if([5,13].indexOf(idx) >=0) 
            openHH.start();   
      event.humanize = true;
      if(turn){
        if([14].indexOf(idx) >=0){
          seq2.start();
        } 
        if([0].indexOf(idx) >=0){
            splash.start();
            seq2.stop();
            turn = false; 
         }
                   

      } 
     },[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],notes);
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
      notes = $('#select_drum option:selected').val();
     var bpm;
     if($('#bpm').val()){
       bpm = $('#bpm').val();
     } else{
       bpm = 100;
     }
     Tone.Transport.bpm.value = bpm;

      
   
    
     toControl();

    
  }
  
function toControl() {
  if (!stop) {
      stop = true;
      seq.stop();
    }else{
      stop = false;
      structDrum();
      seq.start();
    }
}


 function turns(){
  turn = true;
   structTurn();
 }