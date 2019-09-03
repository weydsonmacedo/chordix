var drums = new Howl({
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
      stop= false;
      drums.play('blast');
    },
    sprite: {
      blast: [0, 3000],
      laser: [4000, 1000],
      winner: [7000, 1000]
    }
  });
  var stop = true;


  function drum(){
    /*var p1 = new Tone.Players({
      "kick": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3',
      "snare": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3',
      "hihat": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3'
    }, function(){
      //console.log('loaded')
    });
  */
  if(stop) {
    stop= false;
    drums.play('blast');
    drums.rate(1);
  }else {
    stop=true;
    drums.stop();
  }
  //player.connect(soundFix.volume);
  //player.start();
  }
  
  function turns(){
    drums.stop();
    turn.play('winner');
    turn.rate(1);
  }