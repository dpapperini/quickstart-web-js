// add video recording
let mediaRecorder;
let recordedBlobs;
const canvas = document.querySelector('canvas#deepar-canvas');
const video = document.querySelector('video#recording');

const recordButton = document.querySelector('button#record');
const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecording;
playButton.onclick = play;
downloadButton.onclick = download;
playButton.disabled = true;
downloadButton.disabled = true;

function toggleRecording() {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();          
  }
}

function stopRecording() {
    mediaRecorder.stopRecording(function() {
        recordedBlobs = mediaRecorder.getBlob();
        video.src = URL.createObjectURL(recordedBlobs);
        // video.controls = true;
        //video.play();
    });

    // change text recordButton and enable playButton and downloadButton
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
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

function startRecording() {
    mediaRecorder = new RecordRTC(canvas.captureStream(), { type: 'video' });
    // mediaRecorder = new RecordRTC(canvas, { type: 'canvas' });
    mediaRecorder.startRecording();
    // change text recordButton and disabled playButton and downloadButton
    recordButton.textContent = 'Stop Recording';
    playButton.disabled = true;
    downloadButton.disabled = true;
}