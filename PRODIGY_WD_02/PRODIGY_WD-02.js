let time = 0;  // Time in seconds
let running = false;  // Is stopwatch running?
let interval;
let lapNumber = 1; // Keep track of lap number

const timeDisplay = document.getElementById('time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function updateDisplay() {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);
    timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function startStopwatch() {
    running = true;
    startStopButton.textContent = 'Stop';
    interval = setInterval(() => {
        time++;
        updateDisplay();
    }, 1000);
}

function stopStopwatch() {
    running = false;
    startStopButton.textContent = 'Start';
    clearInterval(interval);
}

function resetStopwatch() {
    time = 0;
    updateDisplay();
    lapsList.innerHTML = '';
    lapNumber = 1;
}

function recordLap() {
    const lapTime = time;
    const lapDisplay = document.createElement('li');
    let seconds = lapTime % 60;
    let minutes = Math.floor(lapTime / 60) % 60;
    let hours = Math.floor(lapTime / 3600);
    lapDisplay.textContent = `Lap ${lapNumber++}: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    lapsList.appendChild(lapDisplay);
}

startStopButton.addEventListener('click', () => {
    if (running) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
