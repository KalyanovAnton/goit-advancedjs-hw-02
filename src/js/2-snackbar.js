import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEl: document.querySelector('.form'),
};


refs.formEl.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(refs.formEl.elements.delay.value);
  const state = refs.formEl.elements.state.value;

  const promis = new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        rejected(delay);
      }
    }, delay);
  });

  promis
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });

  refs.formEl.reset();
});
