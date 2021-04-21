// eslint-disable-next-line strict
"use strict";
// возвращаем числа в переди с 0
const addZero = n => (n < 10 ? "0" + n : n);
const newDay1 = document.getElementById('new_day1');

const weekday = ["Воскресенье", "Понедельник", "Вторник", "Среда",
  "Четверг", "Пятница", "Суббота"];

function showA() {
  const day = new Date();
  function timeDay(hours) {
    let value = '';
    if (hours <= 11) {
      value = 'Доброе утро!';
    } else if (hours <= 17) {
      value = 'Добрый день!';
    } else if (hours <= 21) {
      value = 'Добрый вечер!';
    } else if (hours <= 24) {
      value = 'Доброй ночи!';
    }
    return value;
  }

  function newYear(deadline) {
    const deteStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (deteStop - dateNow) / 1000,
      leftDay = Math.floor(timeRemaining / 60 / 60 / 24);
    return { timeRemaining, leftDay };
  }
  const timer = newYear('31 December 2021');

  newDay1.innerHTML = `<p>${timeDay(day.getHours())}</p>
    <p>Сегодня:  ${weekday[day.getDay()]}</p>
    <p>Текущее время: ${addZero(day.getHours())}:${addZero(day.getMinutes())}:${addZero(day.getSeconds())}</p>
    <p>Осталось дней до нового года  ${timer.leftDay}</p> `;
}

setInterval(showA, 1000);
