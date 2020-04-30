import "./wheel/index.jsx";
import updateCounts from './frontend/updateCounts';

document.addEventListener('DOMContentLoaded', () => {
  updateCounts();

  window.updateCounts = updateCounts;

  // TODO: Replace this with a socket.io connection
  setInterval(window.updateCounts, 7000);
});
