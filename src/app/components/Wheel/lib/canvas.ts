import { WheelSegment } from './segments';

const toRadians = (deg: number) => {
  return deg * (Math.PI / 180);
}

type ImageToRender = {
  imgEl: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number
};

const drawSegment = (
  ctx: CanvasRenderingContext2D,
  start: number,
  end: number,
  contentAngle: number,
  color: string,
  img: ImageToRender,
) => {
  const radius = 500;

  const [cx, cy] = [504, 504];

  ctx.fillStyle = color;
  ctx.lineWidth = 16;
  ctx.textAlign = "center";
  ctx.font = "45px PT_Sans, sans-serif";
  ctx.strokeStyle = '#303135';

  ctx.beginPath();
  ctx.save();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radius, toRadians(start), toRadians(end));
  ctx.lineTo(cx, cy);
  ctx.fill();
  ctx.closePath();
  ctx.clip();
  ctx.rotate(toRadians(contentAngle));
  ctx.drawImage(img.imgEl, img.x, img.y, img.width, img.height);
  ctx.rotate(toRadians((1 - contentAngle)));
  ctx.restore();
  ctx.stroke();

  ctx.fillStyle = '#303135';

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, 75, 0, 2 * Math.PI);
  ctx.fill();

  const centreLogo = new Image();
  centreLogo.src = "/images/branding/logo.svg";
  ctx.drawImage(centreLogo, 455, 455, 98, 98);
}

const loadWheel = (ctx: CanvasRenderingContext2D, segments: WheelSegment[]) => {
  segments.forEach(segment => {
    const {
      geometry,
      color,
      image,
    } = segment;

    const imageGeometry = geometry[image ? "stationImage" : "defaultImage"];

    const {
      to,
      from,
      contentAngle
    } = geometry;

    const imageUrl = image || '/images/components/rr-cover.png';

    const imgEl = new Image();
    imgEl.onload = () => drawSegment(ctx, from, to, contentAngle, color, {imgEl, ...imageGeometry});
    imgEl.src = imageUrl;
  });
}

export { loadWheel };