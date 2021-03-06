
class Drum {
	constructor() {
		this.kick = new Tone.Player("https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3").toMaster();
		this.snare = new Tone.Player("notes/drum/Korg-TR-Rack-Standard-Kit-Snare-Drum.wav").toMaster();
		this.snareRim = new Tone.Player("notes/drum/Korg-TR-Rack-Standard-Kit-Side-Stick.wav").toMaster();
		this.hh = new Tone.Player("notes/drum/Closed-Hi-Hat-1.wav").toMaster();
		this.openHH = new Tone.Player("notes/drum/hihat_004b.wav").toMaster();
		this.splash = new Tone.Player("notes/drum/Kawai-K11-Bob-Splash-Cymbal.wav").toMaster();
		this.floorTom = new Tone.Player("notes/drum/Floor-Tom-1.wav").toMaster();
		this.hiTom = new Tone.Player("notes/drum/Hi-Tom-1.wav").toMaster();
		this.lowTom = new Tone.Player("notes/drum/Low-Tom-1.wav").toMaster();
		this.seqDrum;
		this.seqFill;
		this._fillTrue;
	}

	_toStructDrum = function (styleDrum, drum) {
		Tone.context.latencyHint = 'fastest';
		Tone.Transport.start('+0.2');
		return new Tone.Sequence(function (time, idx) {
			if (styleDrum.closedHH.indexOf(idx) >= 0) {
				drum.hh.stop();
				drum.hh.start();
			}
			if (styleDrum.kick.indexOf(idx) >= 0) {
				drum.kick.stop();
				drum.kick.start();
			}
			if (styleDrum.snare.indexOf(idx) >= 0) {
				drum.snare.stop();
				drum.snare.start();
			}
			if (styleDrum.snareRim.indexOf(idx) >= 0) {
				drum.snareRim.stop();
				drum.snareRim.start();
			}
			if (styleDrum.openHH.indexOf(idx) >= 0) {
				drum.openHH.stop();
				drum.openHH.start();
			}
			if (styleDrum.splash.indexOf(idx) >= 0) {
				drum.splash.stop();
				drum.splash.start();
			}
			if (drum._fillTrue) {
				if (styleDrum.fill.start.indexOf(idx) >= 0) {
					drum.seqFill.start();
				}
				if (styleDrum.fill.stop.indexOf(idx) >= 0) {
					drum.splash.start();
					drum.seqFill.stop();
					drum._fillTrue = false;
				}
			}
			styleDrum = drum._selectedDrum();
		}, drum._carregarTimes(styleDrum.time), styleDrum.notes);
	};

	_carregarTimes = function(time) {
		let array = new Array(time);
		for (let index = 0; index < array.length; index++) {
			array[index] = index;
		}	
		return array;
	}
	play = function (styleDrum, drum) {
		drum.seqDrum = this._toStructDrum(styleDrum, drum);
		drum.seqDrum.start();
	};

	stop = function (drum) {
		drum.seqDrum.stop();
	};

	_structFill = function (styleDrum, drum) {
		return new Tone.Sequence(function (time, idx) {
			//hh.start()
			if (styleDrum.fill.floorTom.indexOf(idx) >= 0) {
				drum.floorTom.stop();
				drum.floorTom.start();
			}
			if (styleDrum.fill.snare.indexOf(idx) >= 0) {
				drum.snare.stop();
				drum.snare.start();
			}
			if (styleDrum.fill.lowTom.indexOf(idx) >= 0) {
				drum.lowTom.stop();
				drum.lowTom.start();
			}
			if (styleDrum.fill.hiTom.indexOf(idx) >= 0) {
				drum.hiTom.stop();
				drum.hiTom.start();
			}
		}, drum._carregarTimes(styleDrum.fill.time), styleDrum.fill.notes);
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
