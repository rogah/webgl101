# WebGL 101

Following [WebGL Intro](https://dens.website/tutorials/webgl/intro).

## Geometry and pixels

This lesson is about the basics of how things are presented in 3D graphics and how they are processed by GPU. If you're familiar with some other 3D graphics API then you can skip this lesson.

### The basics
A video card basically can do only one thing: draw a triangle. So, any 3D model is presented as a set of triangles. To get from a set of triangles in 3D space to a beautiful picture on your display, a video card usually should do:

* Convert 3D triangles into 2D triangles. Your display is flat after all.

* Determine which triangles appeared in your display's viewport, at least partially. You don't want to process triangles which are behind your back.

* Rasterize each triangle. A triangle on your display is in fact a set of pixels.

* Check if some triangles overlap other triangles to determine which parts of triangles is visible.

* Colorize pixels of which visible triangles consist of.

Some of these steps are performed completely by the video card without developer's participation while another should be configured or programmed by the developer himself.

When you program 3D graphics application, you usually deal with **pipeline states**, **shaders**, **geometry** and **textures**.

### Shaders
Shader is a program, written by the application developer, which implements a part of data processing in a rendering pipeline. WebGL 1 and 2 supports two types of shaders: vertex and fragment.

The purpose of a vertex shader is to convert 3D world-space coordinates of a vertex into normalized 2D screen-space coordinates of the same vertex. Or, in other words, to project 3D coordinates into 2D space.

Fragment shader (or pixel shader) should calculate a color of a given pixel.

Vertex shader is invoked for each vertex of a given geometry. Fragment shader is invoked for each rasterized pixel in the viewport.

### Pipeline states
There are some pipeline states that involved in each segment of rendering pipeline and should be configured by the developer (or left in the default state). For example — should pixels be blended or overwritten. Should depth test be performed. Should both sides of triangles be drawn. And some others which we will discuss later.

### Geometry
Geometry is a set of triangles that an application should read, download or generate, and pass to the GPU. This data go through the vertex shader where each vertex is being converted into normalized screen-space coordinates.

### Textures
Textures are, well, at this point consider them as images which data is used for painting, shading, colorizing, and other operations on pixels.

### Behind the scenes
Some operations are out of developer's control though. For example, you can't control should out-of-viewport triangles be discarded. They're always discarded. You can't control should out-of-viewport pixels be processed. They're always skipped.