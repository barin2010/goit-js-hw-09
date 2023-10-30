import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate) {
      const now = new Date();

      if (selectedDate <= now) {
        Notiflix.Notify.failure('Please choose a date and time in the future.');
        document.querySelector('[data-start]').disabled = true;
      } else {
        document.querySelector('[data-start]').disabled = false;
      }
    }
  },
};

const datetimePicker = document.querySelector('#datetime-picker');
flatpickr(datetimePicker, options);

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  startButton: document.querySelector('[data-start]'),
};

let countdownInterval;
refs.startButton.disabled = true;

refs.startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker._flatpickr.selectedDates[0];

  if (selectedDate) {
    const now = new Date();

    if (selectedDate <= now) {
      Notiflix.Notify.failure('Please choose a date and time in the future.');
    } else {
      startCountdown(selectedDate);
      refs.startButton.disabled = true;
    }
  } else {
    Notiflix.Notify.failure('Please choose a valid date and time.');
  }
});

function startCountdown(endTime) {
  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = endTime - currentTime;
    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerValues(0);
      Notiflix.Notify.success('Timer has ended!');
      return;
    }
    const timeObject = convertMs(timeDifference);
    updateTimerValues(timeObject);
    if (timeObject.days === "00" && timeObject.hours === "00" && timeObject.minutes === "00" && timeObject.seconds === "00") {
      clearInterval(countdownInterval);
      Notiflix.Notify.success('Timer has ended!');
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = String(Math.floor(ms / day)).padStart(2, '0');
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  const minutes = String(Math.floor((ms % hour) / minute)).padStart(2, '0');
  const seconds = String(Math.floor((ms % minute) / second)).padStart(2, '0');

  return { days, hours, minutes, seconds };
}

function updateTimerValues({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}