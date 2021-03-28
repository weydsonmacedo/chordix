
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
        this.note;
        this.seq;
        this.melody;
        this.noteTime;
        this.lastShape;
    }
    _toStructBass = function (bass,note) {
		Tone.context.latencyHint = 'fastest';
		Tone.Transport.start('+0.2');
		 return new Tone.Sequence(function (time, idx) {

            if (idx.bass != -1) {
                bass.acusticNotes[bass.note[1]].triggerAttackRelease(idx.bass, "+0", 0.5);
              }
              //bass.acusticNotes[bass.note[1]].triggerRelease();

            //  if([0,3,8,11,16,19,24,27].indexOf(idx) >= 0) {
                
            //      bass.acusticNotes[bass.note[1]].triggerAttackRelease(Math.floor(bass.note[0]+4),"0.2", "+0", 1);
            //  }
            //  if([4,6,12,14,20,22,28,30].indexOf(idx) >= 0) {
                
            //     bass.acusticNotes[bass.note[1]].triggerAttackRelease(Math.floor(bass.note[0]),"0.1", "+0", 1);
            // }
             // 0 : tonica / 4: terça maior / 3: terça menor / 7: quinta maior/menor  / diminuta 6/ 

        }, bass.melody, bass.noteTime);

      // this.acusticNotes[note[1]].triggerAttackRelease(Math.floor(note[0]),"0.5", "+0", 1);

	};

    play = (shape,bass) =>{
      if (this.equals(this.lastShape, shape)) {
        return ;
      }
        this.lastShape = shape;
        clear(bass,shape);
        bass.melody = selectedDrum().melody;
        bass.noteTime = selectedDrum().notes;
        this.note = shape.map((x,index) => { return [x,index] }).filter(x =>{ return x[0] != 'X'})[0];
        this.seq = this._toStructBass(bass,this.note);
        this.seq.start();
    }
    stop = () => {
        if(this.seq)
            this.seq.stop();
    }
  clear =  (bass) => {
      bass.stop();
      this.e2.triggerRelease();
      this.a2.triggerRelease();
      this.d3.triggerRelease();
      this.g3.triggerRelease();
      this.c4.triggerRelease();
  }
    volume = () =>{
        this.soundVolume.forEach((x)=>{x.volume.value = -5; })
    }

  equals = (a, b) =>
    a != undefined && b != undefined  && a.length === b.length &&
    a.every((v, i) => v === b[i]);
}
