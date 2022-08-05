import { useState, useEffect } from 'react'
import styles from './App.module.css';

interface WebGlContext {
  version: string;
  shadingLanguageVersion: string;
  vendor: string;
}

function App() {
  const [context, setContext] = useState<WebGlContext>();

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;

    setContext({
      version: gl.getParameter(gl.VERSION),
      shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      vendor: gl.getParameter(gl.VENDOR),
    });
  }, []);

  return (
    <div>
      <canvas id="canvas" className={styles.canvas}></canvas>
      {context &&
        <div>
          <div>Version: <strong>{context.version}</strong></div>
          <div>Shading Language Version: <strong>{context.shadingLanguageVersion}</strong></div>
          <div>Vendor: <strong>{context.vendor}</strong></div>
        </div>}
    </div>
  )
}

export default App
