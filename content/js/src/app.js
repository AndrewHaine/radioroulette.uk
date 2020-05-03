import updateCounts from './frontend/updateCounts';
import importScript from './frontend/importScript';

document.addEventListener('DOMContentLoaded', () => {
  updateCounts();

  window.updateCounts = updateCounts;

  // TODO: Replace this with a socket.io connection
  setInterval(window.updateCounts, 7000);

  const wheelEl = document.getElementById('wheel-app');

  if(wheelEl) {
    importScript('/content/js/dist/wheel.js');
  }
});
