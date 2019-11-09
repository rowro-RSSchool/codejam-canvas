import './styles/main.scss';

import fourMatrix from './assets/4x4';
import thirtyTwoMatrix from './assets/32x32';
import matrixImage from './assets/images/image.png';

const canvasSize = 512;

// Draw matrix from JSON
function drawMatrix(ctx, size, data) {
  const pxSize = canvasSize / size;

  for (let i = 0; i < data.length; i += 1) {
    for (let j = 0; j < data[i].length; j += 1) {
      // Check color format
      if (Array.isArray(data[i][j])) {
        ctx.fillStyle = `rgba(${data[i][j].join(',')})`;
      } else {
        ctx.fillStyle = `#${data[i][j]}`;
      }

      ctx.fillRect(pxSize * j, pxSize * i, pxSize, pxSize);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const buttons = [...document.querySelectorAll('.layers .toolbar__item')];
  const btnActiveClass = 'toolbar__item--active';

  const image = new Image(matrixImage);
  image.src = matrixImage;

  // Set canvas size
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  // Draw initial matrix
  document.querySelector('[data-matrix="four"]').classList.add(btnActiveClass);
  drawMatrix(ctx, 4, fourMatrix);

  // Add event listeners to buttons
  buttons.forEach((btn) => {
    const matrixType = btn.dataset.matrix;

    if (matrixType) {
      btn.addEventListener('click', () => {
        // Remove active class from buttons
        buttons.forEach((item) => {
          item.classList.remove(btnActiveClass);
        });

        // Add active class to button
        btn.classList.add(btnActiveClass);

        // Clear canvas
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // 4x4 matrix
        if (matrixType === 'four') {
          drawMatrix(ctx, 4, fourMatrix);
        }

        // 32x32 matrix
        if (matrixType === 'thirtyTwo') {
          drawMatrix(ctx, 32, thirtyTwoMatrix);
        }

        // Draw image on canvas
        if (matrixType === 'image') {
          ctx.drawImage(image, 0, 0, canvasSize, canvasSize);
        }
      });
    }
  });
});
