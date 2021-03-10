const faceFilter = document.getElementById('3d-face-filter');
const modelViewer = document.getElementById('3d-model-viewer');
faceFilter.addEventListener('click', event => {
    location.href = './model-face.html';
});
modelViewer.addEventListener('click', event => {
    location.href = './model-viewer.html';
});