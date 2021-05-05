import React, { useState, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { getResizedImage } from './ImageResize';
import './ImageCropper.css';

let firstTime =true;

const ReactCropper = (props) => {
    const [image, setImage] = useState(props.src);
    const [cropData, setCropData] = useState('#');
    const [cropper, setCropper] = useState(null);
    const [fileImageCropped, setFileImageCropped] = useState(null);
    
    // const onChangeHandler = (event) => {
    //     event.preventDefault();
    //     let files;
    //     if (event.dataTransfer) {
    //         files = event.dataTransfer.files;
    //     } else if (event.target) {
    //         files = event.target.files;
    //         console.log(files)
    //     };
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         setImage(reader.result);
    //     };
    //     reader.readAsDataURL(files[0]);
    // };

    const getCropData = () => {
        if (cropper) {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        };
    }
        
    useEffect(() => {
        if (firstTime) {
            firstTime = false;
            return;
        };
        const dataUrlToFile = async (dataUrl, filename) => {
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            console.log(blob)
            const file = new File([blob], filename, { type: 'image/png'} );
            setFileImageCropped(file);
            const resizedImage = await getResizedImage(dataUrl);
            console.log('resize', resizedImage)
        };
        dataUrlToFile(cropData, "cropped_image.png")
    }, [cropData]);

    console.log(fileImageCropped);

    return (
        <>
            <div style={{width: '600px', height: '600px', display: "flex", justifyContent: 'space-between', marginLeft: '30%'}}>
                {/* <input type='file' onChange={onChangeHandler} /> */}
                <Cropper
                    style={{ height: "600px", width: "600px" }}
                    zoomTo={0}
                    aspectRatio={3/1}
                    preview=".img-preview"
                    src={image}
                    viewMode={3}
                    dragMode="move"
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    autoCropArea={1}
                    checkOrientation={false}
                    cropBoxResizable={false}
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                />
            </div>
            <div>
                <div className="box" style={{ width: "50%", float: "right" }}>
                <h1>Preview</h1>
                <div
                    className="img-preview"
                    style={{ width: "100%", float: "left", height: "300px" }}
                />
                </div>
                <div
                className="box"
                style={{ width: "50%", float: "right", height: "300px" }}
                >
                <h1>
                    <span>Crop</span>
                    <button style={{ float: "right" }} onClick={getCropData}>
                    Crop Image
                    </button>
                </h1>
                <img style={{ width: "100%" }} src={cropData} alt="cropped" />
                </div>
            </div>
            <br style={{ clear: "both" }} />
        </>
    );
}
 
export default ReactCropper 