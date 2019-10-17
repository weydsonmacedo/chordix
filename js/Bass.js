
class Bass {
    constructor() {
        //faltando arquivo this.b1       =  new Tone.Player("notes/bass/b1.wav").toMaster()
        this.e2 = new Tone.Sampler("notes/bass/2CJF-sus-soft-mi-E2.wav").toMaster();
        this.a2 = new Tone.Sampler("notes/bass/2CJF-sus-hard-mi-A2.wav").toMaster();
        this.d3 = new Tone.Sampler("notes/bass/2CJF-sus-hard-mi-D3.wav").toMaster();
        this.g3 = new Tone.Sampler("notes/bass/2CJF-sus-hard-mi-G3.wav").toMaster();
        this.c4 = new Tone.Sampler("notes/bass/2CJF-sus-med2-mi-C4.wav").toMaster();
        this.acusticNotes = [this.e2,this.a2,this.d3,this.g3,this.c4];
        this.soundVolume = [this.e2,this.a2,this.d3,this.g3,this.c4];
        this.volume();
    }
    _toStructBass = function ( note) {
		Tone.context.latencyHint = 'fastest';
		Tone.Transport.start('+0.2');
	/*	 return new Tone.Sequence(function (time, idx) {
		 	this.acusticNotes[note[1]].triggerAttack(Math.floor(note[1]), "+0", 1);
         }, [0], "8n");*/

        this.acusticNotes[note[1]].triggerAttackRelease(Math.floor(note[0]),"0.8", "+0", 1);
	};

    play = function(shape){
       var note = shape.map((x,index) => { return [x,index] }).filter(x =>{ return x[0] != 'X'})[0];
        this._toStructBass(note);
    }
   clear  = function() {
        this.e2.triggerRelease();
        this.a2.triggerRelease();
        this.d3.triggerRelease();
        this.g3.triggerRelease();
        this.c4.triggerRelease();
      }
    volume = function(){
        this.soundVolume.forEach((x)=>{x.volume.value = -5; })
    }
}
