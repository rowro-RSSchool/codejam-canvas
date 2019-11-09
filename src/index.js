import './styles/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');

  ctx.fillRect(0, 0, 512, 512);
});
