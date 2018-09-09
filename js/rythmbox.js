var drum = new Pz.Sound('../samples/Cymatics100kKick2DSharp.wav');

var reverb;
var currentTick = 1;

var interval = setInterval(changeTicker, 1000); // Time in milliseconds

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

function setSpeed() {
    clearInterval(interval);

    let delay = $("#speed").val();

    interval = setInterval(changeTicker, delay ? delay : 1000); // Time in milliseconds

}

function changeTicker() {
    $('#led'+currentTick).removeClass("led-red");

    currentTick++;

    if(currentTick > 16) {
        currentTick = 1;
    }

  //  drum.play();

    $('#led'+currentTick).addClass("led-red");

}