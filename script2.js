// add video recording
let mediaRecorder;
let stream;
let recordedBlobs;
let sourceBuffer;
const canvas = document.querySelector('canvas#deepar-canvas');
const video = document.querySelector('video#recording');

const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecordingCallback;
playButton.onclick = play;
downloadButton.onclick = download;
playButton.disabled = true;
downloadButton.disabled = true;

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaRecorder.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
  const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  video.src = window.URL.createObjectURL(superBuffer);
}

async function toggleRecordingCallback() {
  if (recordButton.textContent === 'Start Recording') {
    startRecordingCallback();
  } else {
    stopRecordingCallback();          
  }
}

async function stopRecordingCallback() {
    await mediaRecorder.stopRecording();
    // video.srcObject = null;
    recordedBlobs = await mediaRecorder.getBlob();
    video.src = window.URL.createObjectURL(recordedBlobs);
    mediaRecorder.stream.getTracks(t => t.stop());
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
    video.controls = true;
    
    // reset recorder's state
    await mediaRecorder.reset();

    // clear the memory
    await mediaRecorder.destroy();

    // so that we can record again
    mediaRecorder = null;
}

function play() {
  video.play();
}

function download() {
  console.log('download');
  const url = window.URL.createObjectURL(recordedBlobs);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

async function startRecordingCallback() {
    recordedBlobs = null;
    stream = canvas.captureStream(); // frames per second
    console.log('Started stream capture from canvas element: ', stream);
    // stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    // video.srcObject = stream;
    const options = {
        type: 'video',
        mimeType: 'video/webm',
        timeSlice: 1000,
        recorderType: MediaStreamRecorder
    };
    // RecordRTCPromisesHandler adds promises support in RecordRTC. Try a demo here
    mediaRecorder = new RecordRTCPromisesHandler(stream, options);
    
    // helps releasing camera on stopRecording
    mediaRecorder.stream = stream;

    console.log('Created mediaRecorder.stream', mediaRecorder, 'with options', options);
    recordButton.textContent = 'Stop Recording';
    playButton.disabled = true;
    downloadButton.disabled = true;
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    await mediaRecorder.startRecording(); // start recording
    console.log('MediaRecorder started', mediaRecorder);
    
    // if you want to access internal recorder
    const internalRecorder = await mediaRecorder.getInternalRecorder();
    console.log('internal-recorder', internalRecorder.name);

    // if you want to read recorder's state
    console.log('recorder state: ', await mediaRecorder.getState());
}

// const options = {
//       // audio, video, canvas, gif
//       type: 'video',
//       // audio/webm
//       // audio/webm;codecs=pcm
//       // video/mp4
//       // video/webm;codecs=vp9
//       // video/webm;codecs=vp8
//       // video/webm;codecs=h264
//       // video/x-matroska;codecs=avc1
//       // video/mpeg -- NOT supported by any browser, yet
//       // audio/wav
//       // audio/ogg  -- ONLY Firefox
//       // demo: simple-demos/isTypeSupported.html
//       mimeType: 'video/webm',
//       // MediaStreamRecorder, StereoAudioRecorder, WebAssemblyRecorder
//       // CanvasRecorder, GifRecorder, WhammyRecorder
//       recorderType: MediaStreamRecorder,
//       // disable logs
//       disableLogs: false,
//       // get intervals based blobs
//       // value in milliseconds
//       timeSlice: 1000,
//       // requires timeSlice above
//       // returns blob via callback function
//       ondataavailable: function(blob) {},
//       // auto stop recording if camera stops
//       checkForInactiveTracks: false,
//       // requires timeSlice above
//       onTimeStamp: function(timestamp) {},
//       // both for audio and video tracks
//       bitsPerSecond: 128000,
//       // only for audio track
//       // ignored when codecs=pcm
//       audioBitsPerSecond: 128000,
//       // only for video track
//       videoBitsPerSecond: 128000,
//       // used by CanvasRecorder and WhammyRecorder
//       // it is kind of a "frameRate"
//       // frameInterval: 90,
//       // if you are recording multiple streams into single file
//       // this helps you see what is being recorded
//       previewStream: function(stream) {},
//       // used by CanvasRecorder and WhammyRecorder
//       // you can pass {width:640, height: 480} as well
//       // video: HTMLVideoElement,
//       // used by CanvasRecorder and WhammyRecorder
//       // canvas: {
//       //     width: 640,
//       //     height: 480
//       // },
//       // used by WebAssemblyRecorder
//       // frameRate: 30,
//       // used by WebAssemblyRecorder
//       // bitrate: 128000,
//       // used by MultiStreamRecorder - to access HTMLCanvasElement
//       // elementClass: 'multi-streams-mixer'
// };

// const recorder = RecordRTC(stream, options);
//recorder.startRecording();

// RecordRTC.prototype = {
//     // start the recording
//     startRecording: function() {},
//     // stop the recording
//     // getBlob inside callback function
//     stopRecording: function(blobURL) {},
//     // pause the recording
//     pauseRecording: function() {},
//     // resume the recording
//     resumeRecording: function() {},
//     // auto stop recording after specific duration
//     setRecordingDuration: function() {},
//     // reset recorder states and remove the data
//     reset: function() {},
//     // invoke save as dialog
//     save: function(fileName) {},
//     // returns recorded Blob
//     getBlob: function() {},
//     // returns Blob-URL
//     toURL: function() {},
//     // returns Data-URL
//     getDataURL: function(dataURL) {},
//     // returns internal recorder
//     getInternalRecorder: function() {},
//     // initialize the recorder [deprecated]
//     initRecorder: function() {},
//     // fired if recorder's state changes
//     onStateChanged: function(state) {},
//     // write recorded blob into indexed-db storage
//     writeToDisk: function(audio: Blob, video: Blob, gif: Blob) {},
//     // get recorded blob from indexded-db storage
//     getFromDisk: function(dataURL, type) {},
//     // [deprecated]
//     setAdvertisementArray: function([webp1, webp2]) {},
//     // [deprecated] clear recorded data
//     clearRecordedData: function() {},
//     // clear memory; clear everything
//     destroy: function() {},
//     // get recorder's state
//     getState: function() {},
//     // [readonly] property: recorder's state
//     state: string,
//     // recorded blob [readonly] property
//     blob: Blob,
//     // [readonly] array buffer; useful only for StereoAudioRecorder
//     buffer: ArrayBuffer,
//     // RecordRTC version [readonly]
//     version: string,
//     // [readonly] useful only for StereoAudioRecorder
//     bufferSize: integer,
//     // [readonly] useful only for StereoAudioRecorder
//     sampleRate: integer
// }

// setTimeout(() => {
//   recorder.stopRecording(function() {
//       var blob = this.getBlob();
//       console.log('Recorded Blobs: ', blob);
//       // recorder.getDataURL(function(dataURI) {
//       //   video.src = dataURI;
//       // });
//       invokeSaveAsDialog(blob);
//       // upload to server
//       // var file = new File([blob], 'filename.webm', {
//       //     type: 'video/webm'
//       // });

//       // var formData = new FormData();
//       // formData.append('file', file); // upload "File" object rather than a "Blob"
//       // uploadToServer(formData);
//   });

// }, 3000);

// It configures the 2nd parameter passed over RecordRTC and returns a valid "config" object.
// RecordRTCConfiguration is an inner/private helper for RecordRTC.
// var options = RecordRTCConfiguration(mediaStream, options);

// This method gets a blob from indexed-DB storage.
// recorder.getFromDisk(function(dataURL) {
//   video.src = dataURL;
// });

// Returns internal recording object.
// var internalRecorder = recorder.getInternalRecorder();
// if(internalRecorder instanceof MultiStreamRecorder) {
//     internalRecorder.addStreams([newAudioStream]);
//     internalRecorder.resetVideoStreams([screenStream]);
// }

// This method initializes the recording.
// recorder.initRecorder();

// This method is called whenever recorder's state changes. Use this as an "event".
// recorder.onStateChanged = function(state) {
//     console.log('Recorder state: ', state);
// };

// This method pauses the recording. You can resume recording using "resumeRecording" method.
// recorder.pauseRecording();  // pause the recording
// recorder.resumeRecording(); // resume again

// This method resets the recorder. So that you can reuse single recorder instance many times.
// recorder.reset();
// recorder.startRecording();

// This method resumes the recording.
// recorder.pauseRecording();  // first of all, pause the recording
// recorder.resumeRecording(); // now resume it

// Invoke save-as dialog to save the recorded blob into your disk.
// recorder.stopRecording(function() {
//     this.save('file-name');

//     // or manually:
//     invokeSaveAsDialog(this.getBlob(), 'filename.webm');
// });

// This method appends an array of webp images to the recorded video-blob. It takes an "array" object.
// var arrayOfWebPImages = [];
// arrayOfWebPImages.push({
//     duration: index,
//     image: 'data:image/webp;base64,...'
// });
// recorder.setAdvertisementArray(arrayOfWebPImages);

// Ask RecordRTC to auto-stop the recording after 5 minutes.
// var fiveMinutes = 5 * 1000 * 60;
// recorder.setRecordingDuration(fiveMinutes, function() {
//   var blob = this.getBlob();
//   video.src = this.toURL();
// });

// // or otherwise
// recorder.setRecordingDuration(fiveMinutes).onRecordingStopped(function() {
//   var blob = this.getBlob();
//   video.src = this.toURL();
// });

// This method stops the recording. It is strongly recommended to get "blob" or "URI" inside the callback to make sure all recorders finished their job.
// recorder.stopRecording(function() {
//     // use either "this" or "recorder" object; both are identical
//     video.src = this.toURL();
//     var blob = this.getBlob();
// });

// this looper function will keep you updated about the recorder's states.
// (function looper() {
//     document.querySelector('h1').innerHTML = 'Recorder\'s state is: ' + recorder.state;
//     if(recorder.state === 'stopped') return; // ignore+stop
//     setTimeout(looper, 1000); // update after every 3-seconds
// })();
// recorder.startRecording();

// RecordRTCPromisesHandler adds promises support in RecordRTC.
// Will throw an error if "new" keyword is not used to initiate "RecordRTCPromisesHandler". Also throws error if first argument "MediaStream" is missing.
// var recorder = new RecordRTCPromisesHandler(mediaStream, options);
// recorder.startRecording()
//         .then(successCB)
//         .catch(errorCB);
// // Note: You can access all RecordRTC API using "recorder.recordRTC" e.g. 
// recorder.recordRTC.onStateChanged = function(state) {};
// recorder.recordRTC.setRecordingDuration(5000);