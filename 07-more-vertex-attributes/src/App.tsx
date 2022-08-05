import { useEffect, useState } from 'react'
import styles from './App.module.css';

import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

function resize(canvas: HTMLCanvasElement) {
  // Lookup the size the browser is displaying the canvas.
  const desiredWidth = canvas.clientWidth;
  const desiredHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width !== desiredWidth ||
    canvas.height !== desiredHeight) {

    // Make the canvas the same size
    canvas.width = desiredWidth;
    canvas.height = desiredHeight;
  }
}

function App() {
  const [log, setLog] = useState<string | null>();

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    //resize(canvas); // avoid picelated edges

    const gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    //gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); // avoid picelated edges

    function compile(shader: WebGLShader, source: string) {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        setLog(gl.getShaderInfoLog(shader));
      }
    }

    const vs = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;
    const fs = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;
    const program = gl.createProgram() as WebGLProgram;

    compile(vs, vertex);
    compile(fs, fragment);

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      alert(gl.getProgramInfoLog(program));
    }

    const h = Math.sqrt(0.75);

    const vertices =
      [
        // x    y           r     g     b
        -0.5,   -h / 3,     0,    0.5,  1,

        // x    y           r     g     b
        0.0,    2 * h / 3,  1,    0,    0.5,

        // x    y           r     g     b
        0.5,    -h / 3,     0.5,  1,    0
      ];

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Our position input value is a vertex attribute. We need to get its location, enable it, and bind a data to it.
    // So, vertexAttribPointer is a function that tells the GPU how the data is presented in a GPU buffer.
    const position = gl.getAttribLocation(program, "position");
    const color = gl.getAttribLocation(program, "color");
    gl.enableVertexAttribArray(position);
    gl.enableVertexAttribArray(color);

    const stride = 5 * Float32Array.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, stride, 0);
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, stride, 2 * Float32Array.BYTES_PER_ELEMENT);

    function draw() {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      // Finally, we used our GLSL program. After that we told GPU that we're going to work with buffer GPU buffer. And right after that we called drawArrays which has drawn our first triangle
      // drawArrays takes three parameters. The first one sets a type of the geometry topology. In the example above it's gl.TRIANGLES which means that every three vertices represent a triangle. The second parameter is a vertex offset in the GPU buffer. And the third parameter is a count of vertices that should be rendered. One triangle consists of three vertices — that's why the third parameter is 3.
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }, []);

  return (
    <div>
      <canvas id="canvas" width={800} height={600} className={styles.canvas}></canvas>
      {log && <div>{log}</div>}
    </div>
  )
}

export default App
