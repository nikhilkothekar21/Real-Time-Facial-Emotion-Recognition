let video = document.getElementById('video');
let emotionOutput = document.getElementById('emotion');
let isModelLoaded = false;

// Load the BlazeFace model for face detection
async function loadModel() {
    return await blazeface.load();
}

// Start the video stream
async function startVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    video.srcObject = stream;
}

// Mock function to classify emotions (for demonstration)
function classifyEmotion(face) {
    const emotions = ["Happy", "Sad", "Angry", "Surprised", "Neutral"];
    return emotions[Math.floor(Math.random() * emotions.length)];
}

// Detect face and classify emotion in real-time
async function detectEmotion(model) {
    const predictions = await model.estimateFaces(video, false);

    if (predictions.length > 0) {
        const emotion = classifyEmotion(predictions[0]);
        emotionOutput.innerText = `Emotion: ${emotion}`;
    } else {
        emotionOutput.innerText = "Emotion: None";
    }
}

// Main function to load model, start video, and run detection
async function main() {
    await startVideo();
    const model = await loadModel();
    isModelLoaded = true;
    setInterval(() => detectEmotion(model), 1000);
}

// Start detection on button click
document.getElementById('startButton').addEventListener('click', () => {
    if (!isModelLoaded) {
        main();
    }
});
