const points_n = 12;
var m_x=0, m_y=0;
var x=100, y=100, vx=0, vy=0, dt=0.1, k=10, mu=1;
var Xs = new Array(points_n), Ys = new Array(points_n);
var vXs = new Array(points_n), vYs = new Array(points_n);
var ks = new Array(points_n);

function main() {
  init();

  window.requestAnimationFrame(update);
}

function init()
{
  for(let i=0; i<points_n; i++)
  {
    Xs[i] = i*100;
    Ys[i] = i*100;
    vXs[i] = 0;
    vYs[i] = 0;
    ks[i] = i;
  }
}

function update()
{
  vx += (k*(m_x-x) - vx*mu)*dt
  vy += (k*(m_y-y) - vy*mu)*dt

  x += vx*dt;
  y += vy*dt;

  for (let i=0; i<points_n; i++)
  {
    vXs[i] += (ks[i]*(m_x-Xs[i]) - vXs[i]*mu)*dt
    vYs[i] += (ks[i]*(m_y-Ys[i]) - vYs[i]*mu)*dt

    Xs[i] += vXs[i]*dt;
    Ys[i] += vYs[i]*dt;
  }

  draw();
}

function draw()
{
  const ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height); // clear canvas


  let radius = 5;
  // ctx.fillStyle = "rgb(0, 200, 0)";
  // ctx.beginPath();
  // ctx.arc(x - rect.left, y - rect.top, radius, 0, 2 * Math.PI, false);
  // ctx.fill();

  for (let i=0; i<points_n; i++)
  {
    ctx.fillStyle = "rgb(" + String(i*18) +", 200, 0)";

    ctx.beginPath();
    ctx.arc(Xs[i] - rect.left, Ys[i] - rect.top, radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }


  window.requestAnimationFrame(update);
}

function coordinate(event) 
{
  // clientX gives horizontal coordinate
  m_x = event.clientX;
  // clientY gives vertical coordinates
  m_y = event.clientY;
}

  
window.onload = main;