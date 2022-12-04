const points_n = 12;
var m_x=0, m_y=0;

//Grid
const k=10, q=-5000, mu=1, dt=0.1;
const gridUnit = 5;
var height = 20, length = 20;
var positions = new Array(length);
var anchors = new Array(length);
var velocities = new Array(length);

function main() {
  init();

  window.requestAnimationFrame(update);
}

function init()
{
  // Set canvas width to window width
  canvas.width  = window.innerWidth;
  var rect = canvas.getBoundingClientRect();

  //Initialize grid
  const offset = {x:0, y:500};
  height = 5;
  length = Math.round(rect.width/gridUnit);
  
  for (let i=0; i<length; i++)
  {
    positions[i] = new Array(height);
    anchors[i] = new Array(height);
    velocities[i] = new Array(height);

    for (let j=0; j<height; j++)
    {
      positions[i][j] = {x : i*gridUnit + offset.x, y : j*gridUnit + offset.y};
      anchors[i][j] = {x : i*gridUnit + offset.x, y : j*gridUnit + offset.y};
      velocities[i][j] = {x : 0, y : 0};
    }  
  }
}

function updatePoint(i,j)
{

  //Update grid
  // All maths
  let x = m_x-positions[i][j].x;
  let y = m_y-positions[i][j].y;
  let ax = q*x/(x*x+y*y);
  let ay = q*y/(x*x+y*y);

  x = anchors[i][j].x-positions[i][j].x;
  y = anchors[i][j].y-positions[i][j].y;

  ax += k*x - mu*velocities[i][j].x;
  ay += k*y - mu*velocities[i][j].y;

  velocities[i][j].x += ax*dt;
  velocities[i][j].y += ay*dt;

  positions[i][j].x += velocities[i][j].x*dt;
  positions[i][j].y += velocities[i][j].y*dt;

}

function update()
{
  //Update each point
  for (let i=0; i<length; i++)
  {

    for (let j=0; j<height; j++)
    {
      updatePoint(i,j);
    }  
  }  
  draw();
}

function draw()
{
  const ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height); // clear canvas


  let radius = 2;
  // ctx.beginPath();
  // ctx.arc(x - rect.left, y - rect.top, radius, 0, 2 * Math.PI, false);
  // ctx.fill();
  
  // Draw
  for (let i=0; i<length; i++)
  {
    for (let j=0; j<height; j++)
    {
      let dist = (positions[i][j].x - anchors[i][j].x)*(positions[i][j].x - anchors[i][j].x) + (positions[i][j].y - anchors[i][j].y)*(positions[i][j].y - anchors[i][j].y)
      ctx.fillStyle = "rgba(0, 200, " + String(dist/2) + ", " + String(dist/200) + ")";
      ctx.beginPath();
      ctx.arc(positions[i][j].x - rect.left, positions[i][j].y - rect.top, radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }  
  }

  window.requestAnimationFrame(update); // Next frame
}

function coordinate(event) 
{
  // clientX gives horizontal coordinate
  m_x = event.clientX;
  // clientY gives vertical coordinates
  m_y = event.clientY;
}

  
window.onload = main;