import { useEffect, useState } from 'react'
import styles from './App.module.css';

import fragment from './fragment.glsl';

function App() {
  const [log, setLog] = useState<string | null>();
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

    const fs = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    gl.shaderSource(fs, fragment);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      setLog(gl.getShaderInfoLog(fs));
    } else {
      setLog("Fragment shader has been successfully compiled!");
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
