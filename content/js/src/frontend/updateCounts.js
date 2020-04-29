import axios from 'axios';
import { CountUp } from 'countup.js';

const updateCounts = () => {
  const counts = [...document.querySelectorAll('.counter__counter')];

  axios.get('/api/v1/spinCount')
    .then(({ data }) => {
      counts.forEach(count => {
        const display = count.querySelector('.counter__display');
        const value = data[count.getAttribute('data-counter')];

        const countUp = new CountUp(display, value, {
          startVal: display.getAttribute('data-current-val')
        });

        if(!countUp.error) {
          countUp.start();
        } else {
          display.innerText = value;
        }

        display.setAttribute('data-current-val', value);

      });
    });
};

export default updateCounts
