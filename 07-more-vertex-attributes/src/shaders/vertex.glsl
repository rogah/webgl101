#version 300 es
precision highp float;

in vec2 position;

// That's another vertex attribute
in vec3 color;

// An additional output value - oh, that's something new!
out vec3 v_color;

void main(void) {
    v_color = color; // Put color attribute into additional output parameter
    gl_Position = vec4(position, 0.0, 1.0);
}