import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Rect, Circle, IText, FabricImage } from 'fabric';
import { useNavigate } from 'react-router-dom';
import './templateEditor.css';
import { FaImage, FaSquare, FaCircle, FaFont, FaSave } from 'react-icons/fa'; // Import icons for example

const TemplateEditor = () => {
  const canvasRef = useRef(null);
  const canvas = useRef(null);
  const navigate = useNavigate();
  const [selectedObject, setSelectedObject] = useState(null); 
  const [showTools, setShowTools] = useState(false); 

  // Initialize Fabric.js Canvas
  useEffect(() => {
    if (canvasRef.current) {
      canvas.current = new Canvas(canvasRef.current);
      canvas.current.setWidth(700);
      canvas.current.setHeight(450);

      canvas.current.on('object:selected', (e) => {
        setSelectedObject(e.target); 
        setShowTools(true); 
      });

      canvas.current.on('selection:cleared', () => {
        setSelectedObject(null); 
        setShowTools(false); 
      });
    }

    return () => {
      if (canvas.current) {
        canvas.current.dispose();
      }
    };
  }, []);

  // Add a Rectangle
  const addRectangle = () => {
    const rect = new Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 100,
      fill: 'red',
      hasControls: true, 
      lockScalingFlip: true,
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
      hasControls: true,
      lockScalingFlip: true,
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
      hasControls: true,
    });
    canvas.current.add(text);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (readerEvent) => {
        const img = new Image();
        
        img.onload = () => {
          const fabricImage = new FabricImage(img, {
            left: 100,
            top: 100,
            angle: 0,
            opacity: 1,
          });
          canvas.current.add(fabricImage);
        };
  
        img.onerror = (err) => {
          console.error("Error loading image: ", err);
        };
  
        img.src = readerEvent.target.result;
      };
  
      reader.onerror = (err) => {
        console.error("Error reading file: ", err);
      };
  
      reader.readAsDataURL(file);
    }
  };

  // Handle the save template functionality
  const handleSaveTemplate = () => {
    const templateData = canvas.current.toJSON();
    console.log('Template Data:', templateData); 
  };

  // Back to Admin button
  const handleBackToAdmin = () => {
    navigate('/admin');
  };

  // Define the functions for changing properties
  const changeTextFont = (font) => {
    if (selectedObject && selectedObject.set) {
      selectedObject.set({ fontFamily: font });
      canvas.current.renderAll();
    }
  };

  const changeTextColor = (color) => {
    if (selectedObject && selectedObject.set) {
      selectedObject.set({ fill: color });
      canvas.current.renderAll();
    }
  };

  const changeTextSize = (size) => {
    if (selectedObject && selectedObject.set) {
      selectedObject.set({ fontSize: size });
      canvas.current.renderAll();
    }
  };

  const changeShapeColor = (color) => {
    if (selectedObject && selectedObject.set) {
      selectedObject.set({ fill: color });
      canvas.current.renderAll();
    }
  };

  return (
    <div className="template-editor-container">
      {/* Left Sidebar (Navigation) */}
      <div className="sidebar">
        <div className="sidebar-item" onClick={addRectangle}>
          <FaSquare size={20} />
        </div>
        <div className="sidebar-item" onClick={addCircle}>
          <FaCircle size={20} />
        </div>
        <div className="sidebar-item" onClick={addText}>
          <FaFont size={20} />
        </div>
        <div className="sidebar-item">
          <label htmlFor="image-upload">
            <FaImage size={20} />
          </label>
          <input 
            id="image-upload" 
            type="file" 
            onChange={handleImageUpload} 
            accept="image/*" 
            style={{ display: 'none' }}
          />
        </div>
        <div className="sidebar-item" onClick={handleSaveTemplate}>
          <FaSave size={30} />
        </div>
      </div>

      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <button className="back-btn" onClick={handleBackToAdmin}>Back to Admin</button>
          <h2 className="editor-title">Template Editor</h2>
        </div>

        {/* Canvas Element */}
        <canvas ref={canvasRef} style={{ border: '1px solid #000', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}></canvas>

        {/* Show Color and Text Controls Only When an Object is Selected */}
        {showTools && selectedObject && (
          <div className="tools">
            {selectedObject.type === 'i-text' && (
              <>
                <select onChange={(e) => changeTextFont(e.target.value)}>
                  <option value="Arial">Arial</option>
                  <option value="Courier">Courier</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
                <input
                  type="color"
                  onChange={(e) => changeTextColor(e.target.value)}
                  title="Text Color"
                />
                <input
                  type="number"
                  placeholder="Font Size"
                  onChange={(e) => changeTextSize(Number(e.target.value))}
                />
              </>
            )}

            {selectedObject.type !== 'i-text' && (
              <>
                <button onClick={() => changeShapeColor('red')}>Red</button>
                <button onClick={() => changeShapeColor('green')}>Green</button>
                <button onClick={() => changeShapeColor('blue')}>Blue</button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateEditor;
