#version 300 es
precision highp float;

// A vertex shader ouput parameter is an input parameter of a fragment shader
in vec3 v_color;

out vec4 frag_color;

void main(void) {
    // Utilize v_color parameter to set the current pixel's color
    frag_color = vec4(v_color, 1.0);
}