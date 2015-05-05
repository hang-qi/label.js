label.js
========

This is a minimal JavaScript library I created in one of my projects
for drawing bounding boxes with labels onto videos and images in the browser.

Usage
-----

Include the library:

    <script src="label.js"></script>

Assuming the canvas element is overlaying an image,

    <div class="container">
        <canvas class="canvas" id="main-canvas" width="500" height="500">
        </canvas>
        <div class="image"><image src="lena.jpg"></image></div>
    </div>

The following JavaScript snippet will draw a bounding box with a text label
at the designated location.

    var can = labeljs('#main-canvas');
    can.drawRect({
        'x' : 120,
        'y' : 80,
        'width' : 300,
        'height': 300,
        'label': 'Lena',
        'color': 'rgb(50,150,50)'}
    );
