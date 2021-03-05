<!doctype html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>    
    <title>DeepAR</title>
    <style>

      canvas.deepar { 
        border: 0px none; 
        background-color: black; 
        display: block; 
        margin: auto; 
        -webkit-tap-highlight-color: rgba(0,0,0,0);
      }

      body {
        margin: 0px;
        padding: 0px;        
      }


      #loader-wrapper {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        text-align: center;
      }

      .loader {

        display: inline-block;
        position: relative;
        top: 42%;
        z-index: 1000;

        width: 90px;
        height: 90px;
        margin: auto;
        background-color: #00f;

        border-radius: 100%;  
        -webkit-animation: sk-scaleout 1.5s infinite ease-in-out;
        animation: sk-scaleout 1.5s infinite ease-in-out;
      }

      @-webkit-keyframes sk-scaleout {
        0% { -webkit-transform: scale(0) }
        100% {
          -webkit-transform: scale(1.0);
          opacity: 0;
        }
      }

      @keyframes sk-scaleout {
        0% { 
          -webkit-transform: scale(0);
          transform: scale(0);
        } 100% {
          -webkit-transform: scale(1.0);
          transform: scale(1.0);
          opacity: 0;
        }
      }

      .control-buttons {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 200px;
        height: 500px;
      }

      .control-buttons > button {
        width: 200px;
        height: 50px;
      }

      .effect-carousel {
        position: fixed !important;
        width: 100%;
        height: 130px;
        bottom: 0px;
        z-index: 999999;
        background-color: rgba(255, 255, 255, 0.7);
      }

      .thumb {
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: auto;
        margin-left: auto;
        position: relative;
        opacity: 0.8;
        transition: all 300ms ease;
        height: 100px;
      }

      .slick-center .thumb {
        -moz-transform: scale(1.3);
        -ms-transform: scale(1.3);
        -o-transform: scale(1.3);
        -webkit-transform: scale(1.3);
        color: #e67e22;
        opacity: 1;
        transform: scale(1.3);
      }
      .slick-slide {
        width: 130px;
      }
    </style>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link href="https://vjs.zencdn.net/7.10.2/video-js.css" rel="stylesheet" />

  </head>
  <body>

    <canvas class="deepar" id="deepar-canvas" oncontextmenu="event.preventDefault()"></canvas>
    <div id="loader-wrapper">
      <span class="loader"></span></span>
    </div>

    <div class="control-buttons">
      <!-- <button id="shareFB">shareFB</button> -->
      <div class="recording">
        <h2>Recording</h2>
        <video id="recording" width="160" height="120" class="video-js" autoplay muted></video>
      </div>
      <div class="recording">
        <h2>Screenshot</h2>
        <canvas id="screenshot" width="160" height="120"></canvas>
      </div>
      <button id="record">Start Recording</button>
      <button id="play">Play</button>
      <button id="download">Download Video</button>
      <button id="take-screenshot">Take Screenshot</button>
      <button id="download-photo">Download Photo</button>
    </div>

    <script type="text/javascript" src="lib/deepar.js"></script>
    <script type="text/javascript">

      var canvasHeight = window.innerHeight;
      var canvasWidth = window.innerWidth;
      
      // desktop, the width of the canvas is 0.66 * window height and on mobile it's fullscreen
      if (window.innerWidth > window.innerHeight) {
        canvasWidth = Math.floor(window.innerHeight*0.66);
      }

      var deepAR = DeepAR({ 
        canvasWidth: canvasWidth, 
        canvasHeight: canvasHeight,
        // licenseKey: '33202e9d7691b99b6a496784ae17638617df5724640212b2dd2d82a8ead208423f2af13947591ae0', // http://localhost:8888 => use python server.py
        licenseKey: 'c19e1e875e97c54d9d5f761f7aed6f8e1037a3c4cc9d314a8fc16e4c9a66543184ce233a62d69e20', // https://quickstart-web-js.test/ => use valet
        canvas: document.getElementById('deepar-canvas'),
        numberOfFaces: 1,
        libPath: './lib',
        segmentationInfoZip: 'segmentation.zip',
        onInitialize: function() {
          // start video immediately after the initalization, mirror = true
          deepAR.startVideo(true);

          // or we can setup the video element externally and call deepAR.setVideoElement (see startExternalVideo function below)
          // change alien string with one of other present in effects
          deepAR.switchEffect(0, 'slot', './effects/alien', function() {
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

      deepAR.downloadFaceTrackingModel('lib/models-68-extreme.bin');

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
      </script>
      <script src="https://www.webrtc-experiment.com/RecordRTC.js"></script>
      <script src="./videoRecording.js"></script>
  </body>
</html>
