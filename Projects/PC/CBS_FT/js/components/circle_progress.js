//圆环形进度展示
var getDevicePixelRatio = function () {
  return window.devicePixelRatio || 1;
};

function progress(elem, strokeColor) {
  var bg = elem.querySelector('.y-progressBar');
  var ctx = bg.getContext('2d');
  var imd = null;
  var circ = Math.PI * 2;
  var quart = Math.PI / 2;
  var curr = parseFloat(elem.getAttribute('data-progress'));

  var pixelTatio = getDevicePixelRatio(),
      width = 90,
      height = 90;
  bg.style.width = width + "px";
  bg.style.height = height + "px";
  bg.width = width * pixelTatio;
  bg.height = height * pixelTatio;

  ctx.beginPath();
  ctx.strokeStyle = strokeColor || '#ed5a38';
  ctx.lineCap = 'round';
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 4.0 * pixelTatio;

  imd = ctx.getImageData(0, 0, 90 * pixelTatio, 90 * pixelTatio);
  function draw(current) {
    ctx.putImageData(imd, 0, 0);
    ctx.beginPath();
    ctx.arc(45 * pixelTatio, 45 * pixelTatio, 42 * pixelTatio, -(quart), ((circ) * current) - quart, false);
    ctx.stroke();
  }

  var t = 0;
  var timer = null;

  function loadCanvas(now) {
    timer = setInterval(function () {
      if (t > now) {
        clearInterval(timer);
      } else {
        draw(t);
        t += 0.01;
      }
    }, 20);
  }

  loadCanvas(curr);
  timer = null;
}