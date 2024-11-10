import React, {useState, useEffect } from "react";
import {Input} from "blocksin-system";
function Settings ({canvas}) {
    const [selectedObject, setSelectObject] = useState(null);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [diameter, setDiameter] = useState("");
    const [color, setColor] = useState("");

    useEffect(()=>{
        if(canvas) {
            canvas.on("selection:created", (event) => {
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:updated", (event)=>{
                handleObjectSelection(event.selected[0]);
            });

            canvas.on("selection:cleared", (event)=>{
                setSelectedObject(null);
                clearSettings();
            });

            canvas.on("object:modified", (event)=>{
                handleObjectSelection(event.target);
            });

            canvas.on("object:scaling", (event)=>{
                handleObjectSelection(event.target);
            });
        }
    }, [canvas]);

    const handleObjectSelection = (object) => {
        if (!object) return;

        setSelectObject(object);
        if(object.type === "rect"){
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setDiameter("");
        } else if (object.type === "circle"){
            setDiameter(Math.round(object.radius * 2* object.scaleX));
            setHeight("");
            setColor(object.fill);
            setWidth("");
        }
    };

    const clearSettings = () => {
        setWidth("");
        setHeight("");
        setColor("");
        setDiameter("");
    };

    const handleWidthChange = (e) => {};
    const handleHeightChange = (e) => {};
    const handleDiameterChange = (e) => {};
    const handleColorChange = (e) => {};

    return (
        <div className="Settings darkmode">
            {selectedObject && selectedObject.type === "rect" && (
                <>
                    <Input
                        fluid
                        label="Width"
                        value={width}
                        onChange={handleWidthChange}
                    />
                </>
            )}
        </div>
    );
}

export default Settings;