
var soundDrum = new Drum();
stop = true;
var seq ;
var seq2 ;
var turn = false;
var drumJson;
var currentDrum = 0;

load();

function load(){
  loadJSON(function(response) {
    var temp = JSON.parse(response);
  if( JSON.stringify(drumJson) != JSON.stringify(temp)){
      drumJson = JSON.parse(response);

      var tempSelect = $('#select_drum option:selected').val(); 
      
      $("#type_drum").empty();
      for (let index = 0; index < drumJson.length; index++) {
        var o = new Option(drumJson[index].name, index);
        $(o).html(drumJson[index].name);
        $("#type_drum").append(o);
    }
    if(tempSelect) {
      $("#select_drum option:eq("+tempSelect+")").attr('selected','selected');
    }
  }      
 });
}



function selectedDrum() {
   styleDrums = $('#select_drum option:selected').val();
   load();
   currentDrum = drumJson[styleDrums];
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
       soundDrum.stop(soundDrum);
    }else{
      stop = false;
      bpm();
       soundDrum.play(currentDrum,this.soundDrum);
    }

    
  }




 function turns(){
   turn = true;
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

 