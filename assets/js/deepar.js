var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;

// desktop, the width of the canvas is 0.66 * window height and on mobile it's fullscreen
if (window.innerWidth > window.innerHeight) {
  canvasWidth = Math.floor(window.innerHeight*0.66);
}

var deepAR = DeepAR({ 
  canvasWidth: canvasWidth, 
  canvasHeight: canvasHeight,
  // licenseKey: '33202e9d7691b99b6a496784ae17638617df5724640212b2dd2d82a8ead208423f2af13947591ae0',
  licenseKey: 'c19e1e875e97c54d9d5f761f7aed6f8e1037a3c4cc9d314a8fc16e4c9a66543184ce233a62d69e20',
  canvas: document.getElementById('deepar-canvas'),
  numberOfFaces: 1,
  libPath: './assets/deepar/lib',
  segmentationInfoZip: 'segmentation.zip',
  onInitialize: function() {
    // start video immediately after the initalization, mirror = true
    deepAR.startVideo(true);

    // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)
    deepAR.switchEffect(0, 'slot', './assets/deepar/effects/aviators', function() {
      // effect loaded
    });
  }
});

deepAR.onCameraPermissionAsked = function() {
  console.log('camera permission asked');
};

deepAR.onCameraPermissionGranted = function() {
  console.log('camera permission granted');
};

deepAR.onCameraPermissionDenied = function() {
  console.log('camera permission denied');
};

// screenshot taken
var canvasScreenshot = document.getElementById("screenshot");
var context = canvasScreenshot.getContext("2d");
var image = new Image();
deepAR.onScreenshotTaken = function(photo) {
  image.src = photo;
  image.onload = function() {
    // get the scale
    var scale = Math.min(canvasScreenshot.width / image.width, canvasScreenshot.height / image.height);
    // get the top left position of the image
    var x = (canvasScreenshot.width / 2) - (image.width / 2) * scale;
    var y = (canvasScreenshot.height / 2) - (image.height / 2) * scale;
    context.drawImage(image, x, y, image.width * scale, image.height * scale);
  };
  console.log('screenshot taken');
  document.getElementById('download-photo').click();
};

deepAR.onImageVisibilityChanged = function(visible) {
  console.log('image visible', visible);
};

deepAR.onFaceVisibilityChanged = function(visible) {
  console.log('face visible', visible);
};

deepAR.onVideoStarted = function() {
  var loaderWrapper = document.getElementById('loader-wrapper');
  loaderWrapper.style.display = 'none';
};

deepAR.downloadFaceTrackingModel('./assets/deepar/lib/models-68-extreme.bin');

// Position the carousel to cover the canvas
if (window.innerWidth > window.innerHeight) {
  var width = Math.floor(window.innerHeight*0.66);
  var carousel = document.getElementsByClassName('effect-carousel')[0];
  carousel.style.width = width + 'px';
  carousel.style.marginLeft = (window.innerWidth-width)/2 + "px";
}

// take screenshot
document.getElementById('take-screenshot').onclick = function() {
  deepAR.takeScreenshot();
  console.log('click take-screenshot');        
}

// add download photo
document.getElementById('download-photo').onclick = function() {
  var a = document.createElement('a');
  a.href = image.src; // add href base64 img
  a.download = 'photo.png'; // name file
  document.body.appendChild(a);
  a.click(); // download file
  console.log('click download-photo');
}

// effect carousel
$(document).ready(function() {
  $('.effect-carousel').slick({
    slidesToShow: 1,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    accessibility: false,
    variableWidth: true
  });

  var effects = [
  // './effects/background_segmentation',
  './assets/deepar/effects/aviators',
  './assets/deepar/effects/beard',
  './assets/deepar/effects/dalmatian',
  './assets/deepar/effects/flowers',
  './assets/deepar/effects/koala',
  './assets/deepar/effects/lion',
  './assets/deepar/effects/teddycigar',
  './assets/deepar/effects/alien',
  './assets/deepar/effects/scuba'
  ];

  $('.effect-carousel').on('afterChange', function(event, slick, currentSlide){
    deepAR.switchEffect(0, 'slot', effects[currentSlide]);
  });        
});