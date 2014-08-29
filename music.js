    // This music has been exported by SoundBox. You can use it with
    // http://sb.bitsnbites.eu/player-small.js in your own product.

    // See http://sb.bitsnbites.eu/demo.html for an example of how to
    // use it in a demo.

    // Song data
    var song = {};
    
function startDemo() {
  //----------------------------------------------------------------------------
  // Music data section
  //----------------------------------------------------------------------------

  //----------------------------------------------------------------------------
  // Demo program section
  //----------------------------------------------------------------------------

  // Initialize music generation (player).
  var t0 = new Date();
  var player = new CPlayer();
  player.init(song);

  // Generate music...
  var done = false;
  setInterval(function () {
    if (done) {
      return;
    }

    done = player.generate() >= 1;

    if (done) {
      // Put the generated song in an Audio element.
      var wave = player.createWave();
      var audio = document.createElement("audio");
      audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
      audio.loop = true;
      audio.play();
    }
  }, 0);
}
//startDemo();