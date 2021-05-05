import React from 'react';

import ImageCropper from './components/ImageCropper';
import './App.css';
import bikini from './assets/image/bikini.jpg';

function App() {
  return (
    <div className="App">
      <h1>React Cropper</h1>
      <ImageCropper src={bikini} />
    </div>
  );
}

export default App;
