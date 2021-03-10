
class Drum {
	constructor() {
		this.kick = new Tone.Sampler("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3").toMaster();
		this.snare = new Tone.Sampler("notes/drum/Korg-TR-Rack-Standard-Kit-Snare-Drum.wav").toMaster();
		this.snareRim = new Tone.Sampler("notes/drum/Korg-TR-Rack-Standard-Kit-Side-Stick.wav").toMaster();
		this.hh = new Tone.Sampler("notes/drum/Closed-Hi-Hat-1.wav").toMaster();
		this.openHH = new Tone.Sampler("notes/drum/hihat_004b.wav").toMaster();
		this.splash = new Tone.Sampler("notes/drum/Kawai-K11-Bob-Splash-Cymbal.wav").toMaster();
		this.floorTom = new Tone.Sampler("notes/drum/Floor-Tom-1.wav").toMaster();
		this.hiTom = new Tone.Sampler("notes/drum/Hi-Tom-1.wav").toMaster();
		this.lowTom = new Tone.Sampler("notes/drum/Low-Tom-1.wav").toMaster();
		this.seqDrum;
		this.seqFill;
		this._fillTrue;
	}

	_toStructDrum = function (styleDrum, drum) {
		Tone.context.latencyHint = 'fastest';
		Tone.Transport.start('+0.2');
		return new Tone.Sequence(function (time, idx) {
			
			if (idx.kick != -1) {
				drum.kick.triggerAttack(0, "+0", 1)
			  }
			  if (idx.snare != -1) {
				drum.snare.triggerAttack(0, "+0", 1)
			  }
			  if (idx.openHH != -1) {
				drum.openHH.triggerAttack(0, "+0", 1)
			  }
			  if (idx.closedHH != -1) {
				drum.hh.triggerAttack(0, "+0", 1)
			  }

			if (drum._fillTrue && idx.startFill != -1) {
					drum.seqFill.start();
			} 
			
			if(idx.stopFill != -1 && drum._fillTrue) {
				drum.splash.triggerAttack(0, "+0", 1)
				drum.seqFill.stop();
				drum._fillTrue = false;
			}
			


			styleDrum = drum._selectedDrum();
		}, styleDrum.melody, styleDrum.notes);
	};

	play = function (styleDrum, drum) {
		drum.seqDrum = this._toStructDrum(styleDrum, drum);
		drum.seqDrum.start();
	};

	stop = function (drum) {
		drum.seqDrum.stop();
	};

	_structFill = function (styleDrum, drum) {
		return new Tone.Sequence(function (time, idx) {

			if (idx.floorTom != -1) {
				drum.floorTom.triggerAttack(0, "+0", 1)
			  }
			  if (idx.snare != -1) {
				drum.snare.triggerAttack(0, "+0", 1)
			  }
			  if (idx.openHH != -1) {
				drum.openHH.triggerAttack(0, "+0", 1)
			  }
			  if (idx.closedHH != -1) {
				drum.hh.triggerAttack(0, "+0", 1)
			  }
		}, styleDrum.fill.melody, styleDrum.fill.notes);
	}; 

	playFill = function (styleDrum, drum) {
			if (!drum._fillTrue) {
				drum.seqFill = this._structFill(styleDrum, drum);
				drum._fillTrue = true;
			}
	};
	_selectedDrum = function () {
			return selectedDrum();
	};		
}
