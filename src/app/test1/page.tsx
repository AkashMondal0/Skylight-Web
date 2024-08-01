'use client'
import React, { useRef } from 'react';
import { compressImage } from '@/lib/image.compress';
import { uploadFirebaseFile } from '@/lib/firebase/upload-file';

function ImageCompressor() {
  const fileInputRef = useRef() as any
  const imgRef = useRef() as any

  const compressPortraitImage = async () => {

    if (!fileInputRef.current.files[0]) {
      alert('Please select an image first.');
      return;
    }
    const image = await compressImage(fileInputRef.current.files[0], {})
    // const upload = await uploadFirebaseFile(image, "akash")
    console.info(image?.blob)
    imgRef.current.src = image?.blob
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} accept="image/*" />
      <button onClick={compressPortraitImage}>Compress Image</button>
      <img ref={imgRef} alt="Compressed" />
    </div>
  );
}

export default ImageCompressor;