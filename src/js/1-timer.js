import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonEl: document.querySelector('button'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
refs.buttonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];

    if (selected < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.buttonEl.disabled = true;
      return;
    }

    userSelectedDate = selected;
    refs.buttonEl.disabled = false;
  },
};

flatpickr(refs.inputEl, options);

const timer = {
  intervalId: null,

  start() {
    refs.buttonEl.disabled = true;
    refs.inputEl.disabled = true;
    this.intervalId = setInterval(() => {
      const diff = userSelectedDate - Date.now();

      if (diff < 0) {
        this.stop();
        return;
      }

      const timeComponents = this.convertMs(diff);

      refs.days.textContent = this.pad(timeComponents.days);
      refs.hours.textContent = this.pad(timeComponents.hours);
      refs.minutes.textContent = this.pad(timeComponents.minutes);
      refs.seconds.textContent = this.pad(timeComponents.seconds);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    refs.inputEl.disabled = false;
  },

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  },

  pad(value) {
    return String(value).padStart(2, '0');
  },
};

const clickStartBtn = event => {
  timer.start();
};

refs.buttonEl.addEventListener('click', clickStartBtn);
