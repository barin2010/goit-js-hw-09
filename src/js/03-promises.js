const form = document.querySelector('.form');
const resultDiv = document.querySelector('.results');

form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handlePromise(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      const message = `✅ Fulfilled promise ${position} in ${delay}ms`;
      addResult(message);
    })
    .catch(({ position, delay }) => {
      const message = `❌ Rejected promise ${position} in ${delay}ms`;
      addResult(message);
    })
    .finally(() => {
      const nextPromise = promises.shift();
      if (nextPromise) {
        const { position, delay } = nextPromise;
        handlePromise(position, delay);
      }
    });
}

let promises = [];

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));
  promises = [];

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const promiseDelay = delay + step * i;
    promises.push({ position, delay: promiseDelay });
  }

  if (promises.length > 0) {
    const { position, delay } = promises.shift();
    handlePromise(position, delay);
  }
}

function addResult(message) {
  const div = document.createElement('div');
  div.textContent = message;
  resultDiv.appendChild(div);
}