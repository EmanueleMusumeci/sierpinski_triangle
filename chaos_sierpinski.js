const N_ITERATIONS = 3000;
current_iteration = 0;

current_point = null;
current_vertex = null;

triangle_vertices = [];

function init() {
  window.requestAnimationFrame(draw);
  
  //Initialize the triangle vertices
  triangle_vertices = getEquilateralTriangleVertices(document.getElementById("sierpinski_canvas"));
  //Draw triangle
  drawTriangle(document.getElementById("sierpinski_canvas").getContext("2d"), triangle_vertices);
}

function draw() {
  const canvas = document.getElementById("sierpinski_canvas");

  const ctx = document.getElementById("sierpinski_canvas").getContext("2d");


  if(current_iteration == N_ITERATIONS || current_iteration == 0)
  {
    current_iteration = 0;
    current_point = initial_sample();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Redraw triangle
    drawTriangle(document.getElementById("sierpinski_canvas").getContext("2d"), triangle_vertices);
  }

  current_vertex = triangle_vertices[Math.floor(Math.random() * triangle_vertices.length)];
  new_point = [current_point[0] + (current_vertex[0] - current_point[0])/2 , current_point[1] + (current_vertex[1] - current_point[1])/2]
  drawPixel(ctx, new_point[0], new_point[1], "red", 3);

  current_point = new_point;
  current_iteration++;
  
  window.requestAnimationFrame(draw);
}


function initial_sample()
{
  return [150, 150];
}

function getEquilateralTriangleVertices(canvas)
{
  vertex1 = [
    canvas.width/8,
    canvas.height/8*7
  ];

  vertex2 = [
    canvas.width/2,
    canvas.height/8
  ];
  
  vertex3 = [
    canvas.width/8*7,
    canvas.height/8*7
  ];

  return [vertex1, vertex2, vertex3]
}

function drawTriangle(ctx, vertices)
{
  //Draw the edges
  drawLine(ctx, vertices[0], vertices[1], "red", 2);
  drawLine(ctx, vertices[1], vertices[2], "red", 2);
  drawLine(ctx, vertices[2], vertices[0], "red", 2);

  //Draw the vertices
  drawPixel(ctx, vertices[0][0], vertices[0][1], "blue", 2);
  drawPixel(ctx, vertices[1][0], vertices[1][1], "blue", 2);
  drawPixel(ctx, vertices[2][0], vertices[2][1], "blue", 2);

}

function drawLine(ctx, beginPoint, endPoint, color, width)
{
  // set line stroke and line width
  ctx.strokeStyle = color;
  ctx.lineWidth = width;

  // draw a red line
  ctx.beginPath();
  ctx.moveTo(beginPoint[0], beginPoint[1]);
  ctx.lineTo(endPoint[0], endPoint[1]);
  ctx.stroke();

  //Reset canvas properties
  resetCanvasProperties(ctx);
}


function drawPixel(ctx, x, y, color, size)
{
  ctx.fillStyle = color;

  //Draw a rectangle to draw a canvas pixel for performance reasons: https://stackoverflow.com/questions/7812514/drawing-a-dot-on-html5-canvas
  //This resets the line drawing: https://stackoverflow.com/questions/11895807/why-cant-i-draw-two-lines-of-varying-colors-in-my-html5-canvas
  ctx.beginPath(); 
  ctx.fillRect(x-size/2, y-size/2, size, size);
  ctx.stroke();

  //Reset canvas properties
  resetCanvasProperties(ctx);
}

function resetCanvasProperties(ctx)
{
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';
}

init();
