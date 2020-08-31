import React, { useEffect, useRef, useCallback, useState } from "react";
import "./styles.css";

// Make a small canvas or other element that can display the position of two mouse clicks.
//      Also draw a dot or circle at the position where the mouse click occurs.
// Then add a text output (don't need to draw in canvas) to display the distance between the two points.
// Clicking a third point should reset the two points, and be the first point again.
//  Keep the dot/circle visible until the component resets on the third click.
// Distance Formula:
// d = sqrt{(x_2 - x_1)^2 + (y_2-y_1)^2}
//        d	= 	distance
//        (x_1, y_1)	= 	coordinates of the first point
//         (x_2, y_2)	= 	coordinates of the second point

export default function App() {
  const canvasRef = useRef(null);
  const saved = useRef([]);
  const [distance, setDistance] = useState();
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 200,
    height: 300
  });

  useEffect(() => {
    console.log("useEffect");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    if (saved.current.length > 1)
      draw(saved.current[saved.current.length - 1], ctx);

    setDistance(null);
  }, [canvasDimensions]);

  const canvasCallback = useCallback((e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    console.log("canvas ", canvas.offsetLeft, canvas.offsetTop);
    const clickPoint = {
      x: e.clientX - canvas.offsetLeft,
      y: e.clientY - canvas.offsetTop
    };
    if (saved.current.length > 1) {
      setCanvasDimensions({ width: 200, height: 300 });
    }
    saved.current.push(clickPoint);
    if (saved.current.length === 2) {
      setDistance(calculateDistance(saved.current));
    }
    ctx.fillStyle = "red";
    ctx.fillRect(clickPoint.x, clickPoint.y, 2, 2);
  }, []);

  function calculateDistance(arr) {
    let a = arr[0].x - arr[1].x;
    let b = arr[0].y - arr[1].y;
    return Math.floor(Math.sqrt(a * a + b * b));
  }

  function draw(coord, ctx) {
    ctx.fillStyle = "red";

    ctx.fillRect(coord.x, coord.y, 2, 2);
    saved.current = [{ x: coord.x, y: coord.y }];
  }

  return (
    <div className="App">
      <p>Hello there</p>
      <canvas
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        ref={canvasRef}
        onClick={canvasCallback}
      />
      <p>{distance}</p>
    </div>
  );
}
