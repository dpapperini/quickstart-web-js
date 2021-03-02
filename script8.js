// const RecordRTC = required('recordrtc');
// const options = {};
// const recorder = new RecordRTC(MediaStream, options);

// const canvasRecorder = new RecordRTC.canvasRecorder(canvasElement, options);

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
      var blob = this.getBlob();
      console.log('Recorded Blobs: ', blob);
      recorder.getDataURL(function(dataURI) {
        video.src = dataURI;
        video.controls = true;
        playButton.disabled = false;
        downloadButton.disabled = false;
        recordButton.textContent = 'Start Recording';
        video.play();
      });
    });

    // video.srcObject = null;
    // let blob = await mediaRecorder.getBlob();
    // video.src = URL.createObjectURL(blob);
    // mediaRecorder.stream.getTracks(t => t.stop());

    // // reset recorder's state
    // await mediaRecorder.reset();

    // // clear the memory
    // await mediaRecorder.destroy();

    // // so that we can record again
    // mediaRecorder = null;
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

function startRecordingCallback() {
    // let stream = streamDeppAR; // await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    // video.srcObject = recorder.stream;
    recorder = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
        recorderType: MediaStreamRecorder,
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
