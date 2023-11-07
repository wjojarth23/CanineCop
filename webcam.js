document.getElementById('start').addEventListener('click', function() {
    var video = document.getElementById('webcam')
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.addEventListener('canplay', function() {
                // Send frames to backend every 100ms
                setInterval(function() {
                    sendFrameToBackend(video);
                }, 100);
            });
        });
});


function sendFrameToBackend(video) {
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    var data = canvas.toDataURL('image/jpeg');
    fetch('/frame', {
        method: 'POST',
        body: JSON.stringify({ image: data }),
        headers: { 'Content-Type': 'application/json' }
    });
}
