import segments from './segments';

const _toRadians = deg => {
  return deg * (Math.PI / 180);
}

const initWheelCanvas = () => {

  canvas.width="1008";
  canvas.height="1008";

  const ctx = canvas.getContext('2d');

  loadWheel(ctx, segments, true);

}

const loadWheel = (ctx, segments) => {

  segments.forEach(segment => {
    const {
      geometry,
      color,
      image,
      name
    } = segment;

    const imageGeometry = geometry[image ? "stationImage" : "defaultImage"];

    const {
      to,
      from,
      contentAngle
    } = geometry;

    if(image !== 'text') {
      const imageUrl = image || '/content/images/components/rr-cover.png';

      const imgEl = new Image();
      imgEl.onload = () => {
        drawSegment(ctx, from, to, contentAngle, color, {imgEl, ...imageGeometry});
      }
      imgEl.src = imageUrl;
    } else {
      drawSegment(ctx, from, to, contentAngle, color, {imgEl: null, ...imageGeometry}, name);
    }
  });
}

const drawSegment = (ctx, start, end, contentAngle, color, img, text) => {

  const radius = 500;

  const [cx, cy] = [504, 504];

  ctx.fillStyle = color;
  ctx.lineWidth = 16;
  ctx.textAlign = "center";
  ctx.font = "45px Saira Condensed,sans-serif";
  ctx.strokeStyle = '#303135';

  ctx.beginPath();
  ctx.save();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, _toRadians(start), _toRadians(end));
  ctx.lineTo(cx, cy);
  ctx.fill();
  ctx.closePath();
  ctx.clip();
  ctx.rotate(_toRadians(contentAngle));
  if(img.imgEl) {
    ctx.drawImage(img.imgEl, img.x, img.y, img.width, img.height);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.fillText(text, (img.x + 80), (img.y + 30), (img.width + 60));
  }
  ctx.rotate(_toRadians((1 - contentAngle)));
  ctx.restore();
  ctx.stroke();
}

export { loadWheel };
export default initWheelCanvas;
