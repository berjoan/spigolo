import React, { useState } from 'react';

function ImageUploader({ onImageSelect }) {
  const [imagePreview, setImagePreview] = useState(null);

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 300; // Tamaño máximo en píxeles
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          resolve(canvas.toDataURL(file.type));
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const resizedImage = await resizeImage(file);
      onImageSelect(file);
      setImagePreview(resizedImage);
    } else {
      onImageSelect(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">
        {imagePreview ? 'Cambiar Imagen' : 'Subir Imagen de Referencia'}
      </label>
      {imagePreview && (
        <div className="image-preview-container">
          <img 
            src={imagePreview} 
            alt="Referencia" 
            className="upload-image-preview" 
          />
          <span className="image-caption">Vista previa</span>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;