import { useEffect } from 'react'
import styles from './App.module.css';

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    if (canvas) {
      const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

      function draw() {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
    }
  }, []);

  return (
    <div>
      <canvas id="canvas" className={styles.canvas}></canvas>
    </div>
  )
}

export default App
