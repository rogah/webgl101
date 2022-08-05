import { useEffect, useState } from 'react'
import styles from './App.module.css';

import vertex from './vertex.glsl';

function App() {
  const [ log, setLog ] = useState<string | null>();
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

    const vs = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    gl.shaderSource(vs, vertex);
    gl.compileShader(vs);

    if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      setLog(gl.getShaderInfoLog(vs));
    } else {
      setLog("Vertex shader has been successfully compiled!");
    }
  }, []);

  return (
    <div>
      <canvas id="canvas" className={styles.canvas}></canvas>
      {log && <div>{log}</div>}
    </div>
  )
}

export default App
