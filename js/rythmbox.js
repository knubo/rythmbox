var drum = new Pz.Sound('../samples/Cymatics100kKick2DSharp.wav');

var reverb;

function playSound() {

    let transpose = $('#transpose').val();
    let sustain = $('#sustain').val();

    if(reverb) {
        drum.removeEffect(reverb);
    }

    if (sustain) {
        reverb = new Pizzicato.Effects.Reverb({
            time: parseFloat(sustain),
            decay: 0.01,
            reverse: false,
            mix: 0.5
        });
        drum.addEffect(reverb);
    }

    drum.play();

    if(transpose) {
        drum.sourceNode.playbackRate.value = parseFloat(transpose); // try something between 0.25 and 3
    }
}

