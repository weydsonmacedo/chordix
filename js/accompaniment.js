var kick = new Tone.Player("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3").toMaster();
var snare = new Tone.Player("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3").toMaster();
var hh = new Tone.Player("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3").toMaster();
var drums;
var stop = true;

var drum = new Howl({
    src: ['notes/Rock3.wav'],
    autoplay: false,
    loop: true,
    volume: 1,
    onstop: function() {
      console.log('Finished!');
    },
    sprite: {
      blast: [0, 3000],
      laser: [4000, 1000],
      winner: [7000, 7500]
    }
  });
  
var drum2 = new Howl({
  src: ['notes/Rock7.wav'],
  autoplay: false,
  loop: true,
  volume: 1,
  sprite: {
    blast: [0, 3000],
    laser: [4000, 1000],
    winner: [7000, 7500]
  }
});
  var turn = new Howl({
    src: ['notes/Rock3.wav'],
    autoplay: false,
    loop: false,
    volume: 1,
    onplay: function() {
     // stop= true;
      //drums.stop();
    },
    onend: function() {
      if(drums){
        stop= false;
        drums.play('blast');
      }
    },
    sprite: {
      blast: [0, 3000],
      laser: [4000, 1000],
      winner: [7000, 1000]
    }
  });


  function playDrum(){
    // var p1 = new Tone.Players({
    //   "kick": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3',
    //   "snare": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3',
    //   "hihat": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3'
    // }, function(){
    //   //console.log('loaded')
    // });
     kick.connect(soundFix.volume);
     hh.connect(soundFix.volume);
     snare.connect(soundFix.volume);
     Tone.context.latency = 'fastest';  
     Tone.Transport.bpm.value = 120;
    //  Tone.Sequence.defaults = "8n";
     var seq = new Tone.Sequence(function(time,idx){
       hh.start();    
       if([0,4,8,12].indexOf(idx) >=0)
          kick.start();
        if([2,6,10,14].indexOf(idx) >=0)
           snare.start();
       console.log(idx);
       console.log(time);
     },[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],"8n");
     Tone.Transport.start('+0.2');
     seq.start();
  }
  
function toControl(drums) {
  if (stop) {
    stop = false;
    drums.play('blast');
    drums.rate(1);
    disable(true);
  } else {
    stop = true;
    drums.stop();
    disable(false);
  }
}

  function turns(){
    if(drums){
      disable(true);
      drums.stop();
    }
    turn.play('winner');
    turn.rate(1);
  }


  function stopall(){
    drum.stop();
    drum2.stop();
  }

  function disable(x){
    $('#type_drum').prop("disabled",x);
  }

 