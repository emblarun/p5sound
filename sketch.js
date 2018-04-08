var song;
//Fast fourier transform analyzes algorithims that isolates individual audio frequenceies within a sound.
var fft;
var slider;
var sliderRate;

function setup(){
  createCanvas(700, 700);
  //Volume slider, the parameters are the range, where it starts and the how much the increment is.
  slider = createSlider(0, 1, 0.5, 0.01);
  //Speed slider
  sliderRate = createSlider(0, 2, 1, 0.01);
  //Beautfull gradient colors. Changes the way P5 interprets color data, But I don't know how this happens or how to change to other gradients....
  colorMode(HSB);
  // Default mode is radians
  angleMode(DEGREES);
  song = loadSound('roll.mp3', loaded);
  // FFT has the parameters smootheing and bins. Smoothing analyes the avereage from the last frame. Bins are how many bars appears, can only be a power of 2 between 16 1024
  fft = new p5.FFT(0.9, 256);
};

// The play button only appears when the song has loaded
function loaded() {
  console.log("loaded");
  button = createButton("Play");
  button.mousePressed(togglePlaying);
}

//Changes the button to say either pause or play, can also be stop but then it rewinds to the beginning
function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("Pause");
  } else {
    song.pause();
    button.html("Play");
  }
}

function draw() {
  background(0);

  // Volume and speed sliders. Did not figure out how to label them or move them....
  song.setVolume(slider.value());
  song.rate(sliderRate.value());

// This is where the magic happens
//The colors of the circle indicates the volume of the frequenceies red are the heighest and the blue color lowest.
  var spectrum = fft.analyze();
  noStroke();
  // This is the circle element it self
  translate(width / 2, height / 2);  // Positoning
  for (var i = 0; i < spectrum.length; i++){
    var angle = map (i, 0, spectrum.length, 0, 360)
    var amp = spectrum[i];
    //This changes the size of the circle, the height of the bars.
    var r = map(amp, 0, 256, 100, 350);
    //makes a cricle
    var x = r * cos(angle);
    var y = r * sin(angle);
    //Changes only the brightness of the circle
    stroke(i , 100, 100);
    //Centers the bars
    line(0 , 0, x, y);
  }

}
