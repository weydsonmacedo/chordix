var player = new Tone.Player("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3").toMaster();
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
    /*var p1 = new Tone.Players({
      "kick": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3',
      "snare": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3',
      "hihat": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3'
    }, function(){
      //console.log('loaded')
    });
     player.connect(soundFix.volume);
     player.start();
  */

   var typeDrum =  $('#type_drum').val();
   
   switch (typeDrum) {
    case '0': 
      drums  = drum;
      break;
    case '1':
      drums =  drum2;
      break;
  }
  toControl(drums);
 
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

 