export const wrapText = (context, text, x, y, maxWidth, lineHeight, startFromBaseline = false) => {
  var words = text.split(' ');
  var line = '';
  let lines = [];

  for (var n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let testWidth = context.measureText(testLine).width;
    if (testWidth > maxWidth && n > 0) {
      lines.push(line);
      line = '';
      n--;
    } else if(n === (words.length - 1)) {
      lines.push(testLine);
    } else {
      line = line + words[n] + ' ';
    }
  }
  lines.forEach(line => {
    context.fillText(line, x, y);
    y += lineHeight;
  });
};
