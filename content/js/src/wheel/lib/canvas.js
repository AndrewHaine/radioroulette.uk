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

  ctx.lineWidth = 16;
  ctx.strokeStyle = '#151515';

  segments.forEach(segment => {
    const {
      geometry,
      color,
      image
    } = segment;

    const imageGeometry = geometry[image ? "stationImage" : "defaultImage"];

    const {
      to,
      from,
      contentAngle
    } = geometry;

    const imageUrl = image || '/images/components/rr-cover.png';

    const imgEl = new Image();
    imgEl.onload = () => {
      drawSegment(ctx, from, to, contentAngle, color, {imgEl, ...imageGeometry});
    }
    imgEl.src = imageUrl;

  });
}

const drawSegment = (ctx, start, end, contentAngle, color, img) => {

  const radius = 500;

  const [cx, cy] = [504, 504];

  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.save();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, _toRadians(start), _toRadians(end));
  ctx.lineTo(cx, cy);
  ctx.fill();
  ctx.closePath();
  ctx.clip();
  ctx.rotate(_toRadians(contentAngle));
  ctx.drawImage(img.imgEl, img.x, img.y, img.width, img.height);
  ctx.rotate(_toRadians((1 - contentAngle)));
  ctx.stroke();
  ctx.restore();
}

export { loadWheel };
export default initWheelCanvas;
