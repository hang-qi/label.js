/*!
 * label.js
 *
 * MIT Licensed
 * Copyright (C) 2015 Hang Qi. http://hangqi.me
 */
var labeljs = (function(canvas) {
    'use strict';

    var self = {};
    var ctx = null;

    // Default options
    var options = {
        'zooming': 1.0,
        'offset': 0,
        'lineWidth': 2,
        'fontSize': '14px',
        'fontName': 'Helvetica',
        'strokeStyle': 'red'
    }

    function setOptions(opt) {
        for (var key in opt) {
            options[key] = opt[key];
        }
    }

    // Draw according to the device pixel ratio.
    function backingScale(context) {
        if ('devicePixelRatio' in window) {
            if (window.devicePixelRatio > 1) {
                return window.devicePixelRatio;
            }
        }
        return 1;
    }

    self.drawRect = function(box){
        ctx.save();
        if (box.lineWidth) {
            ctx.lineWidth = box.lineWidth;
        } else {
            ctx.lineWidth = options.lineWidth;
        }
        ctx.strokeStyle = box.color;
        ctx.strokeRect(box.x, box.y, box.width, box.height)

        if (box.label){
            drawBoxLabel(box);
        }
        ctx.restore();
    }

    self.drawLine = function(x1, y1, x2, y2){
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = options.lineWidth;
        ctx.strokeStyle = options.strokeStyle;
        ctx.stroke();
        ctx.restore();
    }

    function drawBoxLabel(box){
        ctx.fillStyle = box.color;
        var fontSize = options.fontSize;
        var fontName = options.fontName;
        if (box.fontSize){
            fontSize = box.fontSize;
        }
        if (box.font){
            fontName = box.fontName;
        }
        ctx.font = fontSize + " " + fontName;
        var width = ctx.measureText(box.label).width+2;
        var height = 1.5 * ctx.measureText("M").width;
        ctx.fillRect(box.x, box.y, width, height);

        // Draw text
        ctx.fillStyle = 'white';
        ctx.textBaseline = "top";
        ctx.fillText(box.label, box.x+1, box.y+1);
    }

    function init(canvasSelector, options) {
        if (options !== 'undefined'){
            setOptions(options)
        }
        var canvas = document.querySelector(canvasSelector);
        ctx = canvas.getContext('2d');
        var scaleFactor = backingScale(ctx);
        if (scaleFactor > 1) {
            canvas.style.width = canvas.width + "px";
            canvas.style.height = canvas.height + "px";
            canvas.width = canvas.width * scaleFactor;
            canvas.height = canvas.height * scaleFactor;
            ctx.scale(scaleFactor, scaleFactor);
        }
        return self;
    }

    return init;

})();
