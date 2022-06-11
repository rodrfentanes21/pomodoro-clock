const TIME_LIMIT = 1500;
const REST_LIMIT = 300;

let timeLeft = TIME_LIMIT;
let timerInterval = null;
let studyFlag = false;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${formatTime(timeLeft)}
  </span>
</div>
`

let isPaused = true;
let audio = new Audio('cris1.mp4');
let audio2 = new Audio('cris2.mp4');

function playPause() {
    if (isPaused) {
        isPaused = false;
        startTimer();
    } else {
        isPaused = true;
        clearInterval(timerInterval);
    }
}

function reset() {
    (studyFlag) ? timeLeft = REST_LIMIT : timeLeft = TIME_LIMIT;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    isPaused = true;
    clearInterval(timerInterval);
}

function formatTime(time) {
    // The largest round integer less than or equal to the result of time divided being by 60.
    const minutes = Math.floor(time / 60);

    // Seconds are the remainder of the time divided by 60
    let seconds = time % 60;

    // If the value of seconds is less than 10, then display seconds with a leading zero
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    // The output in MM:SS format
    return `${minutes}:${seconds}`;
}

function startTimer() {
    timerInterval = setInterval(() => {

        if (!isPaused) {
            timeLeft = timeLeft - 1;
            if (timeLeft <= 0 && studyFlag == false) {
                timeLeft = REST_LIMIT;
                studyFlag = true;
                audio.play();
            } else if (timeLeft <= 0 && studyFlag == true) {
                timeLeft = TIME_LIMIT;
                studyFlag = false;
                audio2.play();
            }
        }
        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    }, 1000);
}