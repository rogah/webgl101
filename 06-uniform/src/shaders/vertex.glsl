#version 300 es
precision highp float;

uniform float time;

in vec2 position;

void main(void) {
    vec2 rotated = vec2(
        position.x * cos(time) - position.y * sin(time),
        position.x * sin(time) + position.y * cos(time)
    );

    gl_Position = vec4(rotated, 0.0, 1.0);
}