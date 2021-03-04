// add video recording
const canvas = document.querySelector('canvas#deepar-canvas');
const video = document.querySelector('video#recording');
const stream = canvas.captureStream();
let recorder; // globally accessible
let recordedBlobs = [];

const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecordingCallback;
playButton.onclick = play;
downloadButton.onclick = download;
playButton.disabled = true;
downloadButton.disabled = true;

function toggleRecordingCallback() {
  if (recordButton.textContent === 'Start Recording') {
    startRecordingCallback();
  } else {
    stopRecordingCallback();          
  }
}

function stopRecordingCallback() {
    recorder.stopRecording(function() {
      var blob = recorder.getBlob();
      console.log('Recorded Blobs: ', blob);
      //recorder.getDataURL(function(dataURI) {
        video.src = URL.createObjectURL(blob);
        video.controls = true;
        playButton.disabled = false;
        downloadButton.disabled = false;
        recordButton.textContent = 'Start Recording';
        video.play();
      //});
    });

    // video.srcObject = null;
    // let blob = await recorder.getBlob();
    // video.src = URL.createObjectURL(blob);
    // recorder.stream.getTracks(t => t.stop());

    // // reset recorder's state
    // await recorder.reset();

    // // clear the memory
    // await recorder.destroy();

    // // so that we can record again
    // recorder = null;
}

function play() {
  video.play();
}

function startRecordingCallback() {
    // let stream = streamDeppAR; // await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    // video.srcObject = stream;
    recorder = new RecordRTC(stream, {
        type: 'video',
        // mimeType: 'video/webm',
        // recorderType: MediaStreamRecorder,
        disableLogs: false,
        ondataavailable: function(blob) {
          recordedBlobs.push(blob);
        }
    });
    recorder.startRecording();

    playButton.disabled = true;
    downloadButton.disabled = true;
    recordButton.textContent = 'Stop Recording';
    
    // helps releasing camera on stopRecording
   recorder.stream = stream;

    // if you want to access internal recorder
    const internalRecorder = recorder.getInternalRecorder();
    console.log('internal-recorder', internalRecorder.name);

    // if you want to read recorder's state
    console.log('recorder state: ', recorder.getState());
}
