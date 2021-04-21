// eslint-disable-next-line strict
'use strict';
const date = '21 july 2021';
const timerHours = document.querySelector('#timer-hours'),
  timerMinutes = document.querySelector('#timer-minutes'),
  timerSeconds = document.querySelector('#timer-seconds');
const addZero = n => (n < 10 ? "0" + n : n);
//Timer
function countTimer(deadline) {
  const timer = getTimeRemaining();

  function getTimeRemaining() {
    const deteStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (deteStop - dateNow) / 1000,
      seconds = Math.floor(timeRemaining % 60),
      minutes = Math.floor((timeRemaining / 60) % 60),
      hours = Math.floor(timeRemaining / 60 / 60) % 24;
    return { timeRemaining, hours, minutes, seconds };
  }
  function updateClock() {
    if (timer.timeRemaining > 0) {
      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);
    } else {
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
    }
    return timer;
  }

  updateClock();
  return timer;
}


const timerNumber = countTimer(date);

if (timerNumber.timeRemaining >= 0) {
  setInterval(countTimer, 1000, date);
} else {
  clearInterval(2);
}



