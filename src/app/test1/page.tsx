// 'use client'
// import React, { useRef } from 'react';
// import { compressImage } from '@/lib/image.compress';
// import { uploadFirebaseFile } from '@/lib/firebase/upload-file';

// function ImageCompressor() {
//   const fileInputRef = useRef() as any
//   const imgRef = useRef() as any

//   const compressPortraitImage = async () => {

//     if (!fileInputRef.current.files[0]) {
//       alert('Please select an image first.');
//       return;
//     }
//     const image = await compressImage(fileInputRef.current.files[0], {})
//     if(!image) return 
//     const upload = await uploadFirebaseFile(image?.file, "akash")
//     console.info(upload)
//     imgRef.current.src = image?.blob
//   };

//   return (
//     <div>
//       <input type="file" ref={fileInputRef} accept="image/*" />
//       <button onClick={compressPortraitImage}>Compress Image</button>
//       <img ref={imgRef} alt="Compressed" />
//     </div>
//   );
// }

// export default ImageCompressor;

export default function Page (){
  return <>test 1</>
}