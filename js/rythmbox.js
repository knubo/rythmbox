var currentSound = '../samples/Cymatics100kKick2DSharp.wav';
var drum = new Pz.Sound(currentSound, function() {
    $("#soundLoaded").html("...ready");
});

var lastCalc = new Date().getTime();
var reverb;
var currentTick = 1;

var interval = setInterval(changeTicker, 1000); // Time in milliseconds

var addedSounds = {};

function playSound(doAdd) {
    drum.stop();

    let transpose = $('#transpose').val();
    let sustain = $('#sustain').val();

    if (reverb) {
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

    if (transpose) {
        drum.sourceNode.playbackRate.value = parseFloat(transpose); // try something between 0.25 and 3
    }

    if (doAdd) {
        addSound();
    }
}

function addSound() {
    let transpose = $('#transpose').val();
    let sustain = $('#sustain').val();

    var sound = new Pz.Sound(currentSound);
    if (sustain) {
        reverb = new Pizzicato.Effects.Reverb({
            time: parseFloat(sustain),
            decay: 0.01,
            reverse: false,
            mix: 0.5
        });
        sound.addEffect(reverb);
    }

    if (!transpose) {
        transpose = 1;
    }

    if (!addedSounds[currentTick]) {
        addedSounds[currentTick] = [];
    }

    addedSounds[currentTick].push({"sound": sound, "file":currentSound, "transpose": parseFloat(transpose)});
}

function clearSound() {
    if(!addedSounds[currentTick]) {
        return;
    }

    addedSounds[currentTick] = addedSounds[currentTick].filter(function (o) {
        return o.file != currentSound;
    });

    console.debug("Sounds now:"+addedSounds[currentTick]);
}

function setSpeed() {
    if(interval) {
        clearInterval(interval);
    }

    let delay = $("#speed").val();

    if(delay > 0) {
        interval = setInterval(changeTicker, delay ? delay : 1000); // Time in milliseconds
    }
}

function delayCalc() {
    var now = new Date().getTime();

    var newVal = now - lastCalc;

    $("#speed").val(newVal);
    lastCalc = now;
}

function zeroTickCount() {
    currentTick = 0;
    for(let i = 1; i <= 16; i++) {
        $('#led' + i).removeClass("led-red");
    }
    setSpeed();
    changeTicker();

}

function switchSound() {
    $("#soundLoaded").html("loading");

    currentSound = $('#soundSelect').val();
    drum = new Pz.Sound(currentSound, function() {
        $("#soundLoaded").html("...ready");
    });
}

function changeTicker() {
    $('#led' + currentTick).removeClass("led-red");

    currentTick++;

    if (currentTick > 16) {
        currentTick = 1;
    }

    //  drum.play();

    $('#led' + currentTick).addClass("led-red");

    if (addedSounds[currentTick]) {
        addedSounds[currentTick].forEach(function (o) {
            o.sound.play();
            o.sound.sourceNode.playbackRate.value = o.transpose;
        });
    }
}