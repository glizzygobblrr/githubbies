import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Image as FabricImage, IText, Rect, Circle } from 'fabric';

const TemplateEditor = () => {
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);

  // Initialize Fabric.js Canvas
  useEffect(() => {
    if (canvasRef.current) {
      canvas.current = new Canvas(canvasRef.current);
      canvas.current.setWidth(canvasWidth);
      canvas.current.setHeight(canvasHeight);
    }
    return () => {
      if (canvas.current) {
        canvas.current.dispose();
      }
    };
  }, [canvasWidth, canvasHeight]);

  // Add a Rectangle
  const addRectangle = () => {
    const rect = new Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      fill: 'red',
    });
    canvas.current.add(rect);
  };

  // Add a Circle
  const addCircle = () => {
    const circle = new Circle({
      left: 250,
      top: 250,
      radius: 50,
      fill: 'blue',
    });
    canvas.current.add(circle);
  };

  // Add Editable Text
  const addText = () => {
    const text = new IText('Editable Text', {
      left: 400,
      top: 100,
      fontSize: 30,
      fontFamily: 'Arial',
      fill: 'black',
    });
    canvas.current.add(text);
  };

  // Handle Multiple Image Uploads
  const handleImageUpload = (e) => {
    const files = e.target.files;

    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        // Read the image file as a data URL
        reader.onload = () => {
          const imgDataUrl = reader.result;

          // Create a Fabric.js Image object and add it to the canvas
          FabricImage.fromURL(imgDataUrl, function (img) {
            img.set({
              left: Math.random() * canvasWidth, // Randomize the position slightly
              top: Math.random() * canvasHeight,
              width: 200,  // Set width or scale as needed
              height: 150, // Set height or scale as needed
            });
            canvas.current.add(img);
          });
        };

        // Read the file
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle Video Upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      // Read the video file as a data URL
      reader.onload = () => {
        const videoDataUrl = reader.result;

        // Create a Fabric.js custom object to display the video
        const videoElement = document.createElement('video');
        videoElement.src = videoDataUrl;
        videoElement.controls = true;
        videoElement.width = 300;
        videoElement.height = 200;

        // Wait for the video element to load
        videoElement.onloadeddata = () => {
          const videoObject = new FabricImage(videoElement, {
            left: 150,
            top: 400,
            selectable: false, // Optionally make it unselectable
          });

          // Add the video object to the canvas
          canvas.current.add(videoObject);
        };
      };

      // Read the file
      reader.readAsDataURL(file);
    }
  };

  // Handle Saving the Template
  const handleSaveTemplate = () => {
    const templateData = canvas.current.toJSON();
    console.log(templateData); // Send this data to the backend for saving
  };

  // Handle Canvas Resizing
  const handleResizeCanvas = (width, height) => {
    setCanvasWidth(width);
    setCanvasHeight(height);
  };

  return (
    <div>
      <h2>Template Editor</h2>

      {/* Canvas Resizing */}
      <div>
        <input
          type="number"
          value={canvasWidth}
          onChange={(e) => handleResizeCanvas(Number(e.target.value), canvasHeight)}
          placeholder="Width"
        />
        <input
          type="number"
          value={canvasHeight}
          onChange={(e) => handleResizeCanvas(canvasWidth, Number(e.target.value))}
          placeholder="Height"
        />
      </div>

      {/* Canvas Element */}
      <canvas ref={canvasRef} style={{ border: '1px solid #000' }}></canvas>

      {/* Toolbar for Adding Elements */}
      <div>
        <button onClick={addRectangle}>Add Rectangle</button>
        <button onClick={addCircle}>Add Circle</button>
        <button onClick={addText}>Add Editable Text</button>
      </div>

      {/* Image Upload */}
      <div>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      </div>

      {/* Video Upload */}
      <div>
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
      </div>

      {/* Save Button */}
      <button onClick={handleSaveTemplate}>Save Template</button>
    </div>
  );
};

export default TemplateEditor;
